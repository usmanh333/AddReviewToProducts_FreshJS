export interface Reviews {
  rating?: number;
  remarks?: string;
}
export interface Users {
  _id?: any;
  username?: string;
  designation?: string;
  reviews?: Reviews[];
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
