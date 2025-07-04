import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface VehicleEntry {
  _id?: string;
  car: string;
  model: string;
  plateNumber: string;
  arrivalTime: string;
  service: string; // Service ID
  price: number;
  paymentMethod: string;
  employeeName: string;
}

export const VehicleServiceApi = createApi({
  reducerPath: "vehicleServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Change to your server URL if needed
  }),
  tagTypes: ["VehicleEntries"],
  endpoints: (builder) => ({
    getEntries: builder.query<{ data: VehicleEntry[] }, void>({
      query: () => "/vehicle-entries",
      providesTags: ["VehicleEntries"],
    }),
    addEntry: builder.mutation<void, VehicleEntry>({
      query: (entry) => ({
        url: "/vehicle-entries",
        method: "POST",
        body: entry,
      }),
      invalidatesTags: ["VehicleEntries"],
    }),
  }),
});

export const { useGetEntriesQuery, useAddEntryMutation } = VehicleServiceApi;
