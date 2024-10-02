/*  entity adapters to generate normalized data. It has array of ids to iterate over and entities cant be iterated over
    no duplication, builtin crud methods
    entity is an object, pass in ID for lookup

*/

import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
  // add completed note at the bottom
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      // keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        console.log("inside transform", responseData);
        const loadNotes = responseData.map((note) => {
          // mongodb, normalized data is looking for id not _id
          note.id = note._id;
          return note;
        });

        return notesAdapter.setAll(initialState, loadNotes);
      },
      // caching and invalidating data
      providesTags: (result, error, arg) => {
        //result - transformed response from abovewhy
        //err- err obj if problem with query
        //arg - arg passed to the query

        // we are attaching their id to the note's entity to enable efficient caching and refetching

        if (result?.ids) {
          return [
            {
              type: "Note",
              id: "LIST",
            },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        } else return [{ type: "Note", id: "LIST" }];
      },
    }),
    addNote: builder.mutation({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNoteData,
        },
      }),

      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),

    updateNote: builder.mutation({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNoteData,
        },
      }),

      invalidatesTags: (result, arg, error) => [{ type: "Note", id: arg.id }],
    }),

    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: { id },
      }),

      invalidatesTags: (result, arg, error) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useUpdateNoteMutation,
  useAddNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// returns query result object

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

//creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data // normalized state obj with ids and entity
);

// getSelectors creates these selectors and we rename them with aliases

export const {
  selectAll: selectAllnotes,
  selectById: selectNotesById,
  selectIds: selectNotesIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
