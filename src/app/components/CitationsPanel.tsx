import { SquareArrowOutUpRight } from 'lucide-react';

const PGC_URL = 'https://www.princegeorgescountymd.gov/';

type Citation = {
  title: string;
  source: string;
  date: string;
  url?: string;
};

const citations: Citation[] = [
  { title: 'PGC Stormwater Management Manual, §3.2', source: "Prince George's County DPIE", date: 'March 12, 2024' },
  { title: 'Forest Conservation — Subtitle 25', source: 'Md. Natural Resources Article', date: 'August 1, 2023' },
  { title: 'E&S Control Permit Approval #PG-SCD', source: "Prince George's Soil Conservation District", date: 'March 12, 2024' },
  { title: 'WSSC Water Tap Plat #DPWT 3', source: 'Washington Suburban Sanitary Commission', date: 'January 15, 2024' },
  { title: 'Highway Noise Abatement Policy', source: 'PGC Dept. of Public Works & Transportation', date: 'November 4, 2022' },
  { title: 'Zoning Ordinance Subtitle 27', source: "Prince George's County Code", date: 'January 1, 2024' },
];

function CitationCard({ index, citation }: { index: number; citation: Citation }) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.09)] border-solid flex flex-col gap-[16px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full">
      {/* Number pill + title */}
      <div className="flex gap-[12px] items-center relative shrink-0 w-full">
        <div className="bg-[#e6eae1] flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[16px] shrink-0 w-[27px]">
          <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black text-center tracking-[0.88px] w-full">
            {index}
          </p>
        </div>
        <p className="flex-1 min-w-px font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative text-[14px] text-black">
          {citation.title}
        </p>
      </div>

      {/* Source + date, with external-link button */}
      <div className="flex items-end justify-between relative shrink-0 w-full">
        <div className="flex flex-1 flex-col gap-[4px] items-start min-w-px font-['Inter:Light',sans-serif] font-light leading-[1.5] relative text-[12px] text-black">
          <p className="relative shrink-0 w-full">{citation.source}</p>
          <p className="relative shrink-0 w-full">{citation.date}</p>
        </div>
        <a
          href={citation.url ?? PGC_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open source for ${citation.title}`}
          className="shrink-0 flex items-center justify-center rounded-[6px] p-[2px] -m-[2px] text-black hover:text-[#288760] transition-colors cursor-pointer"
        >
          <SquareArrowOutUpRight size={20} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export default function CitationsPanel({ className }: { className?: string }) {
  return (
    <div className={className || 'bg-[#f7f8f5] flex flex-col h-full w-full overflow-hidden'}>
      <div className="relative flex-1 min-h-0 overflow-y-auto flex flex-col gap-[32px] items-start px-[24px] pt-[24px] pb-[32px]">
        {/* Header */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.28] relative shrink-0 text-[22px] tracking-[-0.44px] whitespace-nowrap">
            Citations
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[15px] w-full">
            The following sources are cited in the analysis for this site.
          </p>
        </div>

        {/* Citation cards */}
        <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          {citations.map((citation, i) => (
            <CitationCard key={citation.title} index={i + 1} citation={citation} />
          ))}
        </div>
      </div>
    </div>
  );
}
