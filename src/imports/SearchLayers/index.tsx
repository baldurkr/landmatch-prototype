import svgPaths from "./svg-doquxfmhhe";

export default function SearchLayers() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Search Layers">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">SEARCH LAYERS</p>
      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[8px] relative size-full">
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.55] not-italic relative shrink-0 text-[#97a191] text-[15px] whitespace-nowrap">Enter layer name to filter</p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
              <div className="absolute bottom-1/4 left-[6.25%] right-[6.25%] top-[31.25%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 10.5">
                  <path d={svgPaths.p19d28f40} fill="var(--fill-0, #6A7C68)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
      </div>
    </div>
  );
}