type FilterGroupProps = {
  title: string;
  filterType: 'genres' | 'tags';
  data: Array<{ id: number; name: string }> | undefined;
  isLoading?: boolean;
};
