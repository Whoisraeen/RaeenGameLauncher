import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Placeholder API slice for game store integrations
export const gameStoreApi = createApi({
  reducerPath: 'gameStoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/games/',
  }),
  tagTypes: ['Game', 'GameMetadata', 'GamePrice'],
  endpoints: () => ({}),
})

export const {} = gameStoreApi