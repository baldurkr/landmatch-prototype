import { useState, useRef } from 'react';
import { Plus, Minus, Layers } from 'lucide-react';
import ChevronIcon from '../assets/icons/Shape=Double Chevron Back Small.svg';
import UserMenu from './components/UserMenu';
import AddressSearch from './components/AddressSearch';
import { motion, AnimatePresence } from 'motion/react';
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
import CitationsPanel from './components/CitationsPanel';
import ExportPanel from './components/ExportPanel';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  const mapRef = useRef<MapViewHandle>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
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
                  {/* Panel Heading */}
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.28] relative shrink-0 text-[22px] text-black tracking-[-0.44px] whitespace-nowrap">
                    Map Layers
                  </p>
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
            right: isDetailPanelOpen ? 593 : 160,
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
                          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
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
                          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.2] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.07px] whitespace-nowrap">
                            Satellite
                          </p>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />
                  </div>

                </div>

                {/* AI Assistant, Zoom Controls & Scale */}
                <div className="content-stretch flex flex-col gap-[24px] items-end justify-end relative shrink-0">
                  <ChatAssistant parcelSelected={isSiteSelected} />
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
                  {/* Scale */}
                  <div className="bg-[#f7f8f5] content-stretch flex gap-[10px] items-end p-[4px] relative rounded-[4px] shrink-0" data-name="Zoom Control/Map Scale">
                    <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-black uppercase whitespace-pre">
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
                </div>
              </div>
          </div>
        </motion.div>

        {/* Detail Panel - always mounted so it never flashes during the menu animation; only slides in when a menu button is clicked.
            Renders the Site Info panel once a parcel is selected, otherwise the empty state. */}
        <motion.div
          initial={false}
          animate={{ x: isDetailPanelOpen ? 0 : 433 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute right-[160px] top-0 h-full w-[433px] bg-[#f7f8f5] border-l border-[rgba(0,0,0,0.09)] z-20 pointer-events-auto"
        >
          {isSiteSelected && selectedMenuItem === 'Site Info'
            ? <SiteInfoPanel />
            : isSiteSelected && selectedMenuItem === 'Permits'
            ? <PermitsPanel />
            : isSiteSelected && selectedMenuItem === 'Analysis'
            ? <AnalysisPanel />
            : isSiteSelected && selectedMenuItem === 'Citations'
            ? <CitationsPanel />
            : isSiteSelected && selectedMenuItem === 'Export'
            ? <ExportPanel />
            : <DetailPanel selectedMenuItem={selectedMenuItem} />}
        </motion.div>

        {/* Right Menu Panel */}
        <motion.div
          className={`absolute right-0 top-0 h-full w-[160px] bg-[#f7f8f5] z-50 pointer-events-auto ${isDetailPanelOpen ? 'border-l border-[rgba(0,0,0,0.09)]' : ''}`}
        >
          <RightMenu activeItem={selectedMenuItem} onMenuItemClick={(label) => {
            setSelectedMenuItem(label);
            setIsDetailPanelOpen(true);
          }} />
        </motion.div>

        {/* Detail Panel Collapse Button - only present while the detail panel is open; collapses it */}
        <AnimatePresence>
          {isDetailPanelOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setIsDetailPanelOpen(false)}
              className="absolute z-50 w-[32px] h-[48px] rounded-[8px] overflow-hidden bg-[#f7f8f5] flex items-center justify-center hover:bg-[#eceee9] transition-colors cursor-pointer"
              style={{ top: 'calc(50% - 24px)', right: 577 }}
              aria-label="Collapse detail panel"
            >
              <img
                src={ChevronIcon}
                alt=""
                className="w-[13px] h-[13px]"
                style={{ transform: 'scaleX(-1)' }}
              />
            </motion.button>
          )}
        </AnimatePresence>

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
