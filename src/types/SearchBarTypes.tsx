export interface UserLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export type SearchBarProps = {
  instruction: string;
  placeholder: string;
};
