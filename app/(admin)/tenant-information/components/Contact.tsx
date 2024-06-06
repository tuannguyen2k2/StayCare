"use client";
import React, { useEffect } from "react";
import { Button, IconButton, OutlinedInput, TextField } from "@mui/material";
import { useFieldArray, Controller } from "react-hook-form";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
interface BenefitProps {
  control: any;
  index: number;
}

const Contact: React.FC<BenefitProps> = ({ control, index }) => {
  const {
    fields: contactFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: `tenants.${index}.contacts`,
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-6 items-center">
          <label>Contact</label>
          {contactFields.length === 0 && (
            <Button
              variant="outlined"
              sx={{ width: "120px", height: "40px" }}
              type="button"
              onClick={() =>
                appendBenefit({ phone: "", email: "", name: "", code: "" })
              }
            >
              Add Benefit
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {contactFields?.map((benefit, contactIndex) => (
            <div className="flex flex-col gap-6" key={benefit.id}>
              <Button
                variant="outlined"
                className="w-20 h-10"
                onClick={() => removeBenefit(contactIndex)}
              >
                Delete
              </Button>

              <div className="flex gap-2 items-center">
                <Controller
                  control={control}
                  name={`tenants.${index}.contacts.${contactIndex}.name`}
                  render={({ field }) => (
                    <div className="w-full">
                      <TextField
                        {...field}
                        sx={{ width: "100%" }}
                        className="w-full"
                        label="Full name"
                        variant="outlined"
                      />
                    </div>
                  )}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Controller
                  control={control}
                  name={`tenants.${index}.contacts.${contactIndex}.email`}
                  render={({ field }) => (
                    <div className="w-full">
                      <TextField
                        {...field}
                        sx={{ width: "100%" }}
                        className="w-full"
                        label="Email"
                        variant="outlined"
                      />
                    </div>
                  )}
                />
              </div>
              <div className="flex gap-10 mb-8">
                <Controller
                  control={control}
                  name={`tenants.${index}.contacts.${contactIndex}.code`}
                  render={({ field }) => (
                    <div className="w-full">
                      <TextField
                        {...field}
                        sx={{ width: "100%" }}
                        className="w-full"
                        label="Country code"
                        variant="outlined"
                      />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name={`tenants.${index}.contacts.${contactIndex}.phone`}
                  render={({ field }) => (
                    <div className="w-full">
                      <TextField
                        {...field}
                        sx={{ width: "100%" }}
                        className="w-full"
                        label="Phone number"
                        variant="outlined"
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
