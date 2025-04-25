export function buildRouteSearchURL(filters: {
  departureSearch?: string;
  arrivalToSearch?: string;
  startOfDay?: string;
  endOfDay?: string;
  wifi?: boolean;
  coffee?: boolean;
  power?: boolean;
  restRoom?: boolean;
  limit?: number;
  driverId?: number;
}): string {
  const query: Record<string, string> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      query[key] = String(value);
    }
  });

  return new URLSearchParams(query).toString();
}
