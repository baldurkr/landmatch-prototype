import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import avatarImg from '../../imports/AppHeader/96403bc07e34042bdc465ff85a494eee2d037121.png';

const SVG_USER = "M19.4082 17.6276C17.9803 15.1591 15.78 13.3891 13.2122 12.5501C14.4824 11.7939 15.4692 10.6417 16.0212 9.27048C16.5731 7.89922 16.6597 6.38468 16.2676 4.95945C15.8755 3.53422 15.0264 2.27711 13.8506 1.38117C12.6749 0.485228 11.2376 0 9.75941 0C8.28122 0 6.84391 0.485228 5.66818 1.38117C4.49246 2.27711 3.64334 3.53422 3.25123 4.95945C2.85911 6.38468 2.94569 7.89922 3.49765 9.27048C4.04961 10.6417 5.03644 11.7939 6.3066 12.5501C3.73878 13.3882 1.53847 15.1582 0.110659 17.6276C0.0582987 17.7129 0.0235684 17.8079 0.00851736 17.9069C-0.00653367 18.006 -0.00160057 18.107 0.0230256 18.2041C0.0476518 18.3011 0.0914723 18.3923 0.151901 18.4722C0.212331 18.552 0.288144 18.619 0.37487 18.6691C0.461595 18.7192 0.557476 18.7514 0.656854 18.7638C0.756232 18.7763 0.857095 18.7687 0.953492 18.7415C1.04989 18.7143 1.13987 18.6681 1.21812 18.6056C1.29637 18.5431 1.3613 18.4656 1.4091 18.3776C3.17535 15.3251 6.29722 13.5026 9.75941 13.5026C13.2216 13.5026 16.3435 15.3251 18.1097 18.3776C18.1575 18.4656 18.2225 18.5431 18.3007 18.6056C18.379 18.6681 18.4689 18.7143 18.5653 18.7415C18.6617 18.7687 18.7626 18.7763 18.862 18.7638C18.9613 18.7514 19.0572 18.7192 19.1439 18.6691C19.2307 18.619 19.3065 18.552 19.3669 18.4722C19.4273 18.3923 19.4712 18.3011 19.4958 18.2041C19.5204 18.107 19.5254 18.006 19.5103 17.9069C19.4952 17.8079 19.4605 17.7129 19.4082 17.6276ZM4.50941 6.75255C4.50941 5.7142 4.81732 4.69917 5.39419 3.83581C5.97107 2.97245 6.79101 2.29954 7.75032 1.90218C8.70963 1.50482 9.76523 1.40086 10.7836 1.60343C11.802 1.806 12.7375 2.30601 13.4717 3.04024C14.2059 3.77447 14.706 4.70993 14.9085 5.72833C15.1111 6.74673 15.0071 7.80233 14.6098 8.76164C14.2124 9.72095 13.5395 10.5409 12.6762 11.1178C11.8128 11.6946 10.7978 12.0026 9.75941 12.0026C8.36748 12.0011 7.03299 11.4475 6.04874 10.4632C5.0645 9.47897 4.5109 8.14448 4.50941 6.75255Z";
const SVG_STAR = "M20.9225 7.618C20.8287 7.32974 20.6517 7.07568 20.4138 6.88783C20.1759 6.69998 19.8877 6.58673 19.5856 6.56237L14.0543 6.11612L11.9187 0.951432C11.8032 0.670011 11.6066 0.42929 11.354 0.259874C11.1013 0.0904583 10.804 0 10.4998 0C10.1956 0 9.89827 0.0904583 9.64562 0.259874C9.39296 0.42929 9.19639 0.670011 9.08089 0.951432L6.94714 6.11518L1.41308 6.56237C1.11043 6.58797 0.822071 6.70231 0.584119 6.89106C0.346168 7.07982 0.16921 7.3346 0.0754186 7.62348C-0.0183732 7.91237 -0.0248287 8.22251 0.056861 8.51504C0.138551 8.80758 0.304752 9.0695 0.534643 9.268L4.75339 12.9083L3.46808 18.3514C3.3962 18.6471 3.4138 18.9575 3.51865 19.2432C3.6235 19.5289 3.81087 19.777 4.05698 19.956C4.30309 20.135 4.59684 20.2369 4.90093 20.2486C5.20503 20.2604 5.50576 20.1815 5.76496 20.0221L10.4993 17.1083L15.2365 20.0221C15.4958 20.1796 15.7959 20.257 16.0991 20.2444C16.4022 20.2317 16.6949 20.1297 16.9401 19.951C17.1854 19.7724 17.3724 19.5252 17.4774 19.2406C17.5825 18.9559 17.601 18.6466 17.5306 18.3514L16.2406 12.9074L20.4593 9.26706C20.6911 9.06889 20.8588 8.8064 20.9413 8.51284C21.0237 8.21927 21.0172 7.90784 20.9225 7.618Z";
const SVG_MAP = "M19.2112 1.65854C19.1214 1.58854 19.0168 1.53992 18.9054 1.51636C18.7939 1.49281 18.6786 1.49494 18.5681 1.5226L12.8372 2.9551L7.08563 0.0788546C6.92537 -0.00107695 6.74181 -0.0210294 6.56812 0.0226047L0.568125 1.5226C0.40587 1.56316 0.261827 1.65679 0.158889 1.7886C0.0559514 1.92042 2.53226e-05 2.08286 0 2.2501V15.7501C1.72544e-05 15.8641 0.0260054 15.9765 0.0759907 16.0789C0.125976 16.1814 0.198644 16.271 0.288475 16.3412C0.378306 16.4113 0.482937 16.46 0.594422 16.4837C0.705907 16.5073 0.821313 16.5052 0.931875 16.4776L6.66281 15.0451L12.4144 17.9214C12.5188 17.9728 12.6336 17.9998 12.75 18.0001C12.8113 18.0001 12.8724 17.9925 12.9319 17.9776L18.9319 16.4776C19.0941 16.437 19.2382 16.3434 19.3411 16.2116C19.444 16.0798 19.5 15.9174 19.5 15.7501V2.2501C19.5 2.13603 19.474 2.02346 19.424 1.92095C19.374 1.81844 19.3012 1.7287 19.2112 1.65854ZM7.5 1.96323L12 4.21323V16.037L7.5 13.787V1.96323ZM1.5 2.83604L6 1.71104V13.6642L1.5 14.7892V2.83604ZM18 15.1642L13.5 16.2892V4.33604L18 3.21104V15.1642Z";
const SVG_TOUR = "M20.8125 7.74844L17.6559 4.24688C17.5153 4.09056 17.3434 3.96555 17.1514 3.87995C16.9594 3.79435 16.7515 3.75008 16.5413 3.75H10.5V0.75C10.5 0.551088 10.421 0.360322 10.2803 0.21967C10.1397 0.0790176 9.94891 0 9.75 0C9.55109 0 9.36032 0.0790176 9.21967 0.21967C9.07902 0.360322 9 0.551088 9 0.75V3.75H1.5C1.10218 3.75 0.720644 3.90804 0.43934 4.18934C0.158035 4.47064 0 4.85218 0 5.25V11.25C0 11.6478 0.158035 12.0294 0.43934 12.3107C0.720644 12.592 1.10218 12.75 1.5 12.75H9V18.75C9 18.9489 9.07902 19.1397 9.21967 19.2803C9.36032 19.421 9.55109 19.5 9.75 19.5C9.94891 19.5 10.1397 19.421 10.2803 19.2803C10.421 19.1397 10.5 18.9489 10.5 18.75V12.75H16.5413C16.7515 12.7499 16.9594 12.7056 17.1514 12.6201C17.3434 12.5345 17.5153 12.4094 17.6559 12.2531L20.8125 8.75156C20.9364 8.61386 21.0049 8.43521 21.0049 8.25C21.0049 8.06479 20.9364 7.88614 20.8125 7.74844ZM16.5413 11.25H1.5V5.25H16.5413L19.2413 8.25L16.5413 11.25Z";
const SVG_LOGOUT = "M7.5 17.25C7.5 17.4489 7.42098 17.6397 7.28033 17.7803C7.13968 17.921 6.94891 18 6.75 18H0.75C0.551088 18 0.360322 17.921 0.21967 17.7803C0.0790178 17.6397 0 17.4489 0 17.25V0.75C0 0.551088 0.0790178 0.360322 0.21967 0.21967C0.360322 0.0790178 0.551088 0 0.75 0H6.75C6.94891 0 7.13968 0.0790178 7.28033 0.21967C7.42098 0.360322 7.5 0.551088 7.5 0.75C7.5 0.948912 7.42098 1.13968 7.28033 1.28033C7.13968 1.42098 6.94891 1.5 6.75 1.5H1.5V16.5H6.75C6.94891 16.5 7.13968 16.579 7.28033 16.7197C7.42098 16.8603 7.5 17.0511 7.5 17.25ZM17.7806 8.46937L14.0306 4.71937C13.8899 4.57864 13.699 4.49958 13.5 4.49958C13.301 4.49958 13.1101 4.57864 12.9694 4.71937C12.8286 4.86011 12.7496 5.05098 12.7496 5.25C12.7496 5.44902 12.8286 5.63989 12.9694 5.78063L15.4397 8.25H6.75C6.55109 8.25 6.36032 8.32902 6.21967 8.46967C6.07902 8.61032 6 8.80109 6 9C6 9.19891 6.07902 9.38968 6.21967 9.53033C6.36032 9.67098 6.55109 9.75 6.75 9.75H15.4397L12.9694 12.2194C12.8286 12.3601 12.7496 12.551 12.7496 12.75C12.7496 12.949 12.8286 13.1399 12.9694 13.2806C13.1101 13.4214 13.301 13.5004 13.5 13.5004C13.699 13.5004 13.8899 13.4214 14.0306 13.2806L17.7806 9.53063C17.8504 9.46097 17.9057 9.37825 17.9434 9.28721C17.9812 9.19616 18.0006 9.09856 18.0006 9C18.0006 8.90144 17.9812 8.80384 17.9434 8.71279C17.9057 8.62175 17.8504 8.53903 17.7806 8.46937Z";

function MenuRow({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex gap-[8px] items-center p-[4px] rounded-[8px] text-left transition-colors hover:bg-[#f7f8f5] active:bg-[#288760] active:text-white group"
    >
      <div className="overflow-clip relative shrink-0 size-[24px]">{icon}</div>
      <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black tracking-[-0.07px] group-active:text-white">
        {label}
      </span>
    </button>
  );
}

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative size-[32px] rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-[rgba(255,255,255,0.3)] transition-all"
      >
        <img src={avatarImg} alt="User avatar" className="absolute inset-0 size-full object-cover" />
      </button>

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
              className="absolute top-[44px] right-0 bg-white rounded-[8px] shadow-[0px_4px_20px_0px_rgba(4,16,11,0.15)] z-[9999] w-[280px] border border-[rgba(0,0,0,0.14)]"
            >
              <div className="flex flex-col gap-[16px] p-[16px]">

                {/* User info */}
                <div className="flex gap-[8px] items-start">
                  <div className="relative shrink-0 size-[36px] rounded-full overflow-hidden">
                    <img src={avatarImg} alt="" className="absolute inset-0 size-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black tracking-[-0.07px]">
                      Baldur Kristjánsson
                    </p>
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#6a7c68] leading-[1.5]">
                      baldurkr@gmail.com
                    </p>
                  </div>
                </div>

                <div className="bg-[rgba(0,0,0,0.14)] h-px w-full" />

                {/* Account actions */}
                <div className="flex flex-col gap-[8px]">
                  <MenuRow
                    label="Profile"
                    icon={
                      <div className="absolute inset-[9.36%_9.34%_12.43%_9.34%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5188 18.7697">
                          <path d={SVG_USER} fill="#141C11" className="group-active:fill-white" />
                        </svg>
                      </div>
                    }
                    onClick={() => setIsOpen(false)}
                  />
                  <MenuRow
                    label="Upgrade to Premium"
                    icon={
                      <div className="absolute inset-[6.25%_6.25%_9.38%_6.25%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9986 20.2498">
                          <path d={SVG_STAR} fill="#141C11" className="group-active:fill-white" />
                        </svg>
                      </div>
                    }
                    onClick={() => setIsOpen(false)}
                  />
                </div>

                <div className="bg-[rgba(0,0,0,0.14)] h-px w-full" />

                {/* App actions */}
                <div className="flex flex-col gap-[8px]">
                  <MenuRow
                    label="Map Disclaimer"
                    icon={
                      <div className="absolute inset-[12.5%_9.38%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 18.0001">
                          <path d={SVG_MAP} fill="#141C11" className="group-active:fill-white" />
                        </svg>
                      </div>
                    }
                    onClick={() => setIsOpen(false)}
                  />
                  <MenuRow
                    label="Product Tour"
                    icon={
                      <div className="absolute inset-[9.38%_3.1%_9.38%_9.38%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0049 19.5">
                          <path d={SVG_TOUR} fill="#141C11" className="group-active:fill-white" />
                        </svg>
                      </div>
                    }
                    onClick={() => setIsOpen(false)}
                  />
                  <MenuRow
                    label="Logout"
                    icon={
                      <div className="absolute inset-[12.5%_9.37%_12.5%_15.63%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0006 18">
                          <path d={SVG_LOGOUT} fill="#141C11" className="group-active:fill-white" />
                        </svg>
                      </div>
                    }
                    onClick={() => setIsOpen(false)}
                  />
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
