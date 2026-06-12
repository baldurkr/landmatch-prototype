import { useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

type GeoResult = {
  id: string;
  displayName: string;
  secondary: string;
  lat: number;
  lon: number;
};

type Props = {
  onSelect: (lat: number, lon: number) => void;
};

// Looks like "123 Some Street..." — trigger Census geocoder
const HOUSE_ADDRESS_RE = /^\d+\s+\S/;

function titleCase(str: string): string {
  return str.split(' ').map(word =>
    /^[A-Z]{2}$/.test(word) || /^\d/.test(word)
      ? word
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

function formatCensus(matched: string): [string, string] {
  const parts = matched.split(', ').map(titleCase);
  return [parts.slice(0, 2).join(', '), parts.slice(2).join(', ')];
}

function formatNominatim(displayName: string): [string, string] {
  const parts = displayName.split(', ');
  return [parts.slice(0, 2).join(', '), parts.slice(2, 4).join(', ')];
}

// Bounding box biases Nominatim results toward Prince George's County, MD
const PGCO_VIEWBOX = '-77.05,39.1,-76.55,38.55';

async function fetchNominatim(q: string): Promise<GeoResult[]> {
  const params = new URLSearchParams({
    q,
    format: 'json',
    limit: '5',
    countrycodes: 'us',
    addressdetails: '1',
    viewbox: PGCO_VIEWBOX,
  });
  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
  const data: { place_id: number; display_name: string; lat: string; lon: string }[] =
    await res.json();
  return data.map(r => {
    const [primary, secondary] = formatNominatim(r.display_name);
    return { id: `n-${r.place_id}`, displayName: primary, secondary, lat: +r.lat, lon: +r.lon };
  });
}

async function fetchCensus(q: string): Promise<GeoResult[]> {
  const params = new URLSearchParams({ address: q, benchmark: '2020', format: 'json' });
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?${params}`,
      { signal: controller.signal }
    );
    const data = await res.json();
    const matches: { matchedAddress: string; coordinates: { x: number; y: number } }[] =
      data?.result?.addressMatches ?? [];
    return matches.slice(0, 2).map((m, i) => {
      const [primary, secondary] = formatCensus(m.matchedAddress);
      return { id: `c-${i}`, displayName: primary, secondary, lat: m.coordinates.y, lon: m.coordinates.x };
    });
  } finally {
    clearTimeout(t);
  }
}

export default function AddressSearch({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const search = async (q: string) => {
    try {
      const isAddressLike = HOUSE_ADDRESS_RE.test(q);
      const [nominatim, census] = await Promise.all([
        fetchNominatim(q).catch(() => [] as GeoResult[]),
        isAddressLike ? fetchCensus(q).catch(() => [] as GeoResult[]) : Promise.resolve([] as GeoResult[]),
      ]);
      // For house-number queries: Census gives the precise match; only fall back to
      // Nominatim when Census found nothing (avoids off-county Nominatim results
      // that cause the map to fly to the wrong place).
      const results = isAddressLike
        ? (census.length > 0 ? census : nominatim)
        : nominatim;
      setResults(results);
      setIsOpen(results.length > 0);
    } catch {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    if (val.trim().length < 3) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    debounceRef.current = setTimeout(() => search(val.trim()), 350);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  const handleSelect = (result: GeoResult) => {
    setQuery(result.displayName);
    setResults([]);
    setIsOpen(false);
    onSelect(result.lat, result.lon);
  };

  return (
    <div
      data-address-search
      className="relative h-[40px] rounded-[8px] shrink-0 w-[288px]"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <div className="bg-white content-stretch flex items-center justify-between overflow-clip px-[16px] py-[8px] relative rounded-[inherit] size-full">
        <input
          type="text"
          placeholder="Enter address"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px] text-black placeholder:text-[#97a191] outline-none"
        />
        <Search size={24} color="#6A7C68" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.14)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_10px_0px_rgba(4,16,11,0.04)]" />

      {isOpen && results.length > 0 && (
        <div className="absolute top-[48px] left-0 right-0 bg-white rounded-[8px] border border-[rgba(0,0,0,0.09)] shadow-[0px_8px_24px_0px_rgba(4,16,11,0.12)] overflow-hidden z-50">
          {results.map((result) => (
            <button
              key={result.id}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(result); }}
              className="w-full text-left px-[16px] py-[10px] hover:bg-[#f7f8f5] transition-colors border-b border-[rgba(0,0,0,0.06)] last:border-b-0"
            >
              <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#141c11] truncate">{result.displayName}</p>
              {result.secondary && (
                <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#97a191] truncate mt-[2px]">{result.secondary}</p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
