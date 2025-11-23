export type FilterGroupProps = {
  title: string;
  filterType: 'genres' | 'tags';
  data: Array<{ id: number; name: string }> | undefined;
  isLoading?: boolean;
  multiple?: boolean;
};

export type Genre = {
  id: number;
  name: string;
  games_count: number;
};

export type GenresResponse = {
  count: number;
  results: Genre[];
};

export type Tag = {
  id: number;
  name: string;
  games_count: number;
};

export type TagsResponse = {
  count: number;
  results: Tag[];
};

export type FetchContext = {
  pageParam?: number;
  meta?: { sortParam: string };
};
