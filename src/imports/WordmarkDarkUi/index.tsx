import svgPaths from "./svg-mqklbdjbn1";

function WordmarkDarkUi({ className }: { className?: string }) {
  return (
    <div className={className || "h-[15px] relative w-[112px]"} data-name="Wordmark [Dark UI]">
      <div className="absolute content-stretch flex inset-[15.91%_0_15.91%_9.82%] items-center" data-name="Wordmark">
        <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[0] not-italic relative shrink-0 text-[#f7f8f5] text-[0px] whitespace-nowrap">
          <span className="leading-[normal] text-[18px]">Land</span>
          <span className="font-['Inter:Extra_Bold_Italic',sans-serif] italic leading-[normal] text-[#288760] text-[18px]">Match</span>
        </p>
      </div>
    </div>
  );
}

export default function WordmarkDarkUi1({ className }: { className?: string }) {
  return (
    <div className={className || "h-[15px] relative w-[136px]"} data-name="Wordmark [Dark UI]">
      <WordmarkDarkUi className="absolute inset-[0_-5.26%_0_11.76%]" />
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
  );
}