/// <reference types="vite/client" />

type DateTimeString = string;

type ApiResponseList<T> = {
  data: T[];
  totalAmount: number;
  totalPages: number;
  page?: number;
  perPage?: number;
};

type CreateAndUpdateFields<T> = T & {
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
};
