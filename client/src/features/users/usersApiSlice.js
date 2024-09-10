/*  entity adapters to generate normalized data. It has array of ids to iterate over and entities cant be iterated over
    no duplication, builtin crud methods
    entity is an object, pass in ID for lookup

*/

import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadUsers = responseData.map((user) => {
          // mongodb, normalized data is looking for id not _id
          user.id = user._id;
          return user;
        });

        return usersAdapter.setAll(initialState, loadUsers);
      },
      // caching and invalidating data
      providesTags: (result, error, arg) => {
        //result - transformed response from abovewhy
        //err- err obj if problem with query
        //arg - arg passed to the query

        // we are attaching their id to the user's entity to enable efficient caching and refetching

        if (result?.ids) {
          return [
            {
              type: "User",
              id: "LIST",
            },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns query result object

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

//creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state obj with ids and entity
);

// getSelectors creates these selectors and we rename them with aliases

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
