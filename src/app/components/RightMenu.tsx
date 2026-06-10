import { Info, CheckCircle2, TrendingUp, Scale, Download } from 'lucide-react';

type RightMenuProps = {
  className?: string;
};

export default function RightMenu({ className }: RightMenuProps) {
  const menuItems = [
    { icon: Info, label: 'Site Info', id: 'site-info', isActive: true },
    { icon: CheckCircle2, label: 'Permits', id: 'permits' },
    { icon: TrendingUp, label: 'Analysis', id: 'analysis' },
    { icon: Scale, label: 'Citations', id: 'citations' },
    { icon: Download, label: 'Export', id: 'export' },
  ];

  return (
    <div
      className={className || 'bg-[#f7f8f5] flex flex-col gap-[16px] px-[16px] py-[24px] w-[160px] h-full overflow-y-auto'}
    >
      {menuItems.map(({ icon: Icon, label, id, isActive }) => (
        <button
          key={id}
          className={`content-stretch flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px] transition-colors ${
            isActive
              ? 'bg-[#e6eae1]'
              : 'bg-[#f7f8f5] hover:bg-[#edf0ea]'
          }`}
        >
          <Icon size={24} color="black" className="shrink-0" />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
            {label}
          </p>
        </button>
      ))}
    </div>
  );
}
