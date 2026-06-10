import { useState } from 'react';
import InfoIcon from '../../assets/icons/Shape=Info.svg';
import CheckIcon from '../../assets/icons/Shape=Check.svg';
import ChartIcon from '../../assets/icons/Shape=Chart.svg';
import QuotesIcon from '../../assets/icons/Shape=Quotes.svg';
import DownloadIcon from '../../assets/icons/Shape=Download.svg';

type MenuButtonProps = {
  icon: string;
  label: string;
  onClick: (label: string) => void;
};

function MenuButton({ icon, label, onClick }: MenuButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(label)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? '#edf0ea' : '#f7f8f5',
        transition: 'background-color 150ms ease-in-out',
      }}
      className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px] pointer-events-auto cursor-pointer"
    >
      <img src={icon} alt={label} className="shrink-0 size-[24px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
        {label}
      </p>
    </button>
  );
}

type RightMenuProps = {
  className?: string;
  onMenuItemClick?: (label: string) => void;
};

export default function RightMenu({ className, onMenuItemClick }: RightMenuProps) {
  const menuItems = [
    { icon: InfoIcon, label: 'Site Info' },
    { icon: CheckIcon, label: 'Permits' },
    { icon: ChartIcon, label: 'Analysis' },
    { icon: QuotesIcon, label: 'Citations' },
    { icon: DownloadIcon, label: 'Export' },
  ];

  return (
    <div
      className={className || 'bg-[#f7f8f5] flex flex-col gap-[16px] px-[16px] py-[24px] w-[160px] h-full overflow-y-auto pointer-events-auto'}
    >
      {menuItems.map(({ icon, label }) => (
        <MenuButton
          key={label}
          icon={icon}
          label={label}
          onClick={(label) => {
            if (onMenuItemClick) onMenuItemClick(label);
          }}
        />
      ))}
    </div>
  );
}
