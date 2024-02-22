import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi =  createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: "http://192.168.1.69:3000"}),
  endpoints: (builder) => ({
    getUserTasks: builder.query({
      query: (token) => ({
        url: "/tasks/get-user-tasks/",
        method: "POST",
        headers: {
          Authorization: `Token ${token}`
        },
      })
    }),
    editTask: builder.query({
      query: ([body, token]) => ({
        url: "/tasks/" + body.taskId,
        method: "PUT",
        body,
        headers: {
          Authorization: `Token ${token}`
        },
      })
    })
  })
})

export const { useLazyGetUserTasksQuery, useLazyEditTaskQuery } = userApi