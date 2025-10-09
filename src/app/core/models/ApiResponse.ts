import { AuthUser } from './AuthUser';

export interface ApiResponse {
  isSuccess: boolean;
  value: any | AuthUser;
  error?: string | null;
}
