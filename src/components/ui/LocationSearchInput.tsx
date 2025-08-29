
'use client';

import Input from '@/components/ui/Input';
import { SearchIcon } from '@/components/ui/SearchIcon';
import debounce from 'lodash/debounce';
import * as React from 'react';

interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationSearchInputProps {
  onLocationSelect: (location: LocationSuggestion) => void;
}

export const LocationSearchInput: React.FC<LocationSearchInputProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<LocationSuggestion[]>([]);
  const [location, setLocation] = React.useState<LocationSuggestion | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchSuggestions = React.useCallback(async (q: string) => {
    if (!q || q.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetch = React.useMemo(
    () => debounce(fetchSuggestions, 300),
    [fetchSuggestions]
  );

  React.useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  const handleSelect = (location: LocationSuggestion) => {
    setQuery(location.display_name);
    setSuggestions([]);
    setLocation(location);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)} // Delay to allow click on suggestion
        placeholder="Search for a location..."
        className="pl-4 pr-12 h-full text-base border-0 focus:ring-0 focus:border-0 focus:outline-0"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          type="button"
          className="p-2 rounded-md bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-500)]"
          onClick={() => {
            if (location) onLocationSelect(location);
          }}
        >
          <SearchIcon className="h-5 w-5 !text-white" />
        </button>
      </div>
      {isFocused && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {isLoading && <li className="px-4 py-2 text-gray-500">Loading...</li>}
          {!isLoading && suggestions.length === 0 && query.length > 2 && (
            <li className="px-4 py-2 text-gray-500">No results found.</li>
          )}
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onMouseDown={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearchInput;
