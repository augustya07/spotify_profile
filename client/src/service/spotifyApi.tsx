// Need to use the React-specific entry point to allow generating React hooks
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import User from "../types/User";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    //@ts-ignore
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to homepage
  //@ts-ignore
  window.location = window.location.origin;
};

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async () => {
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error("No refresh token available");
      logout();
    }

    // Use `/refresh_token` endpoint from our Node app
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );

    // Update localStorage values
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    //@ts-ignore
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Reload the page for localStorage updates to be reflected
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };
  const hasError = urlParams.get("error");

  // If there's an error OR the token in localStorage has expired, refresh the token
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    refreshToken();
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is a token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      //@ts-ignore
      window.localStorage.setItem(property, queryParams[property]);
    }
    // Set timestamp
    //@ts-ignore
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  // We should never get here!
  return false;
};

export const accessToken = getAccessToken();
// Define a service using a base URL and expected endpoints

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      headers.set("authorization", `Bearer ${accessToken}`);
      console.log(accessToken);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSpotifyUser: builder.query<User, string>({
      query: () => `/me`,
    }),
    getUserTopSongs: builder.query<any, string>({
      query: () => `/me/top/tracks?limit=60`,
    }),
    getUserTopArtist: builder.query<any, string>({
      query: () => `/me/top/artists?limit=60`,
    }),
    getUserFollowedArtist: builder.query<any, string>({
      query: () => `/me/following?type=artist`,
    }),
    search: builder.query<any, string>({
      // query: (text:string) => `/search?q=name:${text}&type=album,track,artist,playlist`,
      query: (text:string) => `/search?query=${text}&type=album,track,artist,playlist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20`,
    }),

    artist: builder.query<any, string>({
      query: () => `/search?query=kaleo&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSpotifyUserQuery,
  useGetUserTopSongsQuery,
  useGetUserTopArtistQuery,
  useGetUserFollowedArtistQuery,
  useSearchQuery,
  useArtistQuery,
} = spotifyApi;
