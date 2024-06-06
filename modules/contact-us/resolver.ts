import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";

export const contactResolver = zodResolver(
  object({
    name: string().min(3),
    email: string().email(),
    phone: string().min(10).max(10),
    message: string().min(10),
  })
);
