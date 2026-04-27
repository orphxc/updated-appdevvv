export interface Session {
  _id?: string;
  subject: string;
  duration: number;
  notes: string;
  date?: Date;
}