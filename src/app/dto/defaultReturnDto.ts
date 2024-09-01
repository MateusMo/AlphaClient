export interface DefaultReturnDto<T> {
    status: number;
    message: string;
    data: T;
  }