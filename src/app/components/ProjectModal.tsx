import { X } from 'lucide-react';
import { useState } from 'react';

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
};

export default function ProjectModal({ isOpen, onClose, onSave }: ProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, description);
      setName('');
      setDescription('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]" onClick={onClose}>
      <div
        className="bg-white rounded-[12px] w-[480px] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-[24px] border-b border-[rgba(0,0,0,0.09)]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-black">
            Save New Project
          </h2>
          <button
            onClick={onClose}
            className="p-[4px] hover:bg-[#f7f8f5] rounded-[4px] transition-colors"
          >
            <X size={24} color="black" />
          </button>
        </div>
        <div className="p-[24px] flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <label className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              className="bg-white border border-[rgba(0,0,0,0.14)] rounded-[8px] px-[16px] py-[12px] font-['Inter:Regular',sans-serif] text-[15px] focus:outline-none focus:border-[#5ca87c]"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows={4}
              className="bg-white border border-[rgba(0,0,0,0.14)] rounded-[8px] px-[16px] py-[12px] font-['Inter:Regular',sans-serif] text-[15px] focus:outline-none focus:border-[#5ca87c] resize-none"
            />
          </div>
        </div>
        <div className="flex gap-[12px] justify-end p-[24px] border-t border-[rgba(0,0,0,0.09)]">
          <button
            onClick={onClose}
            className="px-[20px] py-[10px] rounded-[8px] font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black hover:bg-[#f7f8f5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-[20px] py-[10px] rounded-[8px] bg-[#7ee8a2] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#04100b] hover:bg-[#b3f0c7] active:bg-[#e1ffeb] transition-colors"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}
