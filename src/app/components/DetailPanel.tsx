type DetailPanelProps = {
  className?: string;
  selectedMenuItem: string | null;
};

export default function DetailPanel({ className }: DetailPanelProps) {
  return (
    <div
      className={className || 'bg-[#f7f8f5] border-l border-[rgba(0,0,0,0.09)] flex flex-col gap-[10px] px-[24px] py-[24px] w-full h-full overflow-y-auto'}
    >
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[17px] tracking-[-0.255px] whitespace-nowrap">
        No parcel selected
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal text-[15px] leading-[1.55] whitespace-pre-wrap">
        Enter a street address or click a location on the map to start your analysis.
      </p>
    </div>
  );
}
