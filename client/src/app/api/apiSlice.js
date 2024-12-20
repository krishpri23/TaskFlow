import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://taskflow-api-ag4g.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    console.log(token, "access token on login");

    // console.log(token, "inside fetch base");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  fetchFn: async (...args) => {
    console.log("Request:", ...args);
    const result = await fetch(...args);
    console.log("Response:", result);
    return result;
  },
});

/*  args - req url, method, body
    api - signal, dispatch, getState()
    extraOptions - custom like {shout:true}
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // expired token
  if (result?.error?.status === 403) {
    console.log("sending refresh token...");

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    console.log(refreshResult, "refresh result");

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token. args is the original req
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login expired";
      }

      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
