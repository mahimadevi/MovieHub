
import dotenv from "dotenv";
import NodeCache from "node-cache";

dotenv.config();

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

// Create a cache with a standard TTL (Time-To-Live)
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

// Cache the API response
const cacheApiResponse = (cacheKey, fetchFunction) => {
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    console.log(`Cache hit for ${cacheKey}`);
    return Promise.resolve(cachedResponse);
  } else {
    console.log(`Cache miss for ${cacheKey}`);
    return fetchFunction().then((response) => {
      cache.set(cacheKey, response);
      return response;
    });
  }
};

export default { getUrl, cacheApiResponse };
