export default function ZoomControlMapScale() {
  return (
    <div className="bg-[#f7f8f5] content-stretch flex gap-[10px] items-end p-[4px] relative rounded-[4px] size-full" data-name="Zoom Control/Map Scale">
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
  );
}