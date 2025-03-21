import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/baseURL";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    getReviewsCount: builder.query({
      query: () => ({ url: "/total-reviews" }),
    }),
    getReviewsByUserId: builder.query({
      query: (userId) => ({ url: `/${userId}` }),
      providesTags: (result, error, userId) => [{ type: "Reviews", id: userId }],
    }),
  }),
});

export const {
  usePostReviewMutation,  // ✅ Corrected export to match the mutation
  useGetReviewsCountQuery,
  useGetReviewsByUserIdQuery,
} = reviewsApi;

export default reviewsApi;
