import { cache } from "react";
import axiosInstance from "../utils/axiosInstance";

export const checkSessionExpired = (error) => {
  window.location.href = "/session-expired";
};
export const fetchUsersAPI = async (params = {}) => {
  const {
    offset,
    perPage,
    schoolId,
    search,
    role,
    status,
    searchByClass,
    searchBySection,
    cacheBrust,
  } = params;
  const query = new URLSearchParams();

  if (offset != null) query.append("offset", offset);
  if (perPage != null) query.append("perPage", perPage);
  if (schoolId) query.append("schoolId", schoolId);
  if (search) query.append("search", search);
  if (role) query.append("role", role);
  if (status) query.append("status", status);
  if (searchByClass) query.append("whichClass", searchByClass);
  if (searchBySection) query.append("section", searchBySection);
  if (cacheBrust) query.append("cacheBurst", cacheBrust);
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

export const fetchChapterBylevel = async (level, fromCache = true) => {
  // const response = await axiosInstance.get(`/chapters/level/${level}`, {});
  // return response.data.data;
  const url = `/chapters/level/${level}`;
  const resp = await callGETAPI(url, fromCache);
  resp.chapters = resp.resultData;
  delete resp.resultData;
  return resp;
};

export const fetchAChapter = async (chapterId) => {
  const resp = await callGETAPI(`/lessons/${chapterId}`);
  return resp;
};

export const fetchLessonsByChapter = async (chapterId, fromCache = true) => {
  const url = `/lessons/chapter/${chapterId}`;
  const resp = await callGETAPI(url, fromCache);
  return resp;
};

export const assignlessons = async (payload) => {
  const resp = await callPOSTAPI(`/assignlessons/create`, payload);
  return resp;
};

export const assignedChapLessStats = async () => {
  try {
    const response = await axiosInstance.get(
      `/assignlessons/byteacher?limit=5`,
      {
        cache: false,
      }
    );
    console.log("response is", response);

    if (response.status === 200) {
      const respData = response.data.data;
      return {
        resultData: {
          recentlyAssigned: respData.resultData,
          assignedStats: respData.assignedStats,
        },
        resultTotal: respData.resultData.length,
        totalRows: response.data.data.totalRows,
        hasMore: response.data.data.hasMore,
      };
    } else {
      return {
        resultData: [],
        resultTotal: 0,
        totalRows: 0,
        hasMore: false,
      };
    }
  } catch (exception) {
    return checkCatchException(exception);
  }
};

const callGETAPI = async (url, fromCache) => {
  try {
    const response = await axiosInstance.get(url, { cache: fromCache });
    console.log("response is", response.data.data);
    console.log("response is", response.status);

    if (response.status === 403) {
      //
    }

    if (response.status !== 200) {
      return {
        resultData: [],
        resultTotal: 0,
        totalRows: 0,
        hasMore: false,
      };
      /* */
    } else {
      const data = response.data.data;
      return {
        resultData: data,
        resultTotal: data.length,
        totalRows: data.length,
        hasMore: false,
      };
    }
  } catch (exception) {
    return checkCatchException(exception);
  }
};

const checkCatchException = (exception) => {
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
    resultData: [],
    resultTotal: 0,
    totalRows: 0,
    hasMore: false,
  };
};


export const callDeleteAPI = async (url) => {
  try {
    const resp = await axiosInstance.delete(url);
    console.log("delete resp is: ", resp);

    if (resp.status === 200) {
      return {
        success: true,
        message: resp.data.message,
        data: resp.data.data,
      };
    }
  } catch (exception) {
    if (exception.response.data.message === "Unauthorized or invalid token") {
      checkSessionExpired();
    }

    return {
      success: false,
      message:
        exception?.response?.data?.message || "Failed to assign lessons ",
      data: null,
    };
  }
};


const callPOSTAPI = async (url, payload) => {
  try {
    const resp = await axiosInstance.post(url, payload);
    console.log("resp:", resp);

    if (resp.status === 201 && resp.data.success) {
      return {
        success: true,
        message: resp.data.message,
        data: resp.data.data,
      };
    }
  } catch (exception) {
    if (exception.response.data.message === "Unauthorized or invalid token") {
      checkSessionExpired();
    }

    return {
      success: false,
      message:
        exception?.response?.data?.message || "Failed to assign lessons ",
      data: null,
    };
  }
};
