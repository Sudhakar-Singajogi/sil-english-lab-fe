import { useRef } from "react";
import axios from "axios";


export const getTotalPages = function(totalResults, perPage) {
  if (perPage <= 0) return 0;
  return Math.ceil(totalResults / perPage);
}

export const useCachedRequest = () => {
  const cache = useRef({});

  const sendRequest = async (url, payload) => {
    const key = `${url}_${JSON.stringify(payload)}`;
    if (cache.current[key]) return cache.current[key];

    const response = await axios.post(url, payload);
    cache.current[key] = response;
    return response;
  };

  return sendRequest;
};
