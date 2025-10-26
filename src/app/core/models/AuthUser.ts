export interface AuthUser {
  token: string;
  expiration: string;
  username: string;
  roles: string[];
}
export interface AuthClient {
  id: string;
  email: string;
  name: string;
  number: string;
}
