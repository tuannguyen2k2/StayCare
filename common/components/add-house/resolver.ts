import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  house_detail_in: z.array(
    z.object({

      duration: z.number()
        .min(1, { message: "Duration must be greater than 0" }),
   
      price: z.number().min(1, { message: "Price must be greater than 0" }),
      deposit: z.number().min(1, { message: "Deposit must be greater than 0" }),
      admin_fee: z.number().min(1, { message: "Admin Fee must be greater than 0" }),
      rent_time_title: z.string().optional(),
      rent_state: z.string().default("available"),
      rent_time_unit: z.string().default("months"),
      benefits: z.array(z.string()).default([""]),
    })
  ),
title: z.string().nonempty({ message: "Title is required" }),
images: z.array(z.any()).optional().default([]),
});

export const resolver = zodResolver(schema);
