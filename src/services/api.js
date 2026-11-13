
const request = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const getPopularMovies = async () => {
  const data = await request("/api/movies/popular");
  return data.results;
};

export const searchMovies = async (query) => {
  const params = new URLSearchParams({ query });

  const data = await request(
    `/api/movies/search?${params.toString()}`
  );

  return data.results;
};
