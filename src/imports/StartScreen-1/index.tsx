import svgPaths from "./svg-ksyuk7cq9z";
import imgEllipse4 from "./96403bc07e34042bdc465ff85a494eee2d037121.png";
import imgMap from "./6193679568a511e5f2d1c2d1d43ae06d6382634d.png";

function Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="content-stretch flex gap-[4px] h-[40px] items-center px-[16px] relative shrink-0" data-name="Menu Button">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[#e8f1ea] text-[14px] tracking-[-0.07px] whitespace-nowrap">Untitled Project</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 9.00101">
              <path d={svgPaths.p13567b00} fill="var(--fill-0, #E8F1EA)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 size-[32px]" data-name="Avatar">
        <div className="absolute left-0 size-[32px] top-0">
          <img alt="" className="absolute block inset-0 max-w-none size-full" height="32" src={imgEllipse4} width="32" />
        </div>
      </div>
    </div>
  );
}

function Active() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Active">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">ACTIVE</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Parcels</p>
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5007 12.5007">
            <path d={svgPaths.p3e5fcf0} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="bg-white relative rounded-[8px] shrink-0 w-[324px]" data-name="Active Layer Card">
        <div className="content-stretch flex flex-col items-start overflow-clip p-[12px] relative rounded-[inherit] size-full">
          <Frame14 />
        </div>
        <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Active />
      <Frame17 />
    </div>
  );
}

function SearchLayers() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Search Layers">
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

function Check() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Check">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check">
          <path d={svgPaths.p848bd00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#5ca87c] relative rounded-[4px] shrink-0 size-[24px]">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Check />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Parcels</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[24px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[24px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00101 16.5008">
            <path d={svgPaths.pebee80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Environmental</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00101 16.5008">
            <path d={svgPaths.pebee80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">WSSC</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00101 16.5008">
            <path d={svgPaths.pebee80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Power</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[24px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[24px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[24px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function CommonLayers() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Common Layers">
      <div className="bg-[#e6eae1] relative rounded-[8px] shrink-0 w-full" data-name="Checked Layer">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start justify-center p-[8px] relative size-full">
            <Frame24 />
            <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Drop Down">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.55] not-italic relative shrink-0 text-[#141c11] text-[15px] whitespace-nowrap">Plain</p>
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
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Checkbox">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative size-full">
            <Frame2 />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Zoning</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Checkbox">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative size-full">
            <Frame3 />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">SDAT Assessments</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Layer Category">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
            <Frame5 />
            <div className="bg-[#e6eae1] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Count Pill">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[#141c11] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">3</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Layer Category">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
            <Frame6 />
            <div className="bg-[#e6eae1] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Count Pill">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[#141c11] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">8</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Layer Category">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
            <Frame7 />
            <div className="bg-[#e6eae1] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Count Pill">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[#141c11] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Checkbox">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative size-full">
            <Frame4 />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Right-of-Way</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Checkbox">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative size-full">
            <Frame8 />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Census Tracts</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Checkbox">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative size-full">
            <Frame9 />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">County Boundaries</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Common() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Common">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">COMMON</p>
      <CommonLayers />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00101 16.5008">
            <path d={svgPaths.pebee80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">{`Prince George’s `}</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00101 16.5008">
            <path d={svgPaths.pebee80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Montgomery</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="relative shrink-0 w-full" data-name="Layer Category">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
            <Frame11 />
            <div className="bg-[#e6eae1] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Count Pill">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[#141c11] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">1007</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Layer Category">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
            <Frame12 />
            <div className="bg-[#e6eae1] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Count Pill">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[#141c11] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">479</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function County() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="County">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">County</p>
      <Frame10 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame13 />
      <SearchLayers />
      <Common />
      <County />
    </div>
  );
}

function Layers() {
  return (
    <div className="bg-[#f7f8f5] h-full relative shrink-0 w-[356px]" data-name="Layers">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[16px] py-[24px] relative size-full">
          <Frame16 />
        </div>
      </div>
    </div>
  );
}

function TopLeftDock() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Top Left Dock">
      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-[288px]" data-name="Input">
        <div className="content-stretch flex items-center justify-between overflow-clip px-[16px] py-[8px] relative rounded-[inherit] size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.55] not-italic relative shrink-0 text-[#97a191] text-[15px] whitespace-nowrap">Enter address</p>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[9.29%_9.37%_9.37%_9.29%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5211 19.5211">
                <path d={svgPaths.p26a8cbc0} fill="var(--fill-0, #6A7C68)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
      </div>
    </div>
  );
}

function TopDock() {
  return (
    <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-name="Top Dock">
      <TopLeftDock />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 15">
          <circle cx="7.5" cy="8" id="Ellipse 2" r="7" stroke="var(--stroke-0, #141C11)" />
          <path d={svgPaths.p1aea4e00} fill="var(--fill-0, #141C11)" id="Ellipse 3" />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 15">
          <circle cx="7.5" cy="8" id="Ellipse 2" r="7" stroke="var(--stroke-0, #141C11)" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-white h-full relative rounded-[8px] shrink-0">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[4px] py-[2px] relative size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative shrink-0" data-name="Radio Button">
            <Frame18 />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Street</p>
          </div>
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative shrink-0" data-name="Radio Button">
            <Frame19 />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Satellite</p>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
    </div>
  );
}

function BottomLeftDock() {
  return (
    <div className="content-stretch flex gap-[16px] h-[40px] items-end relative shrink-0" data-name="Bottom Left Dock">
      <div className="bg-[#5ca87c] relative rounded-[8px] shrink-0 size-[40px]" data-name="Icon Button">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute left-[7.67px] overflow-clip size-[24px] top-[7.94px]" data-name="Icon">
            <div className="absolute inset-[6.25%_9.33%_6.25%_9.38%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5113 20.9999">
                <path d={svgPaths.p16a42000} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
      </div>
      <Frame15 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[20px] top-1/2" data-name="Icon">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <path d={svgPaths.p32bd8700} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[20px] top-1/2" data-name="Icon">
        <div className="absolute inset-[46.88%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 1.25">
            <path d={svgPaths.p1bc5b600} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0">
      <div className="bg-[#f7f8f5] content-stretch flex gap-[10px] items-end p-[4px] relative rounded-[4px] shrink-0" data-name="Zoom Control/Map Scale">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[12px] text-black uppercase whitespace-pre">
          <span className="leading-[1.5] lowercase">20 mi</span>
          <span className="leading-[1.5]">{`   `}</span>
        </p>
        <div className="h-[7.551px] relative shrink-0 w-[64px]">
          <div className="absolute inset-[0_-1.01%_-8.56%_-1.01%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65.2929 8.19697">
              <path d="M0.646465 0V7.5505H64.6465V0" id="Vector 1" stroke="var(--stroke-0, #141C11)" strokeWidth="1.29293" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#5ca87c] content-stretch flex items-center justify-end p-[9.6px] relative rounded-[28.8px] shrink-0" data-name="Chat Bubble Button">
        <div aria-hidden className="absolute border-[1.2px] border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[28.8px]" />
        <div className="overflow-clip relative shrink-0 size-[28.8px]" data-name="Icon">
          <div className="absolute inset-[18.75%_9.37%_6.25%_9.37%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4 21.6">
              <path d={svgPaths.p3477d800} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-end justify-end relative shrink-0">
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Zoom Control">
        <div className="content-stretch flex flex-col gap-[10px] items-start justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
          <Frame21 />
          <div className="bg-[rgba(0,0,0,0.14)] h-px relative shrink-0 w-full" />
          <Frame22 />
        </div>
        <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
      </div>
      <Frame23 />
    </div>
  );
}

function BottomDock() {
  return (
    <div className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full" data-name="Bottom Dock">
      <BottomLeftDock />
      <Frame20 />
    </div>
  );
}

function Map() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Map">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMap} />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between px-[16px] py-[24px] relative size-full">
          <TopDock />
          <BottomDock />
        </div>
      </div>
    </div>
  );
}

function MainContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px overflow-clip relative w-full" data-name="Main Container">
      <Layers />
      <Map />
      <div className="absolute bg-white left-[336px] rounded-[8px] size-[40px] top-[460px]" data-name="Icon Button">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute left-[7.67px] overflow-clip size-[24px] top-[7.94px]" data-name="Icon">
            <div className="absolute inset-[24.22%_27.34%_24.22%_21.09%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3758 12.3756">
                <path d={svgPaths.p1423a900} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
    </div>
  );
}

export default function StartScreen() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Start Screen">
      <div className="bg-[#04100b] content-stretch flex h-[64px] items-center justify-between overflow-clip p-[16px] relative shrink-0 w-[1440px]" data-name="App Header">
        <div className="h-[15px] relative shrink-0 w-[136px]" data-name="Wordmark [Dark UI]">
          <div className="absolute inset-[0_-5.26%_0_11.76%]" data-name="Wordmark [Dark UI]">
            <div className="absolute content-stretch flex inset-[15.91%_0_15.91%_9.82%] items-center" data-name="Wordmark">
              <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[0] not-italic relative shrink-0 text-[#f7f8f5] text-[0px] whitespace-nowrap">
                <span className="leading-[normal] text-[18px]">Land</span>
                <span className="font-['Inter:Extra_Bold_Italic',sans-serif] italic leading-[normal] text-[#288760] text-[18px]">Match</span>
              </p>
            </div>
          </div>
          <div className="absolute aspect-[23.219512939453125/16.838682174682617] left-0 right-[84.56%] top-0" data-name="Pancake Icon">
            <div className="absolute inset-[48.29%_2.08%_-0.01%_0]" data-name="Union">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5625 7.75684">
                <path d={svgPaths.p12251000} fill="var(--fill-0, #B7E5BA)" id="Union" />
              </svg>
            </div>
            <div className="absolute inset-[25.32%_2.08%_22.98%_0]" data-name="Union">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5625 7.75586">
                <path d={svgPaths.p8d1b700} fill="var(--fill-0, #288760)" id="Union" />
              </svg>
            </div>
            <div className="absolute inset-[0.01%_0_48.29%_2.09%]" data-name="Subtract">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5625 7.75586">
                <path d={svgPaths.p29775100} fill="var(--fill-0, #7EE8A2)" id="Subtract" />
              </svg>
            </div>
          </div>
        </div>
        <Frame1 />
      </div>
      <MainContainer />
    </div>
  );
}