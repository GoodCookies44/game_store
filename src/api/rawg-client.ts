// Types
import { GamesResponse, GenresResponse, TagsResponse } from '../types/game';

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';
const PAGES = 20;

export const fetchGames = async (): Promise<GamesResponse> => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page_size=${PAGES}`
  );
  return response.json();
};

export const sortGames = async (param: string): Promise<GamesResponse> => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page_size=${PAGES}&${param}`
  );
  return response.json();
};

export const fetchGenres = async (): Promise<GenresResponse> => {
  const response = await fetch(
    `${BASE_URL}/genres?key=${API_KEY}&ordering=-games_count`
  );
  return response.json();
};

export const fetchTags = async (): Promise<TagsResponse> => {
  const response = await fetch(
    `${BASE_URL}/tags?key=${API_KEY}&ordering=-games_count`
  );
  return response.json();
};
