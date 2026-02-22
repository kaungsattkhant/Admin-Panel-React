export interface User {
  id?: number;
  username: string;
  email: string;
  phone_number?: string;
  password?: string;
  type: "super_admin" | "admin" | "staff";
  created_at?: string;
  updated_at?: string;
}