// Types
import { GamesResponse } from "../types/game";

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async ():Promise<GamesResponse> => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page_size=5`
  );
  return response.json()
}