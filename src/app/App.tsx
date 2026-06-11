import { useState, useRef } from 'react';
import { Plus, Minus, Layers } from 'lucide-react';
import ChevronIcon from '../assets/icons/Shape=Double Chevron Back Small.svg';
import UserMenu from './components/UserMenu';
import AddressSearch from './components/AddressSearch';
import { motion } from 'motion/react';
import ActiveLayerCardWrapper from './components/ActiveLayerCardWrapper';
import SimpleActiveLayerCard from './components/SimpleActiveLayerCard';
import ParcelsViewSelector from './components/ParcelsViewSelector';
import MapView, { type MapViewHandle } from './components/MapView';
import LayerCheckbox from './components/LayerCheckbox';
import LayerCategory from './components/LayerCategory';
import ProjectModal from './components/ProjectModal';
import ProjectMenu from './components/ProjectMenu';
import WordmarkDarkUi from '../imports/WordmarkDarkUi';
import RightMenu from './components/RightMenu';
import DetailPanel from './components/DetailPanel';
import SiteInfoPanel from './components/SiteInfoPanel';
import PermitsPanel from './components/PermitsPanel';
import AnalysisPanel from './components/AnalysisPanel';

export default function App() {
  const mapRef = useRef<MapViewHandle>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [isSiteSelected, setIsSiteSelected] = useState(false);
  const [basemap, setBasemap] = useState<'street' | 'satellite'>('street');
  const [layerFilter, setLayerFilter] = useState('');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState('Untitled Project');
  const [currentProjectDescription, setCurrentProjectDescription] = useState('');

  // Prototype: clicking the map emulates selecting a parcel and opens Site Info
  const handleMapClick = () => {
    setIsSiteSelected(true);
    setSelectedMenuItem('Site Info');
    setIsRightPanelOpen(true);
    setIsDetailPanelOpen(true);
  };

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  // Layer states
  const [selectedLayers, setSelectedLayers] = useState({
    parcels: false,
    zoning: false,
    sdat: false,
    rightOfWay: false,
    census: false,
    boundaries: false,
  });

  const [selectedStyle, setSelectedStyle] = useState<'plain' | 'yearBuilt'>('plain');
  const [activeSubLayers, setActiveSubLayers] = useState<Set<string>>(new Set());

  const toggleLayer = (layer: keyof typeof selectedLayers) => {
    setSelectedLayers(prev => {
      const next = { ...prev, [layer]: !prev[layer] };
      if (layer === 'parcels' && next.parcels) setSelectedStyle('plain');
      return next;
    });
  };

  const toggleSubLayer = (label: string) => {
    setActiveSubLayers(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  const removeSubLayer = (label: string) => {
    setActiveSubLayers(prev => { const next = new Set(prev); next.delete(label); return next; });
  };

  const nonParcelsActiveLayers = (Object.entries(selectedLayers) as [keyof typeof selectedLayers, boolean][])
    .filter(([key, val]) => key !== 'parcels' && val);

  const hasAnyActive = selectedLayers.parcels || nonParcelsActiveLayers.length > 0 || activeSubLayers.size > 0;

  const allLayers = [
    { key: 'parcels', label: 'Parcels' },
    { key: 'zoning', label: 'Zoning' },
    { key: 'sdat', label: 'SDAT Assessments' },
    { key: 'rightOfWay', label: 'Right-of-Way' },
    { key: 'census', label: 'Census Tracts' },
    { key: 'boundaries', label: 'County Boundaries' },
  ] as const;

  const allCategories = [
    {
      label: 'Environmental',
      items: [
        'Chesapeake Bay Critical Area',
        'FEMA Floodplains',
        'Marlboro Clay',
        'Natural Resource Inventory',
        'Soils (SSURGO)',
        'Streams & Hydrography',
        'Wetlands',
        'Wetlands of Special Concern',
      ],
    },
    {
      label: 'WSSC',
      items: [
        'Gravity Sewer Pipes',
        'Sewer Lateral Pipes',
        'Pressure Sewer Pipes',
        'Water Lateral Pipes',
        'Water Pipes',
      ],
    },
    {
      label: 'Power (OSM)',
      items: [
        'Power Generators',
        'Power Lines',
        'Power Plants',
        'Power Substations',
        'Power Towers',
        'Power Transformers',
      ],
    },
  ];

  const q = layerFilter.toLowerCase();
  const isFiltering = q.length > 0;

  const filteredLayers = allLayers.filter(layer =>
    layer.label.toLowerCase().includes(q)
  );

  const filteredCategories = allCategories
    .map(cat => {
      const filteredItems = cat.items.filter(item => item.toLowerCase().includes(q));
      return { ...cat, filteredItems, visible: filteredItems.length > 0 };
    })
    .filter(cat => cat.visible);

  const flatFilteredItems = allCategories.flatMap(cat =>
    cat.items.filter(item => item.toLowerCase().includes(q))
  );

  const handleSaveProject = (name: string, description: string) => {
    setCurrentProject(name);
    setCurrentProjectDescription(description);
  };

  const handleOpenProject = (project: { name: string }) => {
    setCurrentProject(project.name);
  };

  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      {/* App Header */}
      <div className="bg-[#04100b] content-stretch flex h-[64px] items-center justify-between px-[16px] py-[16px] relative shrink-0 w-full z-[60]">
        <WordmarkDarkUi />

        <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
          <ProjectMenu
            currentProject={currentProject}
            currentProjectDescription={currentProjectDescription}
            onNewProject={() => setIsProjectModalOpen(true)}
            onOpenProject={handleOpenProject}
          />
          <UserMenu />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-[1_0_0] h-full min-h-px relative w-full overflow-hidden">
        {/* Map — always full size, panel slides over it */}
        {/* Layers Panel */}
        <motion.div
          animate={{ x: isPanelOpen ? 0 : -356 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute left-0 top-0 h-full w-[356px] bg-[#f7f8f5] z-20"
        >
          <div className="w-[356px] h-full overflow-y-auto">
                <div className="content-stretch flex flex-col gap-[24px] items-start px-[16px] pt-[24px] pb-[24px]">
                  {/* Active Layers */}
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">
                      ACTIVE
                    </p>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      {!hasAnyActive && (
                        <ActiveLayerCardWrapper format="No layers" />
                      )}
                      {selectedLayers.parcels && (
                        <SimpleActiveLayerCard
                          label="Parcels"
                          onRemove={() => setSelectedLayers(prev => ({ ...prev, parcels: false }))}
                        />
                      )}
                      {nonParcelsActiveLayers.map(([key]) => (
                        <SimpleActiveLayerCard
                          key={key}
                          label={allLayers.find(l => l.key === key)?.label ?? key}
                          onRemove={() => setSelectedLayers(prev => ({ ...prev, [key]: false }))}
                        />
                      ))}
                      {[...activeSubLayers].map(label => (
                        <SimpleActiveLayerCard key={label} label={label} onRemove={() => removeSubLayer(label)} />
                      ))}
                    </div>
                  </div>

                  {/* Search Layers */}
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">
                      SEARCH LAYERS
                    </p>
                    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full">
                      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                        <div className="content-stretch flex items-center justify-between px-[16px] py-[8px] relative size-full">
                          <input
                            type="text"
                            placeholder="Enter layer name to filter"
                            value={layerFilter}
                            onChange={(e) => setLayerFilter(e.target.value)}
                            className="flex-1 bg-transparent font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-black placeholder:text-[#97a191] outline-none"
                          />
                          <div className="overflow-clip relative shrink-0 size-[24px]">
                            <div className="absolute bottom-1/4 left-[6.25%] right-[6.25%] top-[31.25%]">
                              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 10.5">
                                <path d="M17.25 5.25C17.25 5.44891 17.171 5.63968 17.0303 5.78033C16.8897 5.92098 16.6989 6 16.5 6H4.5C4.30109 6 4.11032 5.92098 3.96967 5.78033C3.82902 5.63968 3.75 5.44891 3.75 5.25C3.75 5.05109 3.82902 4.86032 3.96967 4.71967C4.11032 4.57902 4.30109 4.5 4.5 4.5H16.5C16.6989 4.5 16.8897 4.57902 17.0303 4.71967C17.171 4.86032 17.25 5.05109 17.25 5.25ZM20.25 0H0.75C0.551088 0 0.360322 0.0790178 0.21967 0.21967C0.0790176 0.360322 0 0.551088 0 0.75C0 0.948912 0.0790176 1.13968 0.21967 1.28033C0.360322 1.42098 0.551088 1.5 0.75 1.5H20.25C20.4489 1.5 20.6397 1.42098 20.7803 1.28033C20.921 1.13968 21 0.948912 21 0.75C21 0.551088 20.921 0.360322 20.7803 0.21967C20.6397 0.0790178 20.4489 0 20.25 0ZM12.75 9H8.25C8.05109 9 7.86032 9.07902 7.71967 9.21967C7.57902 9.36032 7.5 9.55109 7.5 9.75C7.5 9.94891 7.57902 10.1397 7.71967 10.2803C7.86032 10.421 8.05109 10.5 8.25 10.5H12.75C12.9489 10.5 13.1397 10.421 13.2803 10.2803C13.421 10.1397 13.5 9.94891 13.5 9.75C13.5 9.55109 13.421 9.36032 13.2803 9.21967C13.1397 9.07902 12.9489 9 12.75 9Z" fill="#6A7C68" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
                    </div>
                  </div>

                  {/* Common Layers */}
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">
                      COMMON
                    </p>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      {filteredLayers.map((layer) => (
                        <LayerCheckbox
                          key={layer.key}
                          label={layer.label}
                          checked={selectedLayers[layer.key]}
                          onChange={() => toggleLayer(layer.key)}
                        >
                          {layer.key === 'parcels' && (
                            <ParcelsViewSelector
                              selectedStyle={selectedStyle}
                              onStyleChange={setSelectedStyle}
                            />
                          )}
                        </LayerCheckbox>
                      ))}
                      {isFiltering
                        ? flatFilteredItems.map(item => (
                            <LayerCheckbox key={item} label={item} checked={activeSubLayers.has(item)} onChange={() => toggleSubLayer(item)} />
                          ))
                        : <>
                            <LayerCategory label="Environmental" count={8}>
                              {allCategories[0].items.map(item => (
                                <LayerCheckbox key={item} label={item} checked={activeSubLayers.has(item)} onChange={() => toggleSubLayer(item)} />
                              ))}
                            </LayerCategory>
                            <LayerCategory label="WSSC" count={5}>
                              {allCategories[1].items.map(item => (
                                <LayerCheckbox key={item} label={item} checked={activeSubLayers.has(item)} onChange={() => toggleSubLayer(item)} />
                              ))}
                            </LayerCategory>
                            <LayerCategory label="Power (OSM)" count={6}>
                              {allCategories[2].items.map(item => (
                                <LayerCheckbox key={item} label={item} checked={activeSubLayers.has(item)} onChange={() => toggleSubLayer(item)} />
                              ))}
                            </LayerCategory>
                          </>
                      }
                    </div>
                  </div>

                  {/* County */}
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black tracking-[0.88px] uppercase whitespace-nowrap">
                      County
                    </p>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <LayerCategory label="Prince George's" count={1007} />
                      <LayerCategory label="Montgomery" count={479} />
                    </div>
                  </div>
                </div>
          </div>
        </motion.div>

        {/* Panel Visibility Toggle Button — tracks panel right edge - 6px; z-10 keeps it behind the panel so the panel clips its left rounded corner */}
        <motion.button
          onClick={() => setIsPanelOpen(prev => !prev)}
          animate={{ left: isPanelOpen ? 340 : -6 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute z-30 w-[32px] h-[48px] rounded-[8px] overflow-hidden bg-[#f7f8f5] flex items-center justify-center hover:bg-[#eceee9] transition-colors cursor-pointer"
          style={{ top: 'calc(50% - 24px)' }}
          aria-label={isPanelOpen ? 'Collapse panel' : 'Expand panel'}
        >
          <img
            src={ChevronIcon}
            alt=""
            className="w-[13px] h-[13px]"
            style={{
              transform: isPanelOpen ? 'scaleX(-1)' : 'scaleX(1)',
            }}
          />
        </motion.button>

        {/* Map — full size, always rendered */}
        <div className="absolute inset-0 z-0">
          <MapView ref={mapRef} basemap={basemap} parcelsActive={selectedLayers.parcels} parcelsStyle={selectedStyle} onMapClick={handleMapClick} />
        </div>

        {/* Map UI Overlays — positioned in the visible map area; left edge tracks the
            layers panel, right edge tracks the right menu + detail panel */}
        <motion.div
          initial={false}
          className="absolute top-0 bottom-0 pointer-events-none z-10"
          animate={{
            left: isPanelOpen ? 356 : 0,
            right: isDetailPanelOpen ? 593 : (isRightPanelOpen ? 160 : 0),
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col items-start justify-between w-full h-full">
              {/* Top Controls */}
              <div className="flex items-start w-full pointer-events-auto p-[16px] pt-[24px]">
                <AddressSearch onSelect={(lat, lon) => mapRef.current?.flyTo(lat, lon)} />
              </div>

              {/* Bottom Controls */}
              <div className="flex items-end justify-between w-full pointer-events-auto p-[16px] pb-[24px]">
                <div className="content-stretch flex gap-[10px] h-[40px] items-center relative shrink-0">
                  {/* Layers Toggle */}
                  <div
                    className={`relative rounded-[8px] shrink-0 size-[40px] cursor-pointer transition-colors ${isPanelOpen ? 'bg-[#5ca87c] hover:bg-[#4d9169]' : 'bg-white hover:bg-[#f7f8f5]'}`}
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                  >
                    <div className="overflow-clip relative rounded-[inherit] size-full flex items-center justify-center">
                      <Layers size={24} color={isPanelOpen ? 'white' : 'black'} />
                    </div>
                    <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
                  </div>

                  {/* Basemap Selector */}
                  <div className="bg-white h-full relative rounded-[8px] shrink-0">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex gap-[8px] items-center px-[4px] py-[2px] relative size-full">
                        <div
                          className="content-stretch flex gap-[8px] items-center p-[8px] relative shrink-0 cursor-pointer"
                          onClick={() => setBasemap('street')}
                        >
                          <div className="relative shrink-0 size-[16px]">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <circle cx="7.5" cy="8" r="7" stroke="black" fill="none" />
                              {basemap === 'street' && <circle cx="7.5" cy="8" r="3.5" fill="black" />}
                            </svg>
                          </div>
                          <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
                            Street
                          </p>
                        </div>
                        <div
                          className="content-stretch flex gap-[8px] items-center p-[8px] relative shrink-0 cursor-pointer"
                          onClick={() => setBasemap('satellite')}
                        >
                          <div className="relative shrink-0 size-[16px]">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <circle cx="7.5" cy="8" r="7" stroke="black" fill="none" />
                              {basemap === 'satellite' && <circle cx="7.5" cy="8" r="3.5" fill="black" />}
                            </svg>
                          </div>
                          <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
                            Satellite
                          </p>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
                  </div>

                </div>

                {/* Zoom Controls & Location */}
                <div className="content-stretch flex flex-col gap-[24px] items-end justify-end relative shrink-0">
                  <div className="bg-white relative rounded-[8px] shrink-0">
                    <div className="flex flex-col gap-[10px] items-center justify-center p-[8px]">
                      <div className="flex items-center justify-center size-[24px] cursor-pointer" onClick={handleZoomIn}>
                        <Plus size={20} color="black" />
                      </div>
                      <div className="bg-[rgba(0,0,0,0.14)] h-px w-full" />
                      <div className="flex items-center justify-center size-[24px] cursor-pointer" onClick={handleZoomOut}>
                        <Minus size={20} color="black" />
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
                  </div>
                  <div className="content-stretch flex gap-[24px] items-end relative shrink-0">
                    {/* Scale */}
                    <div className="bg-[#f7f8f5] content-stretch flex gap-[10px] items-end p-[4px] relative rounded-[4px] shrink-0" data-name="Zoom Control/Map Scale">
                      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[12px] text-black uppercase whitespace-pre">
                        <span className="leading-[1.5] lowercase">20 mi</span>
                        <span className="leading-[1.5]">{`   `}</span>
                      </p>
                      <div className="h-[7.551px] relative shrink-0 w-[64px]">
                        <div className="absolute inset-[0_-1.01%_-8.56%_-1.01%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65.2929 8.19697">
                            <path d="M0.646465 0V7.5505H64.6465V0" stroke="#141C11" strokeWidth="1.29293" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white content-stretch flex items-center justify-end p-[9.6px] relative rounded-[28.8px] shrink-0 cursor-pointer hover:bg-[#f7f8f5] transition-colors">
                      <div aria-hidden className="absolute border-[1.2px] border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[28.8px]" />
                      <div className="overflow-clip relative shrink-0 size-[28.8px]">
                        <div className="absolute inset-[18.75%_9.37%_6.25%_9.37%]">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4 21.6">
                            <path d="M10.35 9C10.35 8.733 10.4292 8.472 10.5775 8.25C10.7259 8.028 10.9367 7.855 11.1834 7.753C11.4301 7.651 11.7015 7.624 11.9634 7.676C12.2253 7.728 12.4658 7.857 12.6546 8.045C12.8434 8.234 12.972 8.475 13.0241 8.737C13.0762 8.999 13.0494 9.27 12.9473 9.517C12.8451 9.763 12.6721 9.974 12.45 10.123C12.228 10.271 11.967 10.35 11.7 10.35C11.342 10.35 10.9986 10.208 10.7454 9.955C10.4923 9.701 10.35 9.358 10.35 9ZM6.75 10.35C7.017 10.35 7.278 10.271 7.5 10.123C7.722 9.974 7.895 9.763 7.997 9.517C8.099 9.27 8.126 8.999 8.074 8.737C8.022 8.475 7.893 8.234 7.705 8.045C7.516 7.857 7.275 7.728 7.013 7.676C6.752 7.624 6.48 7.651 6.233 7.753C5.987 7.855 5.776 8.028 5.628 8.25C5.479 8.472 5.4 8.733 5.4 9C5.4 9.358 5.542 9.701 5.795 9.955C6.049 10.208 6.392 10.35 6.75 10.35ZM16.65 10.35C16.917 10.35 17.178 10.271 17.4 10.123C17.622 9.974 17.795 9.763 17.897 9.517C17.999 9.27 18.026 8.999 17.974 8.737C17.922 8.475 17.793 8.234 17.605 8.045C17.416 7.857 17.175 7.728 16.913 7.676C16.652 7.624 16.38 7.651 16.133 7.753C15.887 7.855 15.676 8.028 15.528 8.25C15.379 8.472 15.3 8.733 15.3 9C15.3 9.358 15.442 9.701 15.695 9.955C15.949 10.208 16.292 10.35 16.65 10.35ZM23.4 1.8V16.2C23.4 16.677 23.21 17.135 22.873 17.473C22.535 17.81 22.077 18 21.6 18H6.638L2.97 21.168C2.636 21.451 2.225 21.601 1.8 21.6C1.536 21.599 1.275 21.541 1.035 21.429C0.724 21.285 0.462 21.056 0.278 20.767C0.095 20.478 0 20.142 0 19.8V1.8C0 1.323 0.19 0.865 0.527 0.527C0.865 0.19 1.323 0 1.8 0H21.6C22.077 0 22.535 0.19 22.873 0.527C23.21 0.865 23.4 1.323 23.4 1.8ZM21.6 1.8H1.8V19.8L5.712 16.425C5.874 16.282 6.083 16.202 6.3 16.2H21.6V1.8Z" fill="#288760" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </motion.div>

        {/* Detail Panel - always mounted so it never flashes during the menu animation; only slides in when a menu button is clicked.
            Renders the Site Info panel once a parcel is selected, otherwise the empty state. */}
        <motion.div
          initial={false}
          animate={{ x: isDetailPanelOpen ? 0 : (isRightPanelOpen ? 433 : 593) }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute right-[160px] top-0 h-full w-[433px] bg-[#f7f8f5] border-l border-[rgba(0,0,0,0.09)] z-20 pointer-events-auto"
        >
          {isSiteSelected && selectedMenuItem === 'Site Info'
            ? <SiteInfoPanel />
            : isSiteSelected && selectedMenuItem === 'Permits'
            ? <PermitsPanel />
            : isSiteSelected && selectedMenuItem === 'Analysis'
            ? <AnalysisPanel />
            : <DetailPanel selectedMenuItem={selectedMenuItem} />}
        </motion.div>

        {/* Right Menu Panel */}
        <motion.div
          animate={{ x: isRightPanelOpen ? 0 : 160 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className={`absolute right-0 top-0 h-full w-[160px] bg-[#f7f8f5] z-50 pointer-events-auto ${isRightPanelOpen && isDetailPanelOpen ? 'border-l border-[rgba(0,0,0,0.09)]' : ''}`}
        >
          <RightMenu activeItem={selectedMenuItem} onMenuItemClick={(label) => {
            setSelectedMenuItem(label);
            setIsDetailPanelOpen(true);
          }} />
        </motion.div>

        {/* Single Toggle Button - moves to the edge of the current rightmost panel */}
        <motion.button
          onClick={() => {
            if (isDetailPanelOpen) {
              setIsDetailPanelOpen(false);
            } else {
              setIsRightPanelOpen(prev => !prev);
            }
          }}
          animate={{
            right: isDetailPanelOpen ? 577 : (isRightPanelOpen ? 144 : -6)
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute z-50 w-[32px] h-[48px] rounded-[8px] overflow-hidden bg-[#f7f8f5] flex items-center justify-center hover:bg-[#eceee9] transition-colors cursor-pointer"
          style={{ top: 'calc(50% - 24px)' }}
          aria-label="Toggle panel"
        >
          <img
            src={ChevronIcon}
            alt=""
            className="w-[13px] h-[13px]"
            style={{
              transform: isDetailPanelOpen ? 'scaleX(-1)' : (isRightPanelOpen ? 'scaleX(-1)' : 'scaleX(1)'),
            }}
          />
        </motion.button>

      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
}
