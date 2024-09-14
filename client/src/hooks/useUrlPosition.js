import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  const [searchParams] = useSearchParams(); // Read URL for lat lng coordinates when clicked on one of the cities in the cities tab
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return [lat, lng];
}
