import svgPaths from "./svg-gfo6r408vx";

function Frame() {
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

export default function ActiveLayerCard() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Active Layer Card">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[12px] relative rounded-[inherit] size-full">
        <Frame />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
    </div>
  );
}