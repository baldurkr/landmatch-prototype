import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CHEVRON_DOWN =
  'M16.281 1.28104L8.78104 8.78104C8.71139 8.85077 8.62867 8.90609 8.53762 8.94384C8.44657 8.98158 8.34898 9.00101 8.25042 9.00101C8.15186 9.00101 8.05426 8.98158 7.96321 8.94384C7.87216 8.90609 7.78945 8.85077 7.71979 8.78104L0.219792 1.28104C0.0790615 1.14031 0 0.94944 0 0.750417C0 0.551394 0.0790615 0.360522 0.219792 0.219792C0.360523 0.0790612 0.551394 0 0.750417 0C0.94944 0 1.14031 0.0790612 1.28104 0.219792L8.25042 7.1901L15.2198 0.219792C15.2895 0.150109 15.3722 0.0948337 15.4632 0.0571218C15.5543 0.0194098 15.6519 0 15.7504 0C15.849 0 15.9465 0.0194098 16.0376 0.0571218C16.1286 0.0948337 16.2114 0.150109 16.281 0.219792C16.3507 0.289474 16.406 0.3722 16.4437 0.463245C16.4814 0.554289 16.5008 0.651871 16.5008 0.750417C16.5008 0.848963 16.4814 0.946545 16.4437 1.03759C16.406 1.12863 16.3507 1.21136 16.281 1.28104Z';

const INTENDED_USES = [
  'Single-Family Subdivision',
  'Multifamily / Apartments',
  'Townhomes / Attached Residential',
  'Commercial / Retail',
  'Office',
  'Industrial / Warehouse / Logistics',
  'Church / Place of Worship',
];

// ---------- Primitives ----------

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[17px] text-black tracking-[-0.255px] whitespace-nowrap">
      {children}
    </p>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <SectionHeading>{heading}</SectionHeading>
      {children}
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-[rgba(0,0,0,0.06)] animate-pulse rounded-[6px] ${className ?? ''}`} />;
}

function WarningStamp() {
  return (
    <svg viewBox="0 0 25 25" className="shrink-0 size-[25px]" fill="none">
      <circle cx="12.5" cy="12.5" r="12.5" fill="#b87b14" />
      <rect x="11.1" y="6.25" width="2.8" height="8.25" rx="1.4" fill="white" />
      <circle cx="12.5" cy="17.75" r="1.5" fill="white" />
    </svg>
  );
}

function CheckStamp() {
  return (
    <svg viewBox="0 0 25 25" className="shrink-0 size-[25px]" fill="none">
      <circle cx="12.5" cy="12.5" r="12.5" fill="#298c45" />
      <path d="M7 12.8 10.3 16 18 8.4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProhibitedStamp() {
  return (
    <svg viewBox="0 0 25 25" className="shrink-0 size-[25px]" fill="none">
      <circle cx="12.5" cy="12.5" r="12.5" fill="#c4362f" />
      <path d="M8.5 8.5 16.5 16.5M16.5 8.5 8.5 16.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Mock feasibility logic: the first two uses are by-right, townhomes need an
// exception, everything else is prohibited.
type QuickResult = 'byRight' | 'conditional' | 'prohibited';

function getQuickResult(use: string): QuickResult {
  if (use === INTENDED_USES[0] || use === INTENDED_USES[1]) return 'byRight';
  if (use === INTENDED_USES[2]) return 'conditional';
  return 'prohibited';
}

function QuickCheckResult({ use }: { use: string }) {
  const config = {
    byRight: {
      bg: 'bg-[#dbf0e3]',
      stamp: <CheckStamp />,
      title: 'Permitted by right',
      body: `${use} is allowed on RR zoning.`,
    },
    conditional: {
      bg: 'bg-[#f0e8db]',
      stamp: <WarningStamp />,
      title: 'Exception required',
      body: 'To successfully propose this use, a Special Exception will be required.',
    },
    prohibited: {
      bg: 'bg-[#f0dbdb]',
      stamp: <ProhibitedStamp />,
      title: 'Prohibited',
      body: 'To successfully propose this use, a politically supported re-zoning amendment will be required.',
    },
  }[getQuickResult(use)];

  return (
    <div className={`${config.bg} flex gap-[16px] items-start overflow-clip p-[16px] relative rounded-[8px] shrink-0 w-full`}>
      {config.stamp}
      <div className="flex flex-1 flex-col gap-[4px] items-start min-w-px relative">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[17px] text-black tracking-[-0.255px]">
          {config.title}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[15px] text-[#141c11] w-full">
          {config.body}
        </p>
      </div>
    </div>
  );
}

// A motion-wrapped block that fades/slides in when mounted.
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay }}
      className="flex flex-col gap-[32px] items-start w-full"
    >
      {children}
    </motion.div>
  );
}

function LoadingDots({ color = '#04100b' }: { color?: string }) {
  return (
    <div className="flex gap-[5px] items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-full size-[6px]"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

// ---------- Result content ----------

function KeyResultCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.09)] border-solid flex flex-col gap-[16px] items-start overflow-clip px-[16px] py-[12px] relative rounded-[8px] shrink-0 w-[184px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[15px] text-black">
        {label}
      </p>
      <div className="flex flex-col items-start relative shrink-0">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[28px] text-black tracking-[-0.42px]">
          {value}
        </p>
        <p className="font-['Inter:Light',sans-serif] font-light leading-[1.5] relative shrink-0 text-[13px] text-black whitespace-nowrap">
          {sub}
        </p>
      </div>
    </div>
  );
}

const assumptions = [
  { label: 'Net area after setbacks', value: '0.31 ac' },
  { label: 'Min lot size', value: '6,500 sqft' },
  { label: 'FAR & Coverage', value: 'Per zoning ordinance' },
];

const pathway: { label: string; status: 'required' | 'notNeeded' }[] = [
  { label: 'Preliminary Plan of Subdivision', status: 'required' },
  { label: 'Detailed Site Plan', status: 'required' },
  { label: 'Special Exception', status: 'notNeeded' },
  { label: 'Rezoning', status: 'notNeeded' },
];

type BulletItem = { text: string; citation: number };

const triggers: BulletItem[] = [
  { text: 'Stormwater Management Concept Plan', citation: 1 },
  { text: 'Forest Conservation Plan', citation: 2 },
  { text: 'Erosion & Sediment Control', citation: 3 },
];

const obligations: BulletItem[] = [
  { text: 'Water tap upgrade required', citation: 4 },
  { text: 'Sound wall required', citation: 5 },
];

function InfoPill({ status }: { status: 'required' | 'notNeeded' }) {
  const isRequired = status === 'required';
  return (
    <div
      className={`flex items-center justify-center min-w-[96px] px-[8px] py-[4px] relative rounded-[12px] shrink-0 ${
        isRequired ? 'bg-[#f0e8db]' : 'bg-[#e5f5e8]'
      }`}
    >
      <p
        className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[13px] whitespace-nowrap ${
          isRequired ? 'text-[#b87b14]' : 'text-[#298c45]'
        }`}
      >
        {isRequired ? 'Required' : 'Not needed'}
      </p>
    </div>
  );
}

function CitationPill({ n, onClick }: { n: number; onClick?: (n: number) => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(n)}
      aria-label={`Jump to citation ${n}`}
      className="bg-[#e6eae1] flex flex-col items-center justify-center py-[4px] relative rounded-[16px] shrink-0 w-[27px] hover:bg-[#d7dccf] transition-colors cursor-pointer"
    >
      <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative top-[1px] shrink-0 text-[11px] text-black text-center">
        {n}
      </p>
    </button>
  );
}

function BulletCard({ items, onCitationClick }: { items: BulletItem[]; onCitationClick?: (n: number) => void }) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.09)] border-solid flex flex-col gap-[8px] items-start p-[16px] relative rounded-[8px] shrink-0 w-full">
      {items.map((item) => (
        <div key={item.text} className="flex gap-[8px] items-start relative shrink-0 w-full">
          <ul className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-black shrink-0">
            <li className="list-disc ms-[19.5px]">
              <span className="leading-[1.5]">{item.text}</span>
            </li>
          </ul>
          <CitationPill n={item.citation} onClick={onCitationClick} />
        </div>
      ))}
    </div>
  );
}

// ---------- Dropdown ----------

function IntendedUseDropdown({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (use: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-white border border-[rgba(0,0,0,0.14)] border-solid flex items-center justify-between overflow-clip px-[12px] py-[8px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(4,16,11,0.06)] shrink-0 w-full cursor-pointer"
      >
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[15px] text-[#141c11] text-left">
          {selected ?? 'Select Intended Use'}
        </p>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="overflow-clip relative shrink-0 size-[24px] flex items-center justify-center"
        >
          <svg width="15" height="9" viewBox="0 0 16.5008 9.00101" fill="none">
            <path d={CHEVRON_DOWN} fill="#141c11" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[40]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded-[8px] shadow-[0px_4px_20px_0px_rgba(4,16,11,0.15)] border border-[rgba(0,0,0,0.14)] z-[41] overflow-hidden py-[4px]"
            >
              {INTENDED_USES.map((use) => (
                <button
                  key={use}
                  onClick={() => {
                    onSelect(use);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[15px] leading-[1.55] transition-colors hover:bg-[#f7f8f5] ${
                    selected === use ? 'bg-[#f7f8f5] text-[#288760]' : 'text-[#141c11]'
                  }`}
                >
                  {use}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Panel ----------

type LoadState = 'hidden' | 'loading' | 'shown';

export default function AnalysisPanel({
  className,
  onCitationClick,
}: {
  className?: string;
  onCitationClick?: (n: number) => void;
}) {
  const [selectedUse, setSelectedUse] = useState<string | null>(null);
  const [quickState, setQuickState] = useState<LoadState>('hidden');
  const [fullState, setFullState] = useState<LoadState>('hidden');

  const quickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fullTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (quickTimer.current) clearTimeout(quickTimer.current);
      if (fullTimer.current) clearTimeout(fullTimer.current);
    },
    []
  );

  const handleSelect = (use: string) => {
    if (use === selectedUse) return;
    setSelectedUse(use);
    // Reset the full analysis whenever the intended use changes.
    if (fullTimer.current) clearTimeout(fullTimer.current);
    setFullState('hidden');
    // Quick-check skeleton: 0.5–1.0s.
    setQuickState('loading');
    if (quickTimer.current) clearTimeout(quickTimer.current);
    quickTimer.current = setTimeout(() => setQuickState('shown'), 500 + Math.random() * 500);
  };

  const handleGenerate = () => {
    if (fullState !== 'hidden') return;
    setFullState('loading');
    if (fullTimer.current) clearTimeout(fullTimer.current);
    fullTimer.current = setTimeout(() => setFullState('shown'), 2000 + Math.random() * 1000);
  };

  return (
    <div className={className || 'bg-[#f7f8f5] flex flex-col h-full w-full overflow-hidden'}>
      <div className="relative flex-1 min-h-0 overflow-y-auto flex flex-col gap-[32px] items-start px-[24px] pt-[24px] pb-[32px]">
        {/* Header (always visible) */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.28] relative shrink-0 text-[22px] tracking-[-0.44px] whitespace-nowrap">
            Feasibility Analysis
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[15px] w-full">
            Select your intended use of the parcel to get an AI-assisted feasibility analysis with cited sources
          </p>
        </div>

        {/* Intended Use (always visible) */}
        <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <SectionHeading>Intended Use</SectionHeading>
          <IntendedUseDropdown selected={selectedUse} onSelect={handleSelect} />
        </div>

        {/* Quick-check skeleton */}
        {quickState === 'loading' && (
          <div className="flex flex-col gap-[32px] items-start w-full">
            <Skeleton className="h-[88px] w-full" />
            <div className="flex flex-col gap-[16px] w-full">
              <Skeleton className="h-[12px] w-[100px]" />
              <div className="flex gap-[16px] w-full">
                <Skeleton className="h-[96px] w-[184px]" />
                <Skeleton className="h-[96px] w-[184px]" />
              </div>
            </div>
            <Skeleton className="h-[96px] w-full" />
            <Skeleton className="h-[44px] w-full" />
          </div>
        )}

        {/* Quick-check result + Gross yield + Assumptions + CTA */}
        {quickState === 'shown' && (
          <Reveal>
            {/* Quick Check Result */}
            <QuickCheckResult use={selectedUse ?? ''} />

            {/* Gross Yield */}
            <Section heading="Gross Yield">
              <div className="flex gap-[16px] items-start relative shrink-0 w-full">
                <KeyResultCard label="Lot yield" value="8,200" sub="buildable sqft" />
                <KeyResultCard label="Max lots" value="5" sub="@ min lot 6,500 sqft" />
              </div>
            </Section>

            {/* Assumptions */}
            <Section heading="Assumptions">
              <div className="bg-white border border-[rgba(0,0,0,0.09)] border-solid flex flex-col gap-[4px] items-start p-[16px] relative rounded-[8px] shrink-0 w-full">
                {assumptions.map((row, i) => (
                  <div key={row.label} className="flex flex-col gap-[4px] w-full">
                    <div className="flex items-start justify-between leading-[1.5] relative shrink-0 text-[13px] text-black w-full">
                      <p className="font-['Inter:Light',sans-serif] font-light relative shrink-0">{row.label}</p>
                      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">{row.value}</p>
                    </div>
                    {i < assumptions.length - 1 && (
                      <div className="bg-[rgba(0,0,0,0.09)] h-px relative shrink-0 w-full" />
                    )}
                  </div>
                ))}
              </div>
            </Section>

            {/* CTA */}
            <button
              onClick={handleGenerate}
              disabled={fullState !== 'hidden'}
              className={`flex h-[44px] items-center justify-center px-[24px] py-[16px] relative rounded-[6px] shrink-0 w-full transition-colors ${
                fullState === 'hidden'
                  ? 'bg-[#7ee8a2] hover:bg-[#b3f0c7] active:bg-[#e1ffeb] cursor-pointer'
                  : 'bg-[#7ee8a2]'
              }`}
            >
              {fullState === 'loading' ? (
                <LoadingDots />
              ) : (
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#04100b] text-[14px] whitespace-nowrap">
                  Generate Full Analysis
                </p>
              )}
            </button>
          </Reveal>
        )}

        {/* Full-analysis skeleton */}
        {fullState === 'loading' && (
          <div className="flex flex-col gap-[32px] items-start w-full">
            <div className="flex flex-col gap-[16px] w-full">
              <Skeleton className="h-[12px] w-[140px]" />
              <Skeleton className="h-[96px] w-[184px]" />
            </div>
            <div className="flex flex-col gap-[16px] w-full">
              <Skeleton className="h-[12px] w-[140px]" />
              <Skeleton className="h-[72px] w-full" />
            </div>
            <div className="flex flex-col gap-[16px] w-full">
              <Skeleton className="h-[12px] w-[140px]" />
              <Skeleton className="h-[160px] w-full" />
            </div>
          </div>
        )}

        {/* Full analysis result */}
        {fullState === 'shown' && (
          <Reveal>
            {/* Net Development Yield */}
            <Section heading="Net Development Yield">
              <KeyResultCard label="Net lots" value="4" sub="@ net GFA 6,400 sqft" />
            </Section>

            {/* Entitlement Complexity */}
            <Section heading="Entitlement Complexity">
              <div className="bg-[#f0e8db] flex gap-[16px] items-start overflow-clip p-[16px] relative rounded-[8px] shrink-0 w-full">
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-px relative">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[17px] text-[#b87b14] tracking-[-0.255px]">
                    Moderate
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#141c11] w-full">
                    Limited infrastructure upgrades, standard entitlements
                  </p>
                </div>
              </div>
            </Section>

            {/* Entitlement Pathway */}
            <Section heading="Entitlement Pathway">
              <div className="bg-white border border-[rgba(0,0,0,0.09)] border-solid flex flex-col gap-[12px] items-start p-[16px] relative rounded-[8px] shrink-0 w-full">
                {pathway.map((row) => (
                  <div key={row.label} className="flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[13px] text-black">
                      {row.label}
                    </p>
                    <InfoPill status={row.status} />
                  </div>
                ))}
              </div>
            </Section>

            {/* Technical Plan Triggers */}
            <Section heading="Technical Plan Triggers">
              <BulletCard items={triggers} onCitationClick={onCitationClick} />
            </Section>

            {/* Infrastructure Obligations */}
            <Section heading="Infrastructure Obligations">
              <BulletCard items={obligations} onCitationClick={onCitationClick} />
            </Section>
          </Reveal>
        )}
      </div>
    </div>
  );
}
