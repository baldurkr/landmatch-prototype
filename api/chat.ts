// Vercel Edge Function — proxies Anthropic calls so the API key stays server-side.
// The key is read from process.env.ANTHROPIC_API_KEY (no VITE_ prefix), so it is
// NEVER bundled into the browser. Two actions:
//   - "chat":    streams the assistant reply back as plain text
//   - "suggest": returns { questions: [...] } as JSON (structured output)
import Anthropic from '@anthropic-ai/sdk';

export const config = { runtime: 'edge' };

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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — the client falls back to canned answers.
    return new Response('Assistant not configured', { status: 503 });
  }

  const client = new Anthropic({ apiKey });
  const body = (await req.json()) as {
    action?: 'chat' | 'suggest';
    messages?: ChatMessage[];
    question?: string;
    answer?: string;
  };

  if (body.action === 'suggest') {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 256,
      system: SUGGESTION_SYSTEM,
      messages: [
        { role: 'user', content: `Question: ${body.question}\n\nAnswer: ${body.answer}` },
      ],
      output_config: { format: { type: 'json_schema', schema: SUGGESTION_SCHEMA } },
    });
    const text = res.content.find(b => b.type === 'text')?.text ?? '{"questions":[]}';
    return new Response(text, { headers: { 'content-type': 'application/json' } });
  }

  // Default: streaming chat.
  const messages = (body.messages ?? []).filter(m => m.content.length > 0);
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
