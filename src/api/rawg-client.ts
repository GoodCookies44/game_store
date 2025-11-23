import { FetchContext, GenresResponse, TagsResponse } from '../types/filter';
import { Game, GamesResponse } from '../types/game';

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';
const PAGES = 40;

export const fetchGames = async (pageParam = 1): Promise<GamesResponse> => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page_size=40&page=${pageParam}`
  );
  return response.json();
};

export const fetchGameById = async (id: string): Promise<Game> => {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  console.log('Game data:', response.json()); // ← посмотрим что приходит
  return response.json();
};

export const sortGames = async ({
  pageParam = 1,
  meta,
}: FetchContext): Promise<GamesResponse> => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page_size=${PAGES}&page=${pageParam}&${meta?.sortParam}`
  );
  return response.json();
};

export const fetchGenres = async (): Promise<GenresResponse> => {
  const response = await fetch(
    `${BASE_URL}/genres?key=${API_KEY}&page_size=${PAGES}&ordering=-games_count`
  );
  return response.json();
};

export const fetchTags = async (): Promise<TagsResponse> => {
  const response = await fetch(
    `${BASE_URL}/tags?key=${API_KEY}&page_size=${PAGES}&ordering=-games_count`
  );
  return response.json();
};
