type SimplePaginate<T> = {
  data: T[];
  prev_page_url: string | null;
  next_page_url: string | null;
  per_page: number;
};

export default SimplePaginate;
