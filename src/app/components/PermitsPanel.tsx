import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SquareArrowOutUpRight } from 'lucide-react';

const PGC_URL = 'https://www.princegeorgescountymd.gov/';
const DEFAULT_CASE = '0083893';

type Permit = { title: string; source: string; date: string; caseNo?: string };

function PermitCard({ title, source, date, caseNo }: Permit) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.09)] border-solid flex gap-[8px] items-center overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full">
      <div className="flex-1 min-w-px flex flex-col gap-[8px] items-start text-black [word-break:break-word]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[14px] w-full">
          {title}
        </p>
        <p className="font-['Inter:Light',sans-serif] font-light leading-[1.5] relative shrink-0 text-[12px] w-full">
          {source} · Case #{caseNo ?? DEFAULT_CASE} · Issued {date}
        </p>
      </div>
      <a
        href={PGC_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open source for ${title}`}
        className="shrink-0 flex items-center justify-center rounded-[6px] p-[2px] -m-[2px] text-black hover:text-[#288760] transition-colors cursor-pointer"
      >
        <SquareArrowOutUpRight size={20} strokeWidth={2} />
      </a>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[17px] text-black tracking-[-0.255px]">
        {title}
      </p>
      <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        {children}
      </div>
    </div>
  );
}

const TABS = ['Entitlements', 'Permits', 'Plats'] as const;

const entitlements: Permit[] = [
  { title: 'Certified Preliminary Plan Approval', source: 'PG-DPIE', date: 'March 12, 2024' },
  { title: 'Water & Sewer System Extension Plan & Permit', source: 'WSSC', date: 'March 12, 2024' },
  { title: 'SWM Pond Plan & Permit', source: 'PG-DPIE', date: 'March 12, 2024' },
  { title: 'Street Construction Plan & Permit', source: 'PG-DPIE', date: 'March 12, 2024' },
  { title: 'Final FSC E&S Green Stamps Plan & Permit', source: 'PG-SCD', date: 'March 12, 2024' },
];

const permits: Permit[] = [
  { title: 'Building Permit', source: 'PG-DPIE', date: 'March 12, 2024' },
];

const plats: Permit[] = [
  { title: 'Fine Grading Plan & Permit', source: 'PG-DPIE', date: 'March 12, 2024' },
];

const sections = [
  { title: 'Entitlements', items: entitlements },
  { title: 'Permits', items: permits },
  { title: 'Plats', items: plats },
];

export default function PermitsPanel({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const programmaticRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const container = scrollRef.current;
    const target = sectionRefs.current[index];
    if (!container || !target) return;

    // Suppress scroll-spy while the programmatic smooth scroll runs
    programmaticRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      programmaticRef.current = false;
    }, 700);

    container.scrollTo({ top: Math.max(0, target.offsetTop - 24), behavior: 'smooth' });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (programmaticRef.current) return;
      const scrollTop = container.scrollTop;
      let current = 0;
      sectionRefs.current.forEach((el, i) => {
        if (el && el.offsetTop - 64 <= scrollTop) current = i;
      });
      setActiveTab(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div className={className || 'bg-[#f7f8f5] flex flex-col h-full w-full overflow-hidden'}>
      {/* Header + Tabs (fixed) */}
      <div className="flex flex-col gap-[32px] items-start px-[24px] pt-[24px] pb-[16px] shrink-0">
        {/* Title */}
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.28] relative shrink-0 text-[22px] text-black tracking-[-0.44px] whitespace-nowrap">
          Permits and Approvals
        </p>

        {/* Tab Control */}
        <div className="relative w-full">
          <div className="border-[rgba(0,0,0,0.14)] border-b-2 border-solid flex items-start relative w-full">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => handleTabClick(i)}
                className="flex-1 flex items-center justify-center py-[8px] relative cursor-pointer"
              >
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[14px] text-black text-center tracking-[-0.07px]">
                  {tab}
                </p>
              </button>
            ))}
          </div>
          {/* Animated active underline — width is one third of the row, x shifts by full tab widths */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] w-1/3 bg-[#288760]"
            animate={{ x: `${activeTab * 100}%` }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="relative flex-1 min-h-0 overflow-y-auto flex flex-col gap-[32px] items-start px-[24px] pt-[16px] pb-[32px]"
      >
        {sections.map((section, i) => (
          <div
            key={section.title}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="w-full scroll-mt-[24px]"
          >
            <Section title={section.title}>
              {section.items.map((permit) => (
                <PermitCard key={permit.title} {...permit} />
              ))}
            </Section>
          </div>
        ))}
      </div>
    </div>
  );
}
