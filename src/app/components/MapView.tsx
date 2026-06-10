import { forwardRef, useImperativeHandle, useRef, useEffect, type MutableRefObject } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import type { Map as LeafletMap, FeatureGroup } from 'leaflet';
import L from 'leaflet';
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

const MapView = forwardRef<MapViewHandle, MapViewProps>(({ basemap, parcelsActive, parcelsStyle }, ref) => {
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
      <ParcelsLayer parcelsActive={parcelsActive} parcelsStyle={parcelsStyle} />
    </MapContainer>
  );
});

MapView.displayName = 'MapView';
export default MapView;
