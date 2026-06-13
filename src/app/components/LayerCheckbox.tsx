type LayerCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: React.ReactNode;
};

export default function LayerCheckbox({ label, checked, onChange, children }: LayerCheckboxProps) {
  return (
    <div
      className={`relative shrink-0 w-full ${checked ? 'bg-[#e6eae1] rounded-[8px]' : ''}`}
    >
      <div className={`flex flex-col size-full ${checked ? 'gap-[12px] p-[8px]' : ''}`}>
        <div
          className={`content-stretch flex gap-[12px] items-center cursor-pointer ${checked ? '' : 'p-[8px]'}`}
          onClick={() => onChange(!checked)}
        >
          <div className={`relative rounded-[4px] shrink-0 size-[24px] ${checked ? 'bg-[#5ca87c]' : 'bg-white'}`}>
            {checked && (
              <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path d="M3 7.5L7 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}
            <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[4px]" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
            {label}
          </p>
        </div>
        {checked && children}
      </div>
    </div>
  );
}
