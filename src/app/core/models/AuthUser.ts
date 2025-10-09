export interface AuthUser {
  token: string;
  expiration: string;
  username: string;
  roles: string[];
}
