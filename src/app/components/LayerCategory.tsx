import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

type LayerCategoryProps = {
  label: string;
  count: number;
  children?: React.ReactNode;
};

export default function LayerCategory({ label, count, children }: LayerCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div
        className="relative shrink-0 w-full cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
              <div
                className="overflow-clip relative shrink-0 size-[24px] transition-transform duration-200"
                style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <ChevronRight size={24} color="black" />
              </div>
              <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
                {label}
              </p>
            </div>
            <div className="bg-[#e6eae1] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[12px] shrink-0">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-[#141c11] tracking-[0.88px] uppercase whitespace-nowrap">
                {count}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isExpanded && children && (
        <div className="w-full pl-[36px]">{children}</div>
      )}
    </div>
  );
}
