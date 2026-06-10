import svgPaths from "./svg-i6m029cu1b";

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

function Frame14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Parcels</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#fde7dc] relative rounded-[4px] shrink-0 size-[16px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame1 />
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">{`<1950`}</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#fbb69b] relative rounded-[4px] shrink-0 size-[16px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame4 />
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">1950-1980</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#fa795b] relative rounded-[4px] shrink-0 size-[16px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame6 />
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">1980-2000</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#e0423b] relative rounded-[4px] shrink-0 size-[16px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame9 />
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">2000-2015</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[#ac272c] relative rounded-[4px] shrink-0 size-[16px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame11 />
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">{`>2015`}</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#d0d1d0] relative rounded-[4px] shrink-0 size-[16px]">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame13 />
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">No data</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame2 />
      <Frame3 />
      <Frame5 />
      <Frame7 />
      <Frame10 />
      <Frame12 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">
        <Frame15 />
      </div>
    </div>
  );
}

export default function CheckedLayer() {
  return (
    <div className="bg-[#e6eae1] content-stretch flex flex-col gap-[12px] items-start justify-center p-[8px] relative rounded-[8px] size-full" data-name="Checked Layer">
      <Frame14 />
      <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Drop Down">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.55] not-italic relative shrink-0 text-[#141c11] text-[15px] whitespace-nowrap">Year Built</p>
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
      <Frame8 />
    </div>
  );
}