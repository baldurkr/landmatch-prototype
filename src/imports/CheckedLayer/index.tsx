import svgPaths from "./svg-nte0gpmc5s";
type CheckedLayerProps = {
  className?: string;
  mode?: "Initial" | "Select View" | "Legend";
};

export default function CheckedLayer({ className, mode = "Initial" }: CheckedLayerProps) {
  const isInitialOrLegend = ["Initial", "Legend"].includes(mode);
  const isLegend = mode === "Legend";
  const isSelectView = mode === "Select View";
  return (
    <div className={className || "bg-[#e6eae1] content-stretch flex flex-col gap-[12px] items-start justify-center p-[8px] relative rounded-[8px] w-[288px]"}>
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        <div className="bg-[#5ca87c] relative rounded-[4px] shrink-0 size-[24px]">
          <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Check">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="Check">
                  <path d={svgPaths.p848bd00} fill="var(--fill-0, white)" id="Vector" />
                </g>
              </svg>
            </div>
          </div>
          <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Parcels</p>
      </div>
      <div className={`relative shrink-0 w-full ${isSelectView ? "content-stretch drop-shadow-[0px_1px_1px_rgba(4,16,11,0.06)] flex flex-col gap-[8px] items-start" : "bg-white rounded-[8px]"}`} data-name="Drop Down">
        {isInitialOrLegend && (
          <>
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
                <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.55] not-italic relative shrink-0 text-[#141c11] text-[15px] whitespace-nowrap">{isLegend ? "Year Built" : "Plain"}</p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
                  <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 9.00101">
                      <path d={svgPaths.p13567b00} fill="var(--fill-0, #141C11)" id="Vector" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(4,16,11,0.06)]" />
          </>
        )}
        {isSelectView && (
          <>
            <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Drop Down">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.55] not-italic relative shrink-0 text-[#141c11] text-[15px] whitespace-nowrap">Plain</p>
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
                    <div className="absolute inset-[28.12%_15.62%_34.37%_15.62%]" data-name="Vector">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.501 9.00118">
                        <path d={svgPaths.p3d97f870} fill="var(--fill-0, #141C11)" id="Vector" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(4,16,11,0.06)]" />
            </div>
            <div className="bg-white relative rounded-[8px] shrink-0 w-full">
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start leading-[1.55] not-italic p-[16px] relative size-full text-[#141c11] text-[15px] whitespace-nowrap">
                  <p className="relative shrink-0">Land Use</p>
                  <p className="relative shrink-0">Sales Price</p>
                  <p className="relative shrink-0">Year Built</p>
                  <p className="relative shrink-0">Owner Occupancy</p>
                </div>
              </div>
              <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(4,16,11,0.06)]" />
            </div>
          </>
        )}
      </div>
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
    </div>
  );
}