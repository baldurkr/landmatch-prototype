import { useState } from 'react';

type Props = {
  selectedStyle: 'plain' | 'yearBuilt';
  onStyleChange: (style: 'plain' | 'yearBuilt') => void;
};

const legendItems: { color: string; label: string }[] = [
  { color: '#fde7dc', label: '<1950' },
  { color: '#fbb69b', label: '1950-1980' },
  { color: '#fa795b', label: '1980-2000' },
  { color: '#e0423b', label: '2000-2015' },
  { color: '#ac272c', label: '>2015' },
  { color: '#d0d1d0', label: 'No data' },
];

export default function ParcelsViewSelector({ selectedStyle, onStyleChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const label = selectedStyle === 'yearBuilt' ? 'Year Built' : 'Plain';

  const handleSelect = (style: 'plain' | 'yearBuilt') => {
    onStyleChange(style);
    setIsOpen(false);
  };

  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
      <div className="relative w-full">
        <div
          className="bg-white rounded-[8px] cursor-pointer flex items-center justify-between px-[12px] py-[8px]"
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        >
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-[#141c11] whitespace-nowrap">
            {label}
          </p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d={isOpen ? "M7 14L12 9L17 14" : "M7 10L12 15L17 10"}
              stroke="#141C11"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(4,16,11,0.06)]" />
        </div>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
            <div className="absolute top-[44px] left-0 w-full bg-white rounded-[8px] shadow-[0px_4px_12px_0px_rgba(4,16,11,0.12)] z-[9999] overflow-hidden">
              <div
                className="px-[12px] py-[8px] cursor-pointer hover:bg-[#f7f8f5] transition-colors"
                onClick={(e) => { e.stopPropagation(); handleSelect('plain'); }}
              >
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-[#141c11]">Plain</p>
              </div>
              <div
                className="px-[12px] py-[8px] cursor-pointer hover:bg-[#f7f8f5] transition-colors"
                onClick={(e) => { e.stopPropagation(); handleSelect('yearBuilt'); }}
              >
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-[#141c11]">Year Built</p>
              </div>
            </div>
          </>
        )}
      </div>
      {selectedStyle === 'yearBuilt' && (
        <div className="relative rounded-[8px] w-full">
          <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative">
            {legendItems.map((item) => (
              <div key={item.label} className="content-stretch flex gap-[8px] items-start">
                <div className="relative rounded-[4px] shrink-0 size-[16px]" style={{ backgroundColor: item.color }}>
                  <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                </div>
                <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
