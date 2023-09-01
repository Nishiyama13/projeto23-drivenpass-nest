export interface CredentialWithUser {
  id: number;
  title: string;
  siteUrl: string;
  username: string;
  sitePassword: string;
  user: {
    id: number;
    email: string;
  };
}
