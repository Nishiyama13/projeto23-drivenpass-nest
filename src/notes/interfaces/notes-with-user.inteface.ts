export interface NoteWithUser {
  id: number;
  title: string;
  text: string;
  user: {
    id: number;
    email: string;
  };
}
