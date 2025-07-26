export interface IResponse<T = unknown> {
  success: boolean;
  status: number;
  statusText: string;
  message: string;
  data: T | T[];
  pagination?: IPagination;
}

export interface IPagination {
  totalItems: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}
