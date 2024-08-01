export interface ResponseObject {
  success: boolean;
  message: string;
  responseObject: any;
  statusCode: number;
}
export type AuthContextType = {
  user: any;
  setUser: any;
};
export type AuthProviderType = {
  children: React.ReactNode;
};
export type AuthUserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  organization: any;
};
