export type Payload = {
  id: number;
  email: string;
  role: "USER" | "ADMIN" | "ARTIST";
} | null;
