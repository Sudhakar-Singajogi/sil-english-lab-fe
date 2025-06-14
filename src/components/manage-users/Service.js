import { FormCheck } from "react-bootstrap";
import axiosInstance from "../../utils/axiosInstance";

export const checkSessionExpired = (error) => {
  window.location.href = "/session-expired";
};
export const fetchSchools = async () => {
  const response = await axiosInstance.get(`/schools?`, {});

  return {
    schools: response.data.data,
    resultTotal: response.data.resultTotal,
    totalRows: response.data.totalRows,
    hasMore: response.data.hasMore,
  };
};

export const fetchUserByEmail = async (email) => {
  try {
    if (email) {
      const response = await axiosInstance.get(`/users/email/${email}`, {});
      
      if (response.status !== 200) {
        return {
          schools: [],
          resultTotal: 0,
          totalRows: 0,
          hasMore: false,
        };
        /* */
      } else {
        const fetchedUser = response.data.data;
        return {
          users: [fetchedUser],
          resultTotal: 1,
          totalRows: 1,
          hasMore: false,
        };
      }
    }
  } catch (exp) { 
    return {
      users: [],
      resultTotal: 0,
      totalRows: 0,
      hasMore: false,
    };
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/users/${id}`, data);
    return response;
  } catch (error) {
    console.log("error is", error);
    return { status: 400 };
  }
};
export const addUser = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/create`, data); 
    return response;
  } catch (error) {
    console.log("error is", error);
    return { status: 400 };
  }
};

export const fetchUserByClassSection = async (
  whichClass,
  whichSection,
  whichSchool,
  fromCache = true
) => {
  // const url = `/users/class/${whichClass}/section/${whichSection}/school/${whichSchool}`;
  const url=`/users?whichClass=${whichClass}&&section=${whichSection}&&school=${whichSchool}`
  try {
    const response = await axiosInstance.get(url, { cache: fromCache });
    console.log("response is", response.data.data);
    // console.log("response is", response.status);

    if (response.status !== 200) {
      return {
        users: [],
        resultTotal: 0,
        totalRows: 0,
        hasMore: false,
        assignedTeacher: {},
      };
      
    } else {
      
      const fetchedUser = response;
      console.log('fetchedUser: ', fetchedUser)
      console.log('Assigned teacher', response.data?.assignTeacher)
      return {
        users: fetchedUser.data.data,
        resultTotal: fetchedUser.data.resultTotal,
        totalRows: fetchedUser.data.totalRows,
        assignedTeacher: fetchedUser?.data?.assignTeacher,
        hasMore: false,
      };
    }
  } catch (exception) {
    console.log("exception is", exception.response);
    if (
      exception?.response?.status == 404 &&
      exception?.response?.data?.error_type === "Resource not found"
    ) {
      return {
        users: [],
        resultTotal: 0,
        totalRows: 0,
        assignedTeacher: {},
        hasMore: false,
      };
    }
    if (exception.response.data.message === "Unauthorized or invalid token") {
      checkSessionExpired();
    }
    return {
      users: [],
      resultTotal: 0,
      totalRows: 0,
      hasMore: false,
    };
  }
};

export const fetchUserByClass = async (
  { offset, perPage, schoolId, role, searchByClass, searchBySection },
  fromCache = true
) => {
  const url = `/users/class`;

   //prepare the query parmas for hte url
   const query = new URLSearchParams();
   if (offset != null) query.append("offset", offset);
   if (perPage != null) query.append("perPage", perPage);
   if (schoolId) query.append("schoolId", schoolId);
   if (role) query.append("role", role);
   if (searchByClass) query.append("whichClass", searchByClass);
   if (searchBySection) query.append("section", searchBySection);

  try {
    const response = await axiosInstance.get(`${url}?${query.toString()}`, { cache: fromCache });
    console.log("response is", response.data.data);
    console.log("response is", response.status);

    if (response.status !== 200) {
      return {
        users: [],
        resultTotal: 0,
        totalRows: 0,
        hasMore: false,
        assignedTeacher: {},
      };
      /* */
    } else {
      const fetchedUser = response.data.data;
      return {
        users: fetchedUser.resultData,
        resultTotal: fetchedUser.resultData.length,
        totalRows: fetchedUser.resultData.length,
        assignedTeacher: fetchedUser.data.assignTeacher,
        hasMore: false,
      };
    }
  } catch (exception) {
    console.log("exception is", exception.response);
    if (
      exception?.response?.status == 404 &&
      exception?.response?.data?.error_type === "Resource not found"
    ) {
      return {
        users: [],
        resultTotal: 0,
        totalRows: 0,
        assignedTeacher: {},
        hasMore: false,
      };
    }
    if (exception.response.data.message === "Unauthorized or invalid token") {
      checkSessionExpired();
    }
    return {
      users: [],
      resultTotal: 0,
      totalRows: 0,
      hasMore: false,
    };
  }
};

export const assignTeacherToClassSec = async (payload) => {
  const resp = await axiosInstance.post(`/assignstudents/toteacher`, payload);
  console.log("assignment responseresp:", resp.status);
  if (resp.status === 201 && resp.data.success) {
    return {
      success: true,
      message: "Assignstudent created successfully",
      data: resp.data.data,
    };
  } else {
    return {
      success: false,
      message: "Failed to assign teacher to the class and section ",
      data: null,
    };
  }
};
