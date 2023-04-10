export interface AuthResponseData {
  providerId: string | null;
  idToken: string;
  email: string | null;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
