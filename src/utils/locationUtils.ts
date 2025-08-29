
import { allCountry } from "../../public/data/countries";
export interface LocationOption {
    value: string;
    label: string;
}

export const getLocationSuggestions = (): LocationOption[] => {
    const suggestions: LocationOption[] = [];

    allCountry.forEach((country) => {
        // Add country as a suggestion
        suggestions.push({
            value: country.name.toLowerCase(),
            label: country.name,
        });

        // Add states as suggestions
        if (country.states) {
            country.states.forEach((state) => {
                suggestions.push({
                    value: state.name.toLowerCase(),
                    label: `${state.name}, ${country.name}`,
                });
            });
        }
    });

    // Sort suggestions alphabetically
    return suggestions.sort((a, b) => a.label.localeCompare(b.label));
};