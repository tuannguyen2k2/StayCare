"use client";

import { IContact } from "@/interfaces/contact.interface";
import { Controller, useForm } from "react-hook-form";
import { contactResolver } from "./resolver";
import { Button, OutlinedInput, Typography } from "@mui/material";

function ContactForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>({
    resolver: contactResolver,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-7">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className=" flex flex-col gap-2">
              <Typography>Name</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.name}
              />
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className=" flex flex-col gap-2">
              <Typography>Email</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.email}
              />
            </div>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div className=" flex flex-col gap-2">
              <Typography>Phone</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.phone}
              />
            </div>
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <div className=" flex flex-col gap-2">
              <Typography>Message</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                multiline
                rows={4}
                error={!!errors.message}
              />
            </div>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
