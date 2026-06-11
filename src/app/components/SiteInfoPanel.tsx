import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import HouseLineIcon from '../../assets/icons/Shape=House Line.svg';

type Row = { label: string; value: string };

function InfoRow({ label, value, last }: Row & { last?: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between leading-[1.5] relative shrink-0 text-[13px] text-black w-full">
        <p className="font-['Inter:Light',sans-serif] font-light relative shrink-0 pr-[8px]">
          {label}
        </p>
        <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-right whitespace-nowrap">
          {value}
        </p>
      </div>
      {!last && <div className="bg-[rgba(0,0,0,0.09)] h-px relative shrink-0 w-full" />}
    </>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.09)] border-solid flex flex-col gap-[16px] items-start p-[16px] relative rounded-[8px] shrink-0 w-full">
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[17px] text-black tracking-[-0.255px]">
      {children}
    </p>
  );
}

const TABS = ['Zoning', 'Property', 'Jurisdiction', 'Easements'] as const;

const propertyRows: Row[] = [
  { label: 'Parcel / Lot #', value: '0603753' },
  { label: 'Land Area (acres)', value: '10.6 acres' },
  { label: 'Land Area (sqft)', value: '461,736 sqft' },
  { label: 'Building Area', value: '2,028 sqft' },
  { label: 'Year Built', value: '1928' },
  { label: 'Owner Name', value: 'George PRINCETON' },
  { label: 'Assessed Value', value: '$400,000.00' },
  { label: 'Last Sales Price', value: '$150,000.00' },
];

const jurisdictionRows: Row[] = [
  { label: 'State', value: 'Maryland' },
  { label: 'County', value: "Prince George's" },
  { label: 'Municipality', value: 'Capitol Heights' },
  { label: 'Water & Sewer', value: 'WSSC' },
  { label: 'Private Grading', value: 'PG-DPIE' },
  { label: 'Private Stormwater Management', value: 'PG-DPIE' },
  { label: 'Right-of-Way Dedication', value: 'PG-DPIE' },
  { label: 'Erosion & Sediment Control', value: 'PG-SCD' },
  { label: 'Entitlements', value: 'M-NCPPC' },
  { label: 'Building Permits', value: 'PG-DPIE' },
];

const easementsRows: Row[] = [
  { label: 'Stormwater / Storm Drain', value: 'None' },
  { label: 'Access / Ingress / Egress', value: '1.9%' },
  { label: 'Floodplain', value: 'None' },
  { label: 'Woodland / Forest Conservation', value: '11.0%' },
  { label: 'Streams', value: 'None' },
  { label: 'Wetlands', value: 'None' },
  { label: 'Steep Slopes', value: '3.3%' },
];

export default function SiteInfoPanel({ className }: { className?: string }) {
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
        {/* Address */}
        <div className="flex flex-col items-start relative shrink-0 text-black w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[17px] tracking-[-0.255px] whitespace-nowrap">
            6501 Seat Pleasant Drive
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[15px] w-full">
            Capitol Heights, MD 20743
          </p>
        </div>

        {/* Tab Control */}
        <div className="relative w-full">
          <div className="border-[rgba(0,0,0,0.14)] border-b-2 border-solid flex items-start relative w-full">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => handleTabClick(i)}
                className="flex-1 flex items-center justify-center py-[8px] relative cursor-pointer"
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[14px] text-black text-center tracking-[-0.07px]">
                  {tab}
                </p>
              </button>
            ))}
          </div>
          {/* Animated active underline — width is one quarter of the row, x shifts by full tab widths */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] w-1/4 bg-[#288760]"
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
        {/* Zoning */}
        <div ref={(el) => { sectionRefs.current[0] = el; }} className="w-full scroll-mt-[24px]">
          <Card>
            <CardTitle>Zoning</CardTitle>
            <div className="flex gap-[16px] items-center relative shrink-0 w-full">
              <img src={HouseLineIcon} alt="" className="shrink-0 size-[24px]" />
              <p className="flex-1 font-['Inter:Regular',sans-serif] font-normal leading-[1.55] min-w-px relative text-[15px] text-black">
                RR (Residential, Rural)
              </p>
            </div>
          </Card>
        </div>

        {/* Property */}
        <div ref={(el) => { sectionRefs.current[1] = el; }} className="w-full">
          <Card>
            <CardTitle>Property</CardTitle>
            <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              {propertyRows.map((row, i) => (
                <InfoRow key={row.label} {...row} last={i === propertyRows.length - 1} />
              ))}
            </div>
          </Card>
        </div>

        {/* Jurisdiction */}
        <div ref={(el) => { sectionRefs.current[2] = el; }} className="w-full">
          <Card>
            <CardTitle>Jurisdiction</CardTitle>
            <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              {jurisdictionRows.map((row, i) => (
                <InfoRow key={row.label} {...row} last={i === jurisdictionRows.length - 1} />
              ))}
            </div>
          </Card>
        </div>

        {/* Easements */}
        <div ref={(el) => { sectionRefs.current[3] = el; }} className="w-full">
          <Card>
            <CardTitle>Easements</CardTitle>
            <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              {easementsRows.map((row, i) => (
                <InfoRow key={row.label} {...row} last={i === easementsRows.length - 1} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
