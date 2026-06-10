import svgPaths from "./svg-w23s4kty3i";
type IconProps = {
  className?: string;
  shape?: "Search" | "User" | "Chevron Down" | "Chevron Right" | "Filter" | "Chevron Left" | "Plus" | "Minus" | "Multi" | "Square" | "Chat" | "Chevron Up" | "Garbage" | "Layers" | "Chevron Double Left" | "Folder Plus" | "Open Folder" | "Pencil" | "Map Pin";
};

function Icon({ className, shape = "Search" }: IconProps) {
  const isChat = shape === "Chat";
  const isChevronDoubleLeft = shape === "Chevron Double Left";
  const isChevronDown = shape === "Chevron Down";
  const isChevronLeft = shape === "Chevron Left";
  const isChevronRight = shape === "Chevron Right";
  const isChevronUp = shape === "Chevron Up";
  const isFilter = shape === "Filter";
  const isFolderPlus = shape === "Folder Plus";
  const isGarbage = shape === "Garbage";
  const isLayers = shape === "Layers";
  const isMapPin = shape === "Map Pin";
  const isMinus = shape === "Minus";
  const isMulti = shape === "Multi";
  const isOpenFolder = shape === "Open Folder";
  const isPencil = shape === "Pencil";
  const isPlusOrSquare = ["Plus", "Square"].includes(shape);
  const isUser = shape === "User";
  return (
    <div className={className || "overflow-clip relative size-[24px]"}>
      <div className={`absolute ${isMapPin ? "inset-[6.25%_15.63%]" : isPencil ? "inset-[9.37%_9.38%_12.5%_12.5%]" : isOpenFolder ? "inset-[18.75%_3.12%_15.63%_9.38%]" : isFolderPlus ? "inset-[15.62%_9.38%_15.63%_9.38%]" : isChevronDoubleLeft ? "inset-[15.62%_18.75%_15.62%_12.5%]" : isLayers ? "inset-[6.25%_9.33%_6.25%_9.38%]" : isGarbage ? "inset-[6.25%_12.5%_12.5%_12.5%]" : isChevronUp ? "inset-[28.12%_15.62%_34.37%_15.62%]" : isChat ? "inset-[18.75%_9.37%_6.25%_9.37%]" : isMulti ? "inset-[15.63%]" : isMinus ? "inset-[46.88%_12.5%]" : isPlusOrSquare ? "inset-[12.5%]" : isChevronLeft ? "inset-[15.62%_34.37%_15.62%_28.12%]" : isFilter ? "bottom-1/4 left-[6.25%] right-[6.25%] top-[31.25%]" : isChevronRight ? "inset-[15.62%_28.12%_15.62%_34.37%]" : isChevronDown ? "inset-[34.37%_15.62%_28.12%_15.62%]" : isUser ? "inset-[9.36%_9.34%_12.43%_9.34%]" : "inset-[9.29%_9.37%_9.37%_9.29%]"}`} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isMapPin ? "0 0 16.5 20.9998" : isPencil ? "0 0 18.7498 18.7507" : isOpenFolder ? "0 0 21.0003 15.75" : isFolderPlus ? "0 0 19.5 16.5" : isChevronDoubleLeft ? "0 0 16.501 16.5008" : isLayers ? "0 0 19.5113 20.9999" : isGarbage ? "0 0 18 19.5" : isChevronUp ? "0 0 16.501 9.00118" : isChat ? "0 0 19.5 18" : isMulti ? "0 0 16.5 16.5" : isMinus ? "0 0 18 1.5" : isPlusOrSquare ? "0 0 18 18" : isFilter ? "0 0 21 10.5" : ["Chevron Right", "Chevron Left"].includes(shape) ? "0 0 9.00101 16.5008" : isChevronDown ? "0 0 16.5008 9.00101" : isUser ? "0 0 19.5188 18.7697" : "0 0 19.5211 19.5211"}>
          <path d={isMapPin ? svgPaths.p34ccd800 : isPencil ? svgPaths.pf94ac80 : isOpenFolder ? svgPaths.pe876d00 : isFolderPlus ? svgPaths.p1c282780 : isChevronDoubleLeft ? svgPaths.p2d382a00 : isLayers ? svgPaths.p16a42000 : isGarbage ? svgPaths.pae43970 : isChevronUp ? svgPaths.p3d97f870 : isChat ? svgPaths.p33d1bc00 : shape === "Square" ? svgPaths.p39610df2 : isMulti ? svgPaths.p20932380 : isMinus ? svgPaths.p185fdf40 : shape === "Plus" ? svgPaths.pc4f6100 : isChevronLeft ? svgPaths.p3289c580 : isFilter ? svgPaths.p19d28f40 : isChevronRight ? svgPaths.pebee80 : isChevronDown ? svgPaths.p13567b00 : isUser ? svgPaths.p15420900 : svgPaths.p26a8cbc0} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}
type MenuItemProps = {
  className?: string;
  itemType?: "Action" | "Project" | "Current Project";
};

function MenuItem({ className, itemType = "Action" }: MenuItemProps) {
  const isAction = itemType === "Action";
  const isCurrentProject = itemType === "Current Project";
  const isProject = itemType === "Project";
  return (
    <div className={className || `content-stretch flex relative ${isCurrentProject ? "gap-[10px] items-start w-[252px]" : isProject ? "gap-[8px] items-start w-[232px]" : "gap-[8px] items-center w-[232px]"}`}>
      {["Project", "Current Project"].includes(itemType) && <Icon className="overflow-clip relative shrink-0 size-[24px]" shape={isCurrentProject ? "Pencil" : "Map Pin"} />}
      {isAction && (
        <>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[15.62%_9.38%_15.63%_9.38%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 16.5">
                <path d={svgPaths.p1c282780} fill="var(--fill-0, #141C11)" id="Vector" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Save New Project ...</p>
        </>
      )}
      {isProject && (
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px py-[4px] relative">
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Walker Mill Condo</p>
          </div>
        </div>
      )}
      {isCurrentProject && (
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[200px]" data-name="Menu Item">
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">John’s Ranch</p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6a7c68] text-[12px] w-[min-content]">Planning of Westphalia ranch for John Dutton</p>
        </div>
      )}
    </div>
  );
}
type ProjectsMenuProps = {
  className?: string;
  state?: "New Project" | "Open Project";
};

export default function ProjectsMenu({ className, state = "New Project" }: ProjectsMenuProps) {
  const isNewProject = state === "New Project";
  const isOpenProject = state === "Open Project";
  return (
    <div className={className || "bg-white relative rounded-[8px] w-[280px]"}>
      <div className="content-stretch flex flex-col gap-[16px] items-start justify-center overflow-clip p-[16px] relative rounded-[inherit] size-full">
        {isNewProject && (
          <>
            <MenuItem className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[232px]" />
            <div className="bg-[rgba(0,0,0,0.14)] h-px relative shrink-0 w-full" />
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[#141c11] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">RECENT PROJECTS</p>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
                <MenuItem className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[232px]" itemType="Project" />
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[232px]" data-name="Menu Item">
                  <Icon className="overflow-clip relative shrink-0 size-[24px]" shape="Map Pin" />
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px py-[4px] relative">
                    <div className="content-stretch flex items-center justify-center relative shrink-0">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Downtown Redevelopment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(0,0,0,0.14)] h-px relative shrink-0 w-full" />
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[232px]" data-name="Menu Item">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
                <div className="absolute inset-[18.75%_3.12%_15.63%_9.38%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0003 15.75">
                    <path d={svgPaths.pe876d00} fill="var(--fill-0, #141C11)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Open All Projects</p>
            </div>
          </>
        )}
        {isOpenProject && (
          <>
            <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[#141c11] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">CURRENT PROJECT</p>
            <MenuItem className="content-stretch flex gap-[10px] items-start relative shrink-0 w-[252px]" itemType="Current Project" />
            <div className="bg-[rgba(0,0,0,0.14)] h-px relative shrink-0 w-full" />
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[#141c11] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">RECENT PROJECTS</p>
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
                <MenuItem className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[232px]" itemType="Project" />
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[232px]" data-name="Menu Item">
                  <Icon className="overflow-clip relative shrink-0 size-[24px]" shape="Map Pin" />
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px py-[4px] relative">
                    <div className="content-stretch flex items-center justify-center relative shrink-0">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Downtown Redevelopment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(0,0,0,0.14)] h-px relative shrink-0 w-full" />
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[232px]" data-name="Menu Item">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
                <div className="absolute inset-[18.75%_3.12%_15.63%_9.38%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0003 15.75">
                    <path d={svgPaths.pe876d00} fill="var(--fill-0, #141C11)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">Open All Projects</p>
            </div>
          </>
        )}
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}