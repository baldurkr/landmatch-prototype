import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download } from 'lucide-react';

const CHEVRON_DOWN =
  'M16.281 1.28104L8.78104 8.78104C8.71139 8.85077 8.62867 8.90609 8.53762 8.94384C8.44657 8.98158 8.34898 9.00101 8.25042 9.00101C8.15186 9.00101 8.05426 8.98158 7.96321 8.94384C7.87216 8.90609 7.78945 8.85077 7.71979 8.78104L0.219792 1.28104C0.0790615 1.14031 0 0.94944 0 0.750417C0 0.551394 0.0790615 0.360522 0.219792 0.219792C0.360523 0.0790612 0.551394 0 0.750417 0C0.94944 0 1.14031 0.0790612 1.28104 0.219792L8.25042 7.1901L15.2198 0.219792C15.2895 0.150109 15.3722 0.0948337 15.4632 0.0571218C15.5543 0.0194098 15.6519 0 15.7504 0C15.849 0 15.9465 0.0194098 16.0376 0.0571218C16.1286 0.0948337 16.2114 0.150109 16.281 0.219792C16.3507 0.289474 16.406 0.3722 16.4437 0.463245C16.4814 0.554289 16.5008 0.651871 16.5008 0.750417C16.5008 0.848963 16.4814 0.946545 16.4437 1.03759C16.406 1.12863 16.3507 1.21136 16.281 1.28104Z';

type Format = { label: string; ext: string };

const FORMATS: Format[] = [
  { label: 'Word (.DOCX)', ext: 'DOCX' },
  { label: 'Markdown (.MD)', ext: 'MD' },
  { label: 'PDF Document (.PDF)', ext: 'PDF' },
];

function FormatDropdown({
  selected,
  onSelect,
}: {
  selected: Format | null;
  onSelect: (format: Format) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-white border border-[rgba(0,0,0,0.14)] border-solid flex items-center justify-between overflow-clip px-[12px] py-[8px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(4,16,11,0.06)] shrink-0 w-full cursor-pointer"
      >
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[15px] text-[#141c11] text-left">
          {selected?.label ?? 'Select File Format'}
        </p>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="overflow-clip relative shrink-0 size-[24px] flex items-center justify-center"
        >
          <svg width="15" height="9" viewBox="0 0 16.5008 9.00101" fill="none">
            <path d={CHEVRON_DOWN} fill="#141c11" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[40]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded-[8px] shadow-[0px_4px_20px_0px_rgba(4,16,11,0.15)] border border-[rgba(0,0,0,0.14)] z-[41] overflow-hidden py-[4px]"
            >
              {FORMATS.map((format) => (
                <button
                  key={format.ext}
                  onClick={() => {
                    onSelect(format);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[15px] leading-[1.55] transition-colors hover:bg-[#f7f8f5] ${
                    selected?.ext === format.ext ? 'bg-[#f7f8f5] text-[#288760]' : 'text-[#141c11]'
                  }`}
                >
                  {format.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExportPanel({ className }: { className?: string }) {
  const [selected, setSelected] = useState<Format | null>(null);

  const handleDownload = () => {
    if (!selected) return;
    const blob = new Blob(['**Test report**'], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={className || 'bg-[#f7f8f5] flex flex-col h-full w-full overflow-hidden'}>
      <div className="relative flex-1 min-h-0 overflow-y-auto flex flex-col gap-[32px] items-start px-[24px] pt-[24px] pb-[32px]">
        {/* Header */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.28] relative shrink-0 text-[22px] tracking-[-0.44px] whitespace-nowrap">
            Export
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] relative shrink-0 text-[15px] w-full">
            Download a full editable report with aggregated parcel data, analysis results and full citations.
          </p>
        </div>

        {/* File format */}
        <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[17px] text-black tracking-[-0.255px] whitespace-nowrap">
            File Format
          </p>
          <FormatDropdown selected={selected} onSelect={setSelected} />
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={!selected}
          className={`flex gap-[10px] h-[44px] items-center justify-center px-[24px] py-[16px] relative rounded-[6px] shrink-0 w-full transition-colors ${
            selected
              ? 'bg-[#7ee8a2] hover:bg-[#b3f0c7] active:bg-[#e1ffeb] cursor-pointer text-[#04100b]'
              : 'bg-[#e6eae1] cursor-not-allowed text-[#97a191]'
          }`}
        >
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] whitespace-nowrap">
            {selected ? `Download ${selected.ext} Report` : 'Download Report'}
          </p>
          <Download size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
