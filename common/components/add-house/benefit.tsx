"use client";
import React, { useEffect } from "react";
import { Button, IconButton, OutlinedInput } from "@mui/material";
import { useFieldArray, Controller } from "react-hook-form";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
interface BenefitProps {
  control: any;
  index: number;
}

const Benefits: React.FC<BenefitProps> = ({ control, index }) => {
  const {
    fields: benefitsFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: `house_detail_in.${index}.benefits`,
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <label>Benefits</label>
        <div className="flex flex-col gap-2">
          {benefitsFields.map((benefit, benefitIndex) => (
            <div key={benefit.id} className="flex gap-2 items-center">
              <Controller
                control={control}
                name={`house_detail_in.${index}.benefits.${benefitIndex}`}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    fullWidth
                    placeholder="Please type here"
                    sx={{
                      borderRadius: 4,
                      fieldset: {
                        borderColor: "secondary.main",
                      },
                    }}
                  />
                )}
              />

              <IconButton
                className="icon"
                onClick={() => removeBenefit(benefitIndex)}
              >
                <HighlightOffIcon color="error" />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="my-6">
          <Button
            variant="outlined"
            sx={{ width: "120px", height: "40px" }}
            type="button"
            onClick={() => appendBenefit([""])}
          >
            Add Benefit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
