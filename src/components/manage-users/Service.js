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
          console.log("response is", response.data.data);
          console.log("response is", response.status);
      
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
    } catch(exception) {
        console.log("exception is", exception.response);
        return {
              users: [],
              resultTotal: 0,
              totalRows: 0,
              hasMore: false,
            };
        
    }
};
