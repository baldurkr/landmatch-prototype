import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Project = {
  id: string;
  name: string;
  description: string;
};

type ProjectMenuProps = {
  currentProject: string;
  currentProjectDescription: string;
  onNewProject: () => void;
  onOpenProject: (project: Project) => void;
};

const recentProjects: Project[] = [
  { id: '1', name: 'Walker Mill Condo', description: 'Condo development feasibility study' },
  { id: '2', name: 'Downtown Redevelopment', description: 'Commercial zone analysis' },
];

const currentProjectData: Project = {
  id: '0',
  name: "John's Ranch",
  description: 'Planning of Westphalia ranch for John Dutton',
};

// SVG icon paths from Figma component
const SVG_FOLDER_PLUS = "M18 3.00001H10.0603L7.5 0.439695C7.36122 0.299801 7.19601 0.188889 7.01398 0.113407C6.83196 0.0379245 6.63674 -0.000621974 6.43969 7.58902e-06H1.5C1.10218 7.58902e-06 0.720644 0.158043 0.43934 0.439347C0.158035 0.720652 0 1.10218 0 1.50001V15.0581C0.000496116 15.4404 0.152567 15.8068 0.422863 16.0771C0.69316 16.3474 1.05962 16.4995 1.44188 16.5H18.0834C18.459 16.4995 18.819 16.3501 19.0846 16.0846C19.3501 15.819 19.4995 15.459 19.5 15.0834V4.50001C19.5 4.10218 19.342 3.72065 19.0607 3.43935C18.7794 3.15804 18.3978 3.00001 18 3.00001ZM6.43969 1.50001L7.93969 3.00001H1.5V1.50001H6.43969ZM18 15H1.5V4.50001H18V15ZM9.75 6.75001C9.94891 6.75001 10.1397 6.82903 10.2803 6.96968C10.421 7.11033 10.5 7.3011 10.5 7.50001V9.00001H12C12.1989 9.00001 12.3897 9.07902 12.5303 9.21968C12.671 9.36033 12.75 9.5511 12.75 9.75001C12.75 9.94892 12.671 10.1397 12.5303 10.2803C12.3897 10.421 12.1989 10.5 12 10.5H10.5V12C10.5 12.1989 10.421 12.3897 10.2803 12.5303C10.1397 12.671 9.94891 12.75 9.75 12.75C9.55109 12.75 9.36032 12.671 9.21967 12.5303C9.07902 12.3897 9 12.1989 9 12V10.5H7.5C7.30109 10.5 7.11032 10.421 6.96967 10.2803C6.82902 10.1397 6.75 9.94892 6.75 9.75001C6.75 9.5511 6.82902 9.36033 6.96967 9.21968C7.11032 9.07902 7.30109 9.00001 7.5 9.00001H9V7.50001C9 7.3011 9.07902 7.11033 9.21967 6.96968C9.36032 6.82903 9.55109 6.75001 9.75 6.75001Z";
const SVG_MAP_PIN = "M8.25 4.5C7.50832 4.5 6.7833 4.71993 6.16661 5.13199C5.54993 5.54404 5.06928 6.12971 4.78545 6.81494C4.50162 7.50016 4.42736 8.25416 4.57205 8.98159C4.71675 9.70902 5.0739 10.3772 5.59835 10.9017C6.1228 11.4261 6.79098 11.7833 7.51841 11.9279C8.24584 12.0726 8.99984 11.9984 9.68506 11.7145C10.3703 11.4307 10.956 10.9501 11.368 10.3334C11.7801 9.7167 12 8.99168 12 8.25C12 7.25544 11.6049 6.30161 10.9017 5.59835C10.1984 4.89509 9.24456 4.5 8.25 4.5ZM8.25 10.5C7.80499 10.5 7.36998 10.368 6.99997 10.1208C6.62996 9.87357 6.34157 9.52217 6.17127 9.11104C6.00097 8.6999 5.95642 8.2475 6.04323 7.81105C6.13005 7.37459 6.34434 6.97368 6.65901 6.65901C6.97368 6.34434 7.37459 6.13005 7.81105 6.04323C8.2475 5.95642 8.6999 6.00097 9.11104 6.17127C9.52217 6.34157 9.87357 6.62996 10.1208 6.99997C10.368 7.36998 10.5 7.80499 10.5 8.25C10.5 8.84674 10.2629 9.41903 9.84099 9.84099C9.41903 10.2629 8.84674 10.5 8.25 10.5ZM8.25 0C6.06273 0.00248131 3.96575 0.872472 2.41911 2.41911C0.872472 3.96575 0.00248131 6.06273 0 8.25C0 11.1937 1.36031 14.3138 3.9375 17.2734C5.09552 18.6108 6.39886 19.8151 7.82344 20.8641C7.94954 20.9524 8.09978 20.9998 8.25375 20.9998C8.40772 20.9998 8.55796 20.9524 8.68406 20.8641C10.106 19.8147 11.4068 18.6104 12.5625 17.2734C15.1359 14.3138 16.5 11.1937 16.5 8.25C16.4975 6.06273 15.6275 3.96575 14.0809 2.41911C12.5343 0.872472 10.4373 0.00248131 8.25 0ZM8.25 19.3125C6.70031 18.0938 1.5 13.6172 1.5 8.25C1.5 6.45979 2.21116 4.7429 3.47703 3.47703C4.7429 2.21116 6.45979 1.5 8.25 1.5C10.0402 1.5 11.7571 2.21116 13.023 3.47703C14.2888 4.7429 15 6.45979 15 8.25C15 13.6153 9.79969 18.0938 8.25 19.3125Z";
const SVG_OPEN_FOLDER = "M20.7188 5.8725C20.5795 5.67951 20.3964 5.5224 20.1845 5.41416C19.9726 5.30592 19.738 5.24965 19.5 5.25H18V3.75C18 3.35218 17.842 2.97064 17.5607 2.68934C17.2794 2.40804 16.8978 2.25 16.5 2.25H10.0003L7.40063 0.3C7.14054 0.106109 6.82503 0.000937519 6.50062 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V15C0 15.1989 0.0790176 15.3897 0.21967 15.5303C0.360322 15.671 0.551088 15.75 0.75 15.75H17.5406C17.698 15.75 17.8515 15.7005 17.9792 15.6085C18.1069 15.5164 18.2024 15.3865 18.2522 15.2372L20.9231 7.22437C20.9982 6.99891 21.0189 6.75886 20.9834 6.52388C20.9478 6.28891 20.8572 6.06569 20.7188 5.8725ZM6.50062 1.5L9.3 3.6C9.42982 3.69737 9.58772 3.75 9.75 3.75H16.5V5.25H4.29094C3.9761 5.24998 3.66924 5.34902 3.41382 5.53309C3.1584 5.71717 2.96738 5.97695 2.86781 6.27563L1.5 10.3781V1.5H6.50062ZM17.0006 14.25H1.79062L4.29094 6.75H19.5L17.0006 14.25Z";
const SVG_PENCIL = "M18.3103 4.62915L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 12.0007C0.299801 12.1395 0.188889 12.3047 0.113407 12.4867C0.0379245 12.6688 -0.000621974 12.864 7.58902e-06 13.061V17.2507C7.58902e-06 17.6485 0.158043 18.0301 0.439347 18.3114C0.720652 18.5927 1.10218 18.7507 1.50001 18.7507H5.6897C5.88675 18.7513 6.08197 18.7128 6.26399 18.6373C6.44602 18.5618 6.61122 18.4509 6.75001 18.311L18.3103 6.75071C18.4496 6.61142 18.5602 6.44604 18.6356 6.26403C18.711 6.08202 18.7498 5.88694 18.7498 5.68993C18.7498 5.49292 18.711 5.29784 18.6356 5.11582C18.5602 4.93381 18.4496 4.76844 18.3103 4.62915ZM5.6897 17.2507H1.50001V13.061L9.75001 4.81102L13.9397 9.00071L5.6897 17.2507ZM15 7.93946L10.8103 3.75071L13.0603 1.50071L17.25 5.68946L15 7.93946Z";
const SVG_CHEVRON_DOWN = "M16.281 1.28104L8.78104 8.78104C8.71139 8.85077 8.62867 8.90609 8.53762 8.94384C8.44657 8.98158 8.34898 9.00101 8.25042 9.00101C8.15186 9.00101 8.05426 8.98158 7.96321 8.94384C7.87216 8.90609 7.78945 8.85077 7.71979 8.78104L0.219792 1.28104C0.0790615 1.14031 0 0.94944 0 0.750417C0 0.551394 0.0790615 0.360522 0.219792 0.219792C0.360523 0.0790612 0.551394 0 0.750417 0C0.94944 0 1.14031 0.0790612 1.28104 0.219792L8.25042 7.1901L15.2198 0.219792C15.2895 0.150109 15.3722 0.0948337 15.4632 0.0571218C15.5543 0.0194098 15.6519 0 15.7504 0C15.849 0 15.9465 0.0194098 16.0376 0.0571218C16.1286 0.0948337 16.2114 0.150109 16.281 0.219792C16.3507 0.289474 16.406 0.3722 16.4437 0.463245C16.4814 0.554289 16.5008 0.651871 16.5008 0.750417C16.5008 0.848963 16.4814 0.946545 16.4437 1.03759C16.406 1.12863 16.3507 1.21136 16.281 1.28104Z";

function MenuButton({ onClick, children, className = '' }: { onClick?: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-[8px] px-[8px] py-[8px] rounded-[6px] text-left transition-colors hover:bg-[#f7f8f5] active:bg-[#288760] active:text-white group ${className}`}
    >
      {children}
    </button>
  );
}

export default function ProjectMenu({ currentProject, currentProjectDescription, onNewProject, onOpenProject }: ProjectMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCurrentProject, setHasCurrentProject] = useState(false);

  const handleOpenProject = (project: Project) => {
    setHasCurrentProject(true);
    onOpenProject(project);
    setIsOpen(false);
  };

  const handleSaveNew = () => {
    onNewProject();
    setHasCurrentProject(true);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <div
        className="flex gap-[4px] h-[40px] items-center px-[12px] relative shrink-0 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-[6px] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#e8f1ea] text-[14px] tracking-[-0.07px] whitespace-nowrap">
          {currentProject}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="overflow-clip relative shrink-0 size-[24px] flex items-center justify-center"
        >
          <svg width="16" height="9" viewBox="0 0 16.5008 9.00101" fill="none">
            <path d={SVG_CHEVRON_DOWN} fill="#e8f1ea" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            style={{ transformOrigin: 'top right' }}
            className="absolute top-[48px] right-0 bg-white rounded-[8px] shadow-[0px_4px_20px_0px_rgba(4,16,11,0.15)] z-[9999] w-[280px] border border-[rgba(0,0,0,0.14)]"
          >
            <div className="flex flex-col gap-[16px] p-[16px]">

              {/* Current Project section (Open Project state) */}
              {hasCurrentProject && (
                <>
                  <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium text-[11px] text-[#141c11] tracking-[0.88px] uppercase">
                    CURRENT PROJECT
                  </p>
                  <div className="flex gap-[8px] items-start px-[8px] py-[8px]">
                    <div className="overflow-clip relative shrink-0 size-[24px]">
                      <div className="absolute inset-[9.37%_9.38%_12.5%_12.5%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7498 18.7507">
                          <path d={SVG_PENCIL} fill="#141C11" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-black tracking-[-0.07px]">
                        {currentProject}
                      </p>
                      {currentProjectDescription && (
                        <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#6a7c68] leading-[1.5]">
                          {currentProjectDescription}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0.14)] h-px w-full" />
                </>
              )}

              {/* Save New Project */}
              {!hasCurrentProject && (
                <>
                  <MenuButton onClick={handleSaveNew}>
                    <div className="overflow-clip relative shrink-0 size-[24px]">
                      <div className="absolute inset-[15.62%_9.38%_15.63%_9.38%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 16.5">
                          <path d={SVG_FOLDER_PLUS} fill="currentColor" className="group-active:fill-white" />
                        </svg>
                      </div>
                    </div>
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] tracking-[-0.07px]">
                      Save New Project ...
                    </span>
                  </MenuButton>
                  <div className="bg-[rgba(0,0,0,0.14)] h-px w-full" />
                </>
              )}

              {/* Recent Projects */}
              <div className="flex flex-col gap-[16px]">
                <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium text-[11px] text-[#141c11] tracking-[0.88px] uppercase">
                  RECENT PROJECTS
                </p>
                <div className="flex flex-col gap-[8px]">
                  {recentProjects.map((project) => (
                    <MenuButton key={project.id} onClick={() => handleOpenProject(project)}>
                      <div className="overflow-clip relative shrink-0 size-[24px]">
                        <div className="absolute inset-[6.25%_15.63%]">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 20.9998">
                            <path d={SVG_MAP_PIN} fill="currentColor" className="group-active:fill-white" />
                          </svg>
                        </div>
                      </div>
                      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] tracking-[-0.07px]">
                        {project.name}
                      </span>
                    </MenuButton>
                  ))}
                </div>
              </div>

              <div className="bg-[rgba(0,0,0,0.14)] h-px w-full" />

              {/* Open All Projects */}
              <MenuButton onClick={() => setIsOpen(false)}>
                <div className="overflow-clip relative shrink-0 size-[24px]">
                  <div className="absolute inset-[18.75%_3.12%_15.63%_9.38%]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0003 15.75">
                      <path d={SVG_OPEN_FOLDER} fill="currentColor" className="group-active:fill-white" />
                    </svg>
                  </div>
                </div>
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] tracking-[-0.07px]">
                  Open All Projects
                </span>
              </MenuButton>

            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </div>
  );
}
