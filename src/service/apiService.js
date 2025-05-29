import { cache } from "react";
import axiosInstance from "../utils/axiosInstance";

export const checkSessionExpired = (error) => {
      window.location.href = "/session-expired";

}
export const fetchUsersAPI = async (params = {}) => {
  const { offset, perPage, schoolId, search, role, status, searchByClass, searchBySection, cacheBrust } = params;
  const query = new URLSearchParams();

  if (offset != null) query.append("offset", offset);
  if (perPage != null) query.append("perPage", perPage);
  if (schoolId) query.append("schoolId", schoolId);
  if (search) query.append("search", search);
  if (role) query.append("role", role); 
  if (status) query.append("status", status);
  if(searchByClass) query.append("whichClass", searchByClass);
  if(searchBySection) query.append("section", searchBySection);
  if(cacheBrust) query.append("cacheBurst", cacheBrust);
  // if (sort) query.append("sort", sort); // e.g., 'name:asc'

  const response = await axiosInstance.get(`/users?${query.toString()}`, {
    cache: { ttl: 60000 }, // 1 min
  });
  
  
  return {
    users: response.data.data,
    resultTotal: response.data.resultTotal,
    totalRows: response.data.totalRows,
    hasMore: response.data.hasMore,
  };
};

export const fetchChapterBylevel = async (level, fromCache=true) => {
    // const response = await axiosInstance.get(`/chapters/level/${level}`, {});
    // return response.data.data;
    const url = `/chapters/level/${level}`;
  try {
    const response = await axiosInstance.get(url, { cache: fromCache });
    console.log("response is", response.data.data);
    console.log("response is", response.status);

    if(response.status === 403) {
      //
    }

    if (response.status !== 200) {
      return {
        chapters: [],
        resultTotal: 0,
        totalRows: 0,
        hasMore: false 
      };
      /* */
    } else { 
      const chaps = response.data.data
      return {
        chapters: chaps,
        resultTotal: chaps.length,
        totalRows: chaps.length,
        hasMore: false 
      };
    }
  } catch (exception) {
    console.log("exception is", exception.response);
    if (
      exception?.response?.status == 404 &&
      exception?.response?.data?.error_type === "Resource not found"
    ) {
       //
    }
    if (exception.response.data.message === "Unauthorized or invalid token") {
      checkSessionExpired();
    }
    return {
      chapters: [],
      resultTotal: 0,
      totalRows: 0,
      hasMore: false,
    };
  }
};

export const fetchAChapter = async (chapterId) => {
    const response = await axiosInstance.get(`/lessons/${chapterId}`, {});
    return response.data.data;
};
