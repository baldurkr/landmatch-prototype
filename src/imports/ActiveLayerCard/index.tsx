import svgPaths from "./svg-7b7dyadp6o";
type ActiveLayerCardProps = {
  className?: string;
  format?: "No legend" | "Legend" | "No layers";
};

export default function ActiveLayerCard({ className, format = "No legend" }: ActiveLayerCardProps) {
  const isLegend = format === "Legend";
  const isNoLayers = format === "No layers";
  const isNoLegendOrLegend = ["No legend", "Legend"].includes(format);
  return (
    <div className={className || `relative rounded-[8px] w-[324px] ${isNoLayers ? "" : "bg-white"}`}>
      <div className={`content-stretch flex flex-col items-start overflow-clip p-[16px] relative rounded-[inherit] size-full ${isNoLayers ? "[word-break:break-word] gap-[8px] not-italic text-[#141c11] whitespace-nowrap" : "gap-[16px]"}`}>
        {isNoLegendOrLegend && (
          <>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic relative shrink-0 text-[17px] text-black tracking-[-0.255px] whitespace-nowrap">Parcels</p>
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
                <div className="absolute inset-[6.25%_12.5%_12.5%_12.5%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.25">
                    <path d={svgPaths.p28a03700} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative rounded-[8px] shrink-0 w-[292px]" data-name="Drop Down">
              <div className="content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
                <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.55] not-italic relative shrink-0 text-[#141c11] text-[15px] whitespace-nowrap">{isLegend ? "Year Built" : "Plain"}</p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
                  <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 9.00101">
                      <path d={svgPaths.p13567b00} fill="var(--fill-0, #141C11)" id="Vector" />
                    </svg>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(4,16,11,0.06)]" />
            </div>
          </>
        )}
        {isLegend && (
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
              <div className="bg-[#fde7dc] relative rounded-[4px] shrink-0 size-[16px]">
                <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              </div>
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">{`<1950`}</p>
            </div>
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
              <div className="bg-[#fbb69b] relative rounded-[4px] shrink-0 size-[16px]">
                <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              </div>
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">1950-1980</p>
            </div>
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
              <div className="bg-[#fa795b] relative rounded-[4px] shrink-0 size-[16px]">
                <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              </div>
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">1980-2000</p>
            </div>
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
              <div className="bg-[#e0423b] relative rounded-[4px] shrink-0 size-[16px]">
                <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              </div>
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">2000-2015</p>
            </div>
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
              <div className="bg-[#ac272c] relative rounded-[4px] shrink-0 size-[16px]">
                <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              </div>
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">{`>2015`}</p>
            </div>
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
              <div className="bg-[#d0d1d0] relative rounded-[4px] shrink-0 size-[16px]">
                <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              </div>
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">No data</p>
            </div>
          </div>
        )}
        {isNoLayers && (
          <>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[17px] tracking-[-0.255px]">No active layers</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[15px]">Select a layer to start exploring</p>
          </>
        )}
      </div>
      <div aria-hidden className={`absolute border inset-0 pointer-events-none rounded-[8px] ${isNoLayers ? "border-[rgba(0,0,0,0.14)] border-dashed" : "border-[rgba(0,0,0,0.09)] border-solid shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]"}`} />
    </div>
  );
}