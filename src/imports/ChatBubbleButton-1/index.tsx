import svgPaths from "./svg-4i2tzjstei";

export default function ChatBubbleButton({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#5ca87c] content-stretch flex items-center justify-end p-[9.6px] relative rounded-[28.8px]"} data-name="Chat Bubble Button">
      <div aria-hidden className="absolute border-[1.2px] border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[28.8px]" />
      <div className="overflow-clip relative shrink-0 size-[28.8px]" data-name="Icon">
        <div className="absolute inset-[18.75%_9.37%_6.25%_9.37%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4 21.6">
            <path d={svgPaths.p3477d800} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}