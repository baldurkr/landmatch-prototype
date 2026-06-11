import { forwardRef, useImperativeHandle, useRef, useEffect, useState, type MutableRefObject } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import type { Map as LeafletMap, FeatureGroup } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { USE_STATIC_MAP } from '../config';

// Prince George's County, MD
const CENTER: [number, number] = [38.83, -76.875];
const DEFAULT_ZOOM = 11;

const TILES = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, GIS User Community',
  },
};

type MapViewProps = {
  basemap: 'street' | 'satellite';
  parcelsActive: boolean;
  parcelsStyle: 'plain' | 'yearBuilt';
  onMapClick?: () => void;
  // Used by the static-image map to fall back to OSM when the user zooms while
  // Satellite (USGS) is active, since only a single 1x USGS image exists.
  onBasemapChange?: (basemap: 'street' | 'satellite') => void;
};

export interface MapViewHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  flyTo: (lat: number, lon: number) => void;
}

function generateSampleParcels() {
  const center = { lat: 38.83, lon: -76.875 };
  const parcels = [];

  for (let i = 0; i < 150; i++) {
    const lat = center.lat + (Math.random() - 0.5) * 0.15;
    const lon = center.lon + (Math.random() - 0.5) * 0.15;
    const size = 0.003 + Math.random() * 0.005;
    const yearBuilt = 1920 + Math.floor(Math.random() * 104);

    const feature = {
      type: 'Feature',
      properties: {
        PIN: `${String(i + 1000).slice(1)}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        PARCEL_ID: `PG-${String(i + 1).padStart(6, '0')}`,
        YearBuilt: yearBuilt,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [lon - size, lat - size],
          [lon + size, lat - size],
          [lon + size, lat + size],
          [lon - size, lat + size],
          [lon - size, lat - size],
        ]],
      },
    };
    parcels.push(feature);
  }

  return {
    type: 'FeatureCollection',
    features: parcels,
  };
}

function MapHandle({ mapRef }: { mapRef: MutableRefObject<LeafletMap | null> }) {
  mapRef.current = useMap();
  return null;
}

function MapClickHandler({ onMapClick }: { onMapClick?: () => void }) {
  useMapEvents({
    click: () => onMapClick?.(),
  });
  return null;
}

function ParcelsLayer({ parcelsActive, parcelsStyle }: { parcelsActive: boolean; parcelsStyle: 'plain' | 'yearBuilt' }) {
  const map = useMap();
  const layerGroupRef = useRef<FeatureGroup>(null);

  useEffect(() => {
    if (!parcelsActive) {
      if (layerGroupRef.current) {
        map.removeLayer(layerGroupRef.current);
      }
      return;
    }

    // Create a layer group for parcels
    if (!layerGroupRef.current) {
      layerGroupRef.current = L.featureGroup().addTo(map);
    } else {
      map.addLayer(layerGroupRef.current);
    }

    // Fetch parcel data from Prince George's County
    const fetchParcels = async () => {
      try {
        let data;

        // Try to fetch from Maryland GIS open data service
        try {
          const response = await fetch(
            'https://gis.maryland.gov/arcgis/rest/services/Planning/MD_Parcels/MapServer/0/query?' +
            'where=1%3D1&outFields=*&f=geojson&returnGeometry=true&resultRecordCount=500&geometry=' +
            JSON.stringify({xmin: -76.95, ymin: 38.75, xmax: -76.80, ymax: 38.90})
          );
          data = await response.json();
        } catch (e) {
          // Fallback: use sample parcel data for demonstration
          data = generateSampleParcels();
        }

        if (!layerGroupRef.current) return;

        layerGroupRef.current.clearLayers();

        L.geoJSON(data, {
          style: (feature) => {
            const yearBuilt = feature?.properties?.YearBuilt || null;
            let color = '#e0e0e0'; // default gray

            if (parcelsStyle === 'yearBuilt' && yearBuilt) {
              const year = parseInt(yearBuilt);
              if (year < 1950) color = '#fde7dc';
              else if (year < 1980) color = '#fbb69b';
              else if (year < 2000) color = '#fa795b';
              else if (year < 2015) color = '#e0423b';
              else color = '#ac272c';
            }

            return {
              color: '#ffffff',
              weight: 1,
              opacity: 0.8,
              fillColor: color,
              fillOpacity: 0.6,
            };
          },
          onEachFeature: (feature, layer) => {
            const parcelId = feature.properties?.PIN || feature.properties?.PARCEL_ID || 'Unknown';
            layer.bindPopup(`<div style="font-size: 12px"><strong>Parcel ID:</strong> ${parcelId}</div>`);

            // Add parcel ID label to center of parcel
            const bounds = layer.getBounds();
            const center = bounds.getCenter();
            const label = L.marker(center, {
              icon: L.divIcon({
                className: 'parcel-label',
                html: `<div style="font-size: 11px; font-weight: 500; color: #141c11; text-shadow: 1px 1px 2px rgba(255,255,255,0.8); pointer-events: none;">${parcelId}</div>`,
                iconSize: [50, 20],
              }),
            });
            label.addTo(layerGroupRef.current!);
          },
        }).addTo(layerGroupRef.current);
      } catch (error) {
        console.warn('Could not fetch parcel data:', error);
        // Fallback: add a subtle indicator that parcels couldn't load
      }
    };

    fetchParcels();

    return () => {
      if (layerGroupRef.current) {
        map.removeLayer(layerGroupRef.current);
      }
    };
  }, [parcelsActive, map]);

  useEffect(() => {
    // Update styling when parcelsStyle changes
    if (layerGroupRef.current && parcelsActive) {
      const geojsonLayers = layerGroupRef.current.getLayers().filter(layer =>
        layer instanceof L.Path && !(layer instanceof L.Marker)
      );

      geojsonLayers.forEach(layer => {
        if (layer instanceof L.Path) {
          const feature = (layer as any).feature;
          const yearBuilt = feature?.properties?.YearBuilt || null;
          let color = '#e0e0e0';

          if (parcelsStyle === 'yearBuilt' && yearBuilt) {
            const year = parseInt(yearBuilt);
            if (year < 1950) color = '#fde7dc';
            else if (year < 1980) color = '#fbb69b';
            else if (year < 2000) color = '#fa795b';
            else if (year < 2015) color = '#e0423b';
            else color = '#ac272c';
          }

          layer.setStyle({ fillColor: color });
        }
      });
    }
  }, [parcelsStyle, parcelsActive]);

  return null;
}

const LeafletMapView = forwardRef<MapViewHandle, MapViewProps>(({ basemap, parcelsActive, parcelsStyle, onMapClick }, ref) => {
  const mapRef = useRef<LeafletMap | null>(null);

  useImperativeHandle(ref, () => ({
    zoomIn: () => mapRef.current?.zoomIn(),
    zoomOut: () => mapRef.current?.zoomOut(),
    flyTo: (lat, lon) => mapRef.current?.flyTo([lat, lon], 16),
  }));

  const tile = TILES[basemap];

  return (
    <MapContainer
      center={CENTER}
      zoom={DEFAULT_ZOOM}
      zoomControl={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer key={basemap} url={tile.url} attribution={tile.attribution} />
      <MapHandle mapRef={mapRef} />
      <MapClickHandler onMapClick={onMapClick} />
      <ParcelsLayer parcelsActive={parcelsActive} parcelsStyle={parcelsStyle} />
    </MapContainer>
  );
});

LeafletMapView.displayName = 'LeafletMapView';

// ---------------------------------------------------------------------------
// Static-image map (testing). Renders pre-rendered PNGs from assets/maps that
// emulate the live map at discrete zoom levels (1x–6x) and layers.
// ---------------------------------------------------------------------------

// Eagerly resolve every map image to its bundled URL, keyed by filename.
const MAP_IMAGE_MODULES = import.meta.glob('../../assets/maps/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const MAP_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(MAP_IMAGE_MODULES).map(([path, url]) => [path.split('/').pop()!, url]),
);

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
// Parcels imagery only exists from this zoom level upward.
const PARCELS_MIN_ZOOM = 4;
// Satellite (USGS) imagery only exists as a single 1x image.
const SATELLITE_IMAGE = 'PGC 1x USGS No layers.png';

function staticImageName(basemap: 'street' | 'satellite', zoom: number, parcelsActive: boolean): string {
  if (basemap === 'satellite') return SATELLITE_IMAGE;
  const layer = parcelsActive && zoom >= PARCELS_MIN_ZOOM ? 'Parcels' : 'No layers';
  return `PGC ${zoom}x OSM ${layer}.png`;
}

const StaticMapView = forwardRef<MapViewHandle, MapViewProps>(({ basemap, parcelsActive, onMapClick, onBasemapChange }, ref) => {
  const [zoom, setZoom] = useState(MIN_ZOOM);

  // Satellite (USGS) only has a 1x image — always show it at 1x.
  useEffect(() => {
    if (basemap === 'satellite') setZoom(MIN_ZOOM);
  }, [basemap]);

  // Enabling Parcels while zoomed out to 1x–3x jumps to 4x, where Parcels
  // imagery starts. At 4x–6x the suffix simply swaps (handled at render time).
  useEffect(() => {
    if (basemap === 'street' && parcelsActive && zoom < PARCELS_MIN_ZOOM) {
      setZoom(PARCELS_MIN_ZOOM);
    }
    // Intentionally fires on the parcels/basemap transition; reads current zoom.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parcelsActive, basemap]);

  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      if (basemap === 'satellite') {
        // USGS is 1x only — zooming in drops back to OSM imagery.
        onBasemapChange?.('street');
        setZoom(parcelsActive ? PARCELS_MIN_ZOOM : MIN_ZOOM + 1);
      } else {
        setZoom((z) => Math.min(z + 1, MAX_ZOOM));
      }
    },
    zoomOut: () => {
      // On satellite we're already at the only (1x) USGS image.
      if (basemap === 'satellite') return;
      setZoom((z) => Math.max(z - 1, MIN_ZOOM));
    },
    // No geolocation in the static map; address search is a no-op here.
    flyTo: () => {},
  }), [basemap, parcelsActive, onBasemapChange]);

  const filename = staticImageName(basemap, zoom, parcelsActive);
  const url = MAP_IMAGES[filename];

  return (
    <div
      onClick={() => onMapClick?.()}
      style={{ width: '100%', height: '100%', overflow: 'hidden', cursor: 'pointer', background: '#e8eae3' }}
    >
      {url ? (
        <img
          src={url}
          alt={filename}
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none' }}
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#888', fontSize: 14 }}>
          Missing map image: {filename}
        </div>
      )}
    </div>
  );
});

StaticMapView.displayName = 'StaticMapView';

const MapView = forwardRef<MapViewHandle, MapViewProps>((props, ref) =>
  USE_STATIC_MAP ? <StaticMapView ref={ref} {...props} /> : <LeafletMapView ref={ref} {...props} />,
);

MapView.displayName = 'MapView';
export default MapView;
