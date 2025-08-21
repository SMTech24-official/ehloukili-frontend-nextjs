/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';

export function useGroupedProperties(properties: any[]) {
  // Group properties by lat/lng string
  return useMemo(() => {
    const groups: Record<string, any[]> = {};
    properties.forEach((p) => {
      const key = `${p.lat},${p.lng}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });
    return groups;
  }, [properties]);
}
