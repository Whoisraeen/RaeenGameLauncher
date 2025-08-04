import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Placeholder API slice for system information
export const systemInfoApi = createApi({
  reducerPath: 'systemInfoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/system/',
  }),
  tagTypes: ['SystemInfo', 'Performance', 'Hardware'],
  endpoints: () => ({}),
})

export const {} = systemInfoApi