type Props = {
  label: string;
  onRemove: () => void;
};

export default function SimpleActiveLayerCard({ label, onRemove }: Props) {
  return (
    <div className="relative rounded-[8px] w-full bg-white">
      <div className="content-stretch flex items-center justify-between p-[12px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
          {label}
        </p>
        <div
          className="relative shrink-0 size-[20px] cursor-pointer hover:opacity-70"
          onClick={onRemove}
        >
          <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
            <path d="M15.625 5.625L5.625 15.625M5.625 5.625L15.625 15.625" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
    </div>
  );
}
