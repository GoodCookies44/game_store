export type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  platforms: {
  platform: {
    id: number;
    name: string;
  }
}[]
};

export type GamesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[]; 
}