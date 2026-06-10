import { forwardRef, useImperativeHandle, useRef, type MutableRefObject } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
};

export interface MapViewHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  flyTo: (lat: number, lon: number) => void;
}

function MapHandle({ mapRef }: { mapRef: MutableRefObject<LeafletMap | null> }) {
  mapRef.current = useMap();
  return null;
}

const MapView = forwardRef<MapViewHandle, MapViewProps>(({ basemap }, ref) => {
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
    </MapContainer>
  );
});

MapView.displayName = 'MapView';
export default MapView;
