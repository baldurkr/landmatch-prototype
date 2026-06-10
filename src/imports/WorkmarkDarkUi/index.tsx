import svgPaths from "./svg-rs004tr239";

function Layers({ className }: { className?: string }) {
  return (
    <div className={className || "h-[7.252px] relative w-[10px]"} data-name="LAYERS">
      <div className="absolute inset-[48.29%_2.08%_0_0]" data-name="Union">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.79199 3.75">
          <path d={svgPaths.p37662600} fill="var(--fill-0, #B7E5BA)" id="Union" />
        </svg>
      </div>
      <div className="absolute inset-[25.31%_2.08%_22.98%_0]" data-name="Union">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.79199 3.75">
          <path d={svgPaths.p37662600} fill="var(--fill-0, #288760)" id="Union" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_48.29%_2.08%]" data-name="Subtract">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.79199 3.75">
          <path d={svgPaths.p37662600} fill="var(--fill-0, #7EE8A2)" id="Subtract" />
        </svg>
      </div>
    </div>
  );
}

export default function WorkmarkDarkUi({ className }: { className?: string }) {
  return (
    <div className={className || "h-[22px] relative w-[112px]"} data-name="WORKMARK [DARK UI]">
      <div className="absolute content-stretch flex inset-[0_0_0_9.82%] items-center" data-name="Wordmark">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[0] not-italic relative shrink-0 text-[#f7f8f5] text-[0px] whitespace-nowrap">
          <span className="leading-[normal] text-[18px]">Land</span>
          <span className="font-['Inter:Extra_Bold_Italic',sans-serif] italic leading-[normal] text-[#288760] text-[18px]">Match</span>
        </p>
      </div>
      <Layers className="absolute aspect-[10/7.251953125] left-0 right-[91.07%] top-[9px]" />
    </div>
  );
}