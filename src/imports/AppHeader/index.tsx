import imgEllipse4 from "./96403bc07e34042bdc465ff85a494eee2d037121.png";
import svgPaths from "./svg-kyb4evq2ws";
type AvatarProps = {
  className?: string;
  style?: "Photo" | "Initials";
};

function Avatar({ className, style = "Photo" }: AvatarProps) {
  const isInitials = style === "Initials";
  return (
    <div className={className || "relative size-[32px]"}>
      <div className="absolute left-0 size-[32px] top-0">
        {style === "Photo" && <img alt="" className="absolute block inset-0 max-w-none size-full" height="32" src={imgEllipse4} width="32" />}
        {isInitials && (
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" fill="var(--fill-0, #1A5140)" id="Ellipse 4" r="16" />
          </svg>
        )}
      </div>
      {isInitials && <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] left-[15.5px] not-italic text-[14px] text-center text-white top-[5px] whitespace-nowrap">BK</p>}
    </div>
  );
}

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

function WordmarkDarkUi1({ className }: { className?: string }) {
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

export default function AppHeader({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#04100b] content-stretch flex h-[64px] items-center justify-between overflow-clip px-[24px] py-[16px] relative w-[1440px]"} data-name="App Header">
      <WordmarkDarkUi1 className="h-[15px] relative shrink-0 w-[136px]" />
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
        <Avatar className="relative shrink-0 size-[32px]" />
      </div>
    </div>
  );
}