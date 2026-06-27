// Vercel Node Function — proxies Anthropic calls so the API key stays server-side.
// Runs on the Node.js runtime (NOT Edge): the Anthropic SDK imports node:fs / node:path,
// which the Edge runtime rejects. The key is read from process.env.ANTHROPIC_API_KEY
// (no VITE_ prefix), so it is NEVER bundled into the browser. Two actions:
//   - "chat":    streams the assistant reply back as plain text
//   - "suggest": returns { questions: [...] } as JSON (structured output)
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-haiku-4-5';

const SYSTEM_PROMPT = `You are the Land Feasibility Assistant inside LandMatch, a land feasibility analysis tool for developers and builders in Maryland. You help users understand whether a parcel is feasible to develop: zoning, easements, setbacks, right-of-way dedication, environmental constraints, permitting, utilities, and jurisdiction processes.

The user currently has this parcel selected:
- Address: 6501 Seat Pleasant Drive, Capitol Heights, MD 20743
- Zoning: RR (Residential, Rural)
- Land area: 10.6 acres (461,736 sqft); building area 2,028 sqft; year built 1928
- Jurisdiction: Prince George's County, Maryland; municipality Capitol Heights; water & sewer WSSC; grading/stormwater/ROW dedication via PG-DPIE; erosion & sediment control via PG-SCD; entitlements via M-NCPPC
- Easements/constraints: access/ingress/egress 1.9%, woodland/forest conservation 11.0%, steep slopes 3.3%; no floodplain, streams, wetlands, or stormwater easements recorded

Answer questions about this parcel and about land feasibility in general. Be practical and specific. Keep answers short — 2 to 4 sentences, plain text only (no markdown, no lists, no headings). If something requires verification with the county, say so briefly.`;

const SUGGESTION_SYSTEM =
  'You generate follow-up questions for a land feasibility assistant. Given the user\'s last question and the assistant\'s answer, propose exactly 2 natural follow-up questions the user is likely to ask next. Each must be under 12 words, phrased from the user\'s point of view, and not repeat the previous question.';

const SUGGESTION_SCHEMA = {
  type: 'object' as const,
  properties: {
    questions: { type: 'array' as const, items: { type: 'string' as const } },
  },
  required: ['questions'],
  additionalProperties: false,
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// Minimal request/response shapes (avoids depending on @vercel/node types).
interface Req {
  method?: string;
  body?: unknown;
}
interface Res {
  status: (code: number) => Res;
  setHeader: (name: string, value: string) => void;
  send: (body: string) => void;
  write: (chunk: string) => void;
  end: () => void;
  headersSent: boolean;
}

export default async function handler(req: Req, res: Res): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — the client falls back to canned answers.
    res.status(503).send('Assistant not configured');
    return;
  }

  const client = new Anthropic({ apiKey });
  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}) as {
    action?: 'chat' | 'suggest';
    messages?: ChatMessage[];
    question?: string;
    answer?: string;
  };

  if (body.action === 'suggest') {
    const result = await client.messages.create({
      model: MODEL,
      max_tokens: 256,
      system: SUGGESTION_SYSTEM,
      messages: [
        { role: 'user', content: `Question: ${body.question}\n\nAnswer: ${body.answer}` },
      ],
      output_config: { format: { type: 'json_schema', schema: SUGGESTION_SCHEMA } },
    });
    const text = result.content.find(b => b.type === 'text')?.text ?? '{"questions":[]}';
    res.setHeader('content-type', 'application/json');
    res.status(200).send(text);
    return;
  }

  // Default: streaming chat.
  const messages = (body.messages ?? []).filter(m => m.content.length > 0);
  try {
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });
    stream.on('text', (delta: string) => res.write(delta));
    await stream.finalMessage();
    res.end();
  } catch {
    if (!res.headersSent) {
      res.status(502).send('Assistant unavailable');
    } else {
      res.end();
    }
  }
}
