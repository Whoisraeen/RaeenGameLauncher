import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Placeholder API slice for community features
export const communityApi = createApi({
  reducerPath: 'communityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/community/',
  }),
  tagTypes: ['User', 'Friend', 'Community', 'Review'],
  endpoints: () => ({}),
})

export const {} = communityApi