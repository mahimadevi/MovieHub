
import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";
import tmdbConfig from "./tmdb.config.js";

const fetchWithLogging = async (endpoint, fetchFunction) => {
  console.log(`Making request to ${endpoint}`);
  const start = Date.now();

  const response = await fetchFunction();

  const duration = Date.now() - start;
  console.log(`${endpoint} request: ${duration}ms`);

  return response;
};

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) => {
    const url = tmdbEndpoints.mediaList({ mediaType, mediaCategory, page });
    return fetchWithLogging("mediaList", () =>
      tmdbConfig.cacheApiResponse(url, () => axiosClient.get(url))
    );
  },
  mediaDetail: async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaDetail({ mediaType, mediaId });
    return fetchWithLogging("mediaDetail", () => axiosClient.get(url));
  },
  mediaGenres: async ({ mediaType }) => {
    const url = tmdbEndpoints.mediaGenres({ mediaType });
    return fetchWithLogging("mediaGenres", () => axiosClient.get(url));
  },
  mediaCredits: async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaCredits({ mediaType, mediaId });
    return fetchWithLogging("mediaCredits", () => axiosClient.get(url));
  },
  mediaVideos: async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaVideos({ mediaType, mediaId });
    return fetchWithLogging("mediaVideos", () => axiosClient.get(url));
  },
  mediaImages: async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaImages({ mediaType, mediaId });
    return fetchWithLogging("mediaImages", () => axiosClient.get(url));
  },
  mediaRecommend: async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaRecommend({ mediaType, mediaId });
    return fetchWithLogging("mediaRecommend", () => axiosClient.get(url));
  },
  mediaSearch: async ({ mediaType, query, page }) => {
    const url = tmdbEndpoints.mediaSearch({ mediaType, query, page });
    return fetchWithLogging("mediaSearch", () => axiosClient.get(url));
  },
  personDetail: async ({ personId }) => {
    const url = tmdbEndpoints.personDetail({ personId });
    return fetchWithLogging("personDetail", () => axiosClient.get(url));
  },
  personMedias: async ({ personId }) => {
    const url = tmdbEndpoints.personMedias({ personId });
    return fetchWithLogging("personMedias", () => axiosClient.get(url));
  },
};

export default tmdbApi;
