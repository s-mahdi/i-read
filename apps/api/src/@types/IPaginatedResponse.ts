export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
