type Props = {
  label: string;
  onRemove: () => void;
};

export default function LayerPill({ label, onRemove }: Props) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.14)] border-solid content-stretch flex gap-[8px] items-center justify-center min-w-[96px] pl-[12px] pr-[12px] py-[8px] relative rounded-[16px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[13px] text-[#141c11] whitespace-nowrap">
        {label}
      </p>
      {/* Hit area is intentionally larger than the 16px icon: it spans the full
          pill height and reaches from the gap to the right edge, while negative
          margins keep the icon in its original position. */}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="-ml-[4px] -mr-[12px] -my-[8px] flex items-center justify-center pl-[4px] pr-[12px] py-[8px] rounded-r-[16px] cursor-pointer hover:opacity-70 shrink-0"
      >
        <svg className="block size-[16px]" fill="none" viewBox="0 0 16 16" aria-hidden>
          <path d="M12 4L4 12M4 4L12 12" stroke="#141c11" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
