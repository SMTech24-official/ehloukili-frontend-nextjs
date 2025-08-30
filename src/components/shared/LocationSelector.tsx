import { useEffect, useMemo, useRef, useState } from 'react';
import { allCountry } from '../../../public/data/countries';

interface LocationSelectorProps {
    type?: 'country' | 'state';
    value: string;
    onChange: (value: string) => void;
    isLevel?: boolean;
    inputClassName?: string;
}

interface Option {
    value: string;
    label: string;
}

const LocationSelector = ({ type = 'country', value, onChange, isLevel = true, inputClassName }: LocationSelectorProps) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const allOptions = useMemo(() => {
        let result: Option[] = [];

        if (type === 'country') {
            result = [
                ...result,
                ...allCountry.map(country => ({
                    value: country.name,
                    label: country.name,
                })),
            ];
        } else if (type === 'state') {
            allCountry.forEach(country => {
                if (country.states) {
                    result = [
                        ...result,
                        ...country.states.map(state => ({
                            value: state.name,
                            label: `${state.name}, ${country.name}`,
                        })),
                    ];
                }
            });
        }

        return result;
    }, [type]);

    const filteredOptions = useMemo(() => {
        if (!search) return allOptions;

        const searchLower = search.toLowerCase();
        return allOptions.filter(option =>
            option.label.toLowerCase().includes(searchLower)
        );
    }, [search, allOptions]);

    useEffect(() => {
        const selectedOption = allOptions.find(opt => opt.value === value);
        setSearch(selectedOption ? selectedOption.label : '');
    }, [value, allOptions]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: Option) => {
        onChange(option.value);
        setSearch(option.label);
        setIsOpen(false);
    };

    return (
        <div className="w-full" ref={wrapperRef}>
           {
            isLevel && (
                <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2">
                    {type === 'country' ? 'Country' : 'State'}
                </label>
            )}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search and select..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className={`w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
                />
                {isOpen && filteredOptions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className="p-2 cursor-pointer hover:bg-blue-100"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LocationSelector;