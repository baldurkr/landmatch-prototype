import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUp } from 'lucide-react';
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

// Canned answers used when no API key is configured, so the prototype still demos end-to-end.
const FALLBACK_ANSWERS: [RegExp, string][] = [
  [/permit/i, 'In Prince George’s County, a straightforward residential building permit through PG-DPIE typically takes 2–4 months, while projects needing entitlements through M-NCPPC can add 6–12 months. Pre-application meetings can shorten review cycles considerably.'],
  [/row|right.of.way/i, 'ROW easements reduce net buildable area twice — once through the dedicated land itself, and again by resetting the line that setbacks are measured from.'],
  [/environment|easement|wetland|forest|woodland/i, 'Prince George’s County enforces environmental easements fairly strictly — the 11% woodland conservation area on this parcel would need a Tree Conservation Plan approved by M-NCPPC before grading. Steep slopes over 15% also trigger additional review, though only 3.3% of this parcel is affected.'],
  [/zon/i, 'RR (Residential, Rural) zoning in Prince George’s County generally allows single-family detached homes on large lots, with a minimum lot size around 2 acres. At 10.6 acres, this parcel could potentially support a minor subdivision, subject to M-NCPPC review.'],
];

const FALLBACK_DEFAULT = 'Based on the RR zoning and the recorded constraints, this parcel looks broadly feasible for low-density residential use — the main items to verify with Prince George’s County are the woodland conservation requirements and WSSC service availability. Connect an Anthropic API key (VITE_ANTHROPIC_API_KEY) to get live answers.';

// Pool of opening questions — two are sampled at random when the chat first opens.
const STARTER_QUESTIONS = [
  'How long is the wait for a building permit?',
  'How strict is this county regarding environmental easements?',
  'What can I build under RR zoning here?',
  'Could this parcel be subdivided?',
  'Are there floodplain or wetland concerns?',
  'What utilities are available at this site?',
  'What setbacks apply to this parcel?',
  'How does the woodland conservation area affect buildable land?',
  'What entitlements would a new development need?',
  'Is WSSC water and sewer available here?',
];

// JSON schema for AI-generated follow-up questions.
const SUGGESTION_SCHEMA = {
  type: 'object' as const,
  properties: {
    questions: { type: 'array' as const, items: { type: 'string' as const } },
  },
  required: ['questions'],
  additionalProperties: false,
};

// Fisher–Yates sample of `n` items from `arr`.
function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;
const client = apiKey
  ? new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
  : null;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function ChatIcon({ size, color }: { size: number; color: string }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-[18.75%_9.37%_6.25%_9.37%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4 21.6">
          <path d="M10.35 9C10.35 8.733 10.4292 8.472 10.5775 8.25C10.7259 8.028 10.9367 7.855 11.1834 7.753C11.4301 7.651 11.7015 7.624 11.9634 7.676C12.2253 7.728 12.4658 7.857 12.6546 8.045C12.8434 8.234 12.972 8.475 13.0241 8.737C13.0762 8.999 13.0494 9.27 12.9473 9.517C12.8451 9.763 12.6721 9.974 12.45 10.123C12.228 10.271 11.967 10.35 11.7 10.35C11.342 10.35 10.9986 10.208 10.7454 9.955C10.4923 9.701 10.35 9.358 10.35 9ZM6.75 10.35C7.017 10.35 7.278 10.271 7.5 10.123C7.722 9.974 7.895 9.763 7.997 9.517C8.099 9.27 8.126 8.999 8.074 8.737C8.022 8.475 7.893 8.234 7.705 8.045C7.516 7.857 7.275 7.728 7.013 7.676C6.752 7.624 6.48 7.651 6.233 7.753C5.987 7.855 5.776 8.028 5.628 8.25C5.479 8.472 5.4 8.733 5.4 9C5.4 9.358 5.542 9.701 5.795 9.955C6.049 10.208 6.392 10.35 6.75 10.35ZM16.65 10.35C16.917 10.35 17.178 10.271 17.4 10.123C17.622 9.974 17.795 9.763 17.897 9.517C17.999 9.27 18.026 8.999 17.974 8.737C17.922 8.475 17.793 8.234 17.605 8.045C17.416 7.857 17.175 7.728 16.913 7.676C16.652 7.624 16.38 7.651 16.133 7.753C15.887 7.855 15.676 8.028 15.528 8.25C15.379 8.472 15.3 8.733 15.3 9C15.3 9.358 15.442 9.701 15.695 9.955C15.949 10.208 16.292 10.35 16.65 10.35ZM23.4 1.8V16.2C23.4 16.677 23.21 17.135 22.873 17.473C22.535 17.81 22.077 18 21.6 18H6.638L2.97 21.168C2.636 21.451 2.225 21.601 1.8 21.6C1.536 21.599 1.275 21.541 1.035 21.429C0.724 21.285 0.462 21.056 0.278 20.767C0.095 20.478 0 20.142 0 19.8V1.8C0 1.323 0.19 0.865 0.527 0.527C0.865 0.19 1.323 0 1.8 0H21.6C22.077 0 22.535 0.19 22.873 0.527C23.21 0.865 23.4 1.323 23.4 1.8ZM21.6 1.8H1.8V19.8L5.712 16.425C5.874 16.282 6.083 16.202 6.3 16.2H21.6V1.8Z" fill={color} />
        </svg>
      </div>
    </div>
  );
}

export default function ChatAssistant({ parcelSelected }: { parcelSelected: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tipDismissed, setTipDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(() => sample(STARTER_QUESTIONS, 2));
  const [modalHeight, setModalHeight] = useState<number>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;

  // Size the modal so its top sits 24px below the bottom edge of the address search.
  // The modal's bottom is fixed (12px above the chat button), so we measure that and
  // subtract the target top to get the height.
  useLayoutEffect(() => {
    if (!isOpen) return;
    const compute = () => {
      const modal = modalRef.current;
      const search = document.querySelector('[data-address-search]');
      if (!modal || !search) return;
      const modalBottom = modal.getBoundingClientRect().bottom;
      const searchBottom = search.getBoundingClientRect().bottom;
      setModalHeight(Math.max(240, modalBottom - searchBottom - 24));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [isOpen]);

  // Auto-grow the input box to fit its content, up to a max height.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input, isOpen]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const appendToLast = (delta: string) => {
    setMessages(prev => {
      const next = [...prev];
      const last = next[next.length - 1];
      next[next.length - 1] = { ...last, content: last.content + delta };
      return next;
    });
  };

  const streamFallback = (question: string) =>
    new Promise<string>(resolve => {
      const answer = FALLBACK_ANSWERS.find(([re]) => re.test(question))?.[1] ?? FALLBACK_DEFAULT;
      let i = 0;
      const timer = setInterval(() => {
        appendToLast(answer.slice(i, i + 3));
        i += 3;
        if (i >= answer.length) {
          clearInterval(timer);
          resolve(answer);
        }
      }, 18);
    });

  // Refresh the suggested questions based on the latest exchange.
  const refreshSuggestions = async (question: string, answer: string) => {
    if (!client) {
      setSuggestions(prev => sample(STARTER_QUESTIONS.filter(q => !prev.includes(q)), 2));
      return;
    }
    try {
      const res = await client.messages.create({
        model: MODEL,
        max_tokens: 256,
        system:
          'You generate follow-up questions for a land feasibility assistant. Given the user\'s last question and the assistant\'s answer, propose exactly 2 natural follow-up questions the user is likely to ask next. Each must be under 12 words, phrased from the user\'s point of view, and not repeat the previous question.',
        messages: [{ role: 'user', content: `Question: ${question}\n\nAnswer: ${answer}` }],
        output_config: { format: { type: 'json_schema', schema: SUGGESTION_SCHEMA } },
      });
      const text = res.content.find(b => b.type === 'text')?.text ?? '';
      const parsed = JSON.parse(text) as { questions?: string[] };
      if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        setSuggestions(parsed.questions.slice(0, 2));
      }
    } catch {
      setSuggestions(sample(STARTER_QUESTIONS, 2));
    }
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    const history = messagesRef.current.filter(m => m.content.length > 0);
    setInput('');
    setIsStreaming(true);
    setMessages([...history, { role: 'user', content: trimmed }, { role: 'assistant', content: '' }]);

    let answer = '';
    try {
      if (client) {
        const stream = client.messages.stream({
          model: MODEL,
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: 'user' as const, content: trimmed }],
        });
        stream.on('text', appendToLast);
        const final = await stream.finalMessage();
        answer = final.content
          .filter((b): b is Anthropic.TextBlock => b.type === 'text')
          .map(b => b.text)
          .join('');
      } else {
        answer = await streamFallback(trimmed);
      }
    } catch (error) {
      const detail = error instanceof Anthropic.APIError ? error.message : 'Something went wrong.';
      appendToLast(`Sorry, I couldn’t reach the assistant. ${detail}`);
    } finally {
      setIsStreaming(false);
    }

    if (answer) refreshSuggestions(trimmed, answer);
  };

  return (
    <div className="relative">
      {/* Chat window — springs up from the bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{ transformOrigin: 'bottom right', height: modalHeight ? `${modalHeight}px` : undefined }}
            className="absolute bottom-[calc(100%+12px)] right-0 w-[400px] bg-white border border-[rgba(0,0,0,0.14)] border-solid rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)] flex flex-col overflow-clip pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-[#04100b] flex items-center justify-between p-[16px] shrink-0 w-full">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] text-[17px] text-white tracking-[-0.255px]">
                Land Feasibility Assistant
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center size-[24px] cursor-pointer text-white hover:opacity-60 transition-opacity"
                aria-label="Close assistant"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div className="bg-[rgba(0,0,0,0.09)] h-px shrink-0 w-full" />

            {/* Chat history */}
            <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-[16px] p-[16px] w-full">
              {messages.length === 0 && (
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-[#97a191]">
                  Ask me anything about this parcel or local regulations.
                </p>
              )}
              {messages.map((message, i) =>
                message.role === 'user' ? (
                  <div key={i} className="flex flex-col items-end shrink-0 w-full">
                    <div className="bg-[#f7f8f5] flex items-start p-[8px] rounded-[8px] max-w-[272px]">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-black [word-break:break-word]">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p key={i} className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-black shrink-0 w-full [word-break:break-word] whitespace-pre-wrap">
                    {message.content}
                    {isStreaming && i === messages.length - 1 && (
                      <span className="inline-block w-[7px] h-[14px] ml-[2px] align-middle bg-[#5ca87c] animate-pulse rounded-[1px]" />
                    )}
                  </p>
                )
              )}
            </div>

            {/* Bottom anchor */}
            <div className="flex flex-col gap-[10px] shrink-0 w-full">
              <div className="bg-[rgba(0,0,0,0.09)] h-px shrink-0 w-full" />
              <div className="flex flex-col gap-[10px] px-[16px] w-full">
                <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] text-[11px] text-[#97a191] tracking-[0.88px] uppercase">
                  Suggested questions
                </p>
                {suggestions.map(question => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                    disabled={isStreaming}
                    className="border border-[rgba(0,0,0,0.14)] border-solid flex items-center px-[12px] py-[8px] rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)] w-full text-left cursor-pointer bg-white hover:bg-[#f7f8f5] transition-colors disabled:opacity-50 disabled:cursor-default"
                  >
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-black [word-break:break-word]">
                      {question}
                    </p>
                  </button>
                ))}
              </div>
              <form
                className="flex gap-[10px] items-end p-[16px] w-full"
                onSubmit={e => {
                  e.preventDefault();
                  sendMessage(input);
                }}
              >
                <div className="bg-white border border-[rgba(0,0,0,0.09)] border-solid flex flex-1 min-w-0 items-center px-[16px] py-[8px] rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input);
                      }
                    }}
                    placeholder="What more do you need to know?"
                    className="flex-1 min-w-0 block resize-none bg-transparent font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-black placeholder:text-[#97a191] outline-none max-h-[120px] overflow-y-auto"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  aria-label="Send message"
                  className="bg-[#7ee8a2] border border-[rgba(0,0,0,0.14)] border-solid flex items-center justify-center rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)] shrink-0 size-[40px] cursor-pointer hover:bg-[#b3f0c7] active:bg-[#e1ffeb] transition-colors disabled:opacity-40 disabled:cursor-default"
                >
                  <ArrowUp size={24} color="#04100b" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tip — springs up when a parcel is selected, anchored where the chat window opens;
          disappears instantly on click (no exit animation) */}
      {parcelSelected && !isOpen && !tipDismissed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24, delay: 0.25 }}
          style={{ transformOrigin: 'bottom right' }}
          className="absolute bottom-[calc(100%+12px)] right-0 w-[152px] bg-white border border-[rgba(0,0,0,0.14)] border-solid flex flex-col items-center justify-center p-[12px] rounded-[8px] pointer-events-auto"
        >
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] text-[13px] text-black w-full [word-break:break-word]">
            Would you like help reading this parcel?
          </p>
        </motion.div>
      )}

      {/* Chat bubble button — always available */}
      <button
        onClick={() => {
          setTipDismissed(true);
          setIsOpen(prev => !prev);
        }}
        aria-label="LandMatch Feasibility Assistant"
        className={`flex items-center justify-center p-[9.6px] relative rounded-[28.8px] size-[60px] cursor-pointer drop-shadow-[2px_4px_5px_rgba(126,232,162,0.2)] transition-colors ${isOpen ? 'bg-[#5ca87c] hover:bg-[#4d9169]' : 'bg-[#04100b] hover:bg-[#1a2620]'}`}
      >
        <div aria-hidden className="absolute border-[1.2px] border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[28.8px]" />
        <ChatIcon size={36} color="white" />
      </button>
    </div>
  );
}
