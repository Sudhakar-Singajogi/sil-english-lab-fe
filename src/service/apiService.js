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
