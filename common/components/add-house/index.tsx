"use client";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import { FilePond, registerPlugin } from "react-filepond";
import { useEffect, useState } from "react";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { FilePondFile } from "filepond";
import { CommonConstants } from "@/utils/constants";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Benefits from "@/common/components/add-house/benefit";
import { house_images } from "@/clientApi/house_images";
import { toast } from "react-toastify";
import { resolver } from "@/common/components/add-house/resolver";
import { useRouter } from "next/navigation";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
interface IFormValues {
  title?: string;
  images?: File[] | [];
  house_detail_in: {
    rent_time_title: string;
    rent_state: string;
    duration: number;
    rent_time_unit: string;
    price: number;
    deposit: number;
    admin_fee: number;
    benefits: string[];
  }[];
}

export default function AddHouse() {
  const [files, setFiles] = useState<File[] | []>([]);
  const history = useRouter();
  const {
    control,
    trigger,
    setValue,
    getValues,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    resolver,
    defaultValues: {
      house_detail_in: [
        {
          rent_time_title: "",
          rent_state: "available",
          duration: 0,
          rent_time_unit: "months",
          price: 0,
          deposit: 0,
          admin_fee: 0,
          benefits: [""],
        },
      ],
      title: "",
      images: [],
    },
  });
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "house_detail_in",
  });
  console.log("errors", errors);

  const onSubmit = async (data: IFormValues) => {
    const toastId = toast.loading("Đang gửi yêu cầu...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    try {
      let imageUrls = [];
      if (data.images && data.images?.length > 0) {
        const res = await house_images.uploadImage(data.images as File[]);
        imageUrls = (res.payload as any).image_url || [];
      }

      const body = {
        house_in: {
          title: data.title,
          images: imageUrls,
        },
        house_detail_in: data.house_detail_in,
      };

      await house_images
        .uploadHouse(body)
        .then((res) => {
          toast.update(toastId, {
            render: "Upload nhà thành công",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch((err) => {
          toast.update(toastId, {
            render: "Upload nhà thất bại",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        });

      history.push("/my-room");
      history.refresh();
    } catch (error) {
      console.log("error", error);

      toast.update(toastId, {
        render: "Upload nhà thất bại",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-[750px] mx-auto"
    >
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <div className="space-y-3 w-full">
            <div className="text-lg text-secondary font-medium">
              Title <span className="text-red-500">*</span>
            </div>
            <OutlinedInput
              id="title"
              {...field}
              fullWidth
              placeholder="Please type here"
              error={!!errors.title}
              sx={{
                borderRadius: 4,
                fieldset: {
                  borderColor: "secondary.main",
                },
              }}
            />
            {errors.title && (
              <FormHelperText error>{errors.title.message}</FormHelperText>
            )}
          </div>
        )}
      />

      <div>
        <FilePond
          files={files}
          onupdatefiles={(files: FilePondFile[]) => {
            setFiles(files.map((file) => file.file as File));
            setValue("images", files.map((file) => file.file) as any);
          }}
          allowMultiple={true}
          instantUpload={false}
        />
      </div>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
        mb={CommonConstants.spacing.verticalPadding}
      >
        Trang thêm thông tin nhà chi tiết
      </Typography>
      <div className="flex justify-end">
        <Button
          variant="outlined"
          sx={{ width: "80px", height: "40px" }}
          type="button"
          onClick={() =>
            prepend({
              rent_time_title: "",
              rent_state: "available",
              duration: 0,
              rent_time_unit: "months",
              price: 0,
              deposit: 0,
              admin_fee: 0,
              benefits: [""],
            })
          }
        >
          Add
        </Button>
      </div>

      {fields.map((field, index) => (
        <div className="" key={field.id}>
          <Button
            variant="contained"
            sx={{ width: "80px", height: "40px" }}
            type="button"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
          <div className="flex flex-col gap-4">
            <div>
              <Controller
                control={control}
                name={`house_detail_in.${index}.rent_time_title`}
                render={({ field }) => (
                  <div className="space-y-3 w-full">
                    <div className="text-lg text-secondary font-medium">
                      Rent time title <span className="text-red-500">*</span>
                    </div>
                    <OutlinedInput
                      id={`house_detail_in.${index}.rent_time_title`}
                      {...field}
                      fullWidth
                      placeholder="Please type here"
                      // error={!!errors.title}
                      sx={{
                        borderRadius: 4,
                        fieldset: {
                          borderColor: "secondary.main",
                        },
                      }}
                    />
                  </div>
                )}
              />
            </div>
            {/* Duaration */}
            <div>
              <Controller
                control={control}
                name={`house_detail_in.${index}.duration`}
                render={({ field }) => (
                  <div className="space-y-3 w-full">
                    <div className="text-lg text-secondary font-medium">
                      Duaration <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      type="text"
                      id={`house_detail_in.${index}.duration`}
                      {...field}
                      fullWidth
                      placeholder="Please type here"
                      error={!!errors.house_detail_in?.[index]?.duration}
                      sx={{
                        borderRadius: 4,
                        fieldset: {
                          borderColor: "secondary.main",
                        },
                      }}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (!isNaN(Number(newValue))) {
                          const numberValue = Number(newValue);
                          field.onChange(numberValue);
                        }
                      }}
                    />
                  </div>
                )}
              />
              {errors?.house_detail_in?.[index]?.duration && (
                <FormHelperText error>
                  {errors?.house_detail_in?.[index]?.duration?.message}
                </FormHelperText>
              )}
            </div>
            {/* Price */}
            <div>
              <Controller
                control={control}
                name={`house_detail_in.${index}.price`}
                render={({ field }) => (
                  <div className="space-y-3 w-full">
                    <div className="text-lg text-secondary font-medium">
                      Price <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      type="text"
                      id={`house_detail_in.${index}.price`}
                      {...field}
                      fullWidth
                      placeholder="Please type here"
                      error={!!errors.house_detail_in?.[index]?.price}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (!isNaN(Number(newValue))) {
                          const numberValue = Number(newValue);
                          field.onChange(numberValue);
                        }
                      }}
                      sx={{
                        borderRadius: 4,
                        fieldset: {
                          borderColor: "secondary.main",
                        },
                      }}
                    />
                    {errors?.house_detail_in?.[index]?.price && (
                      <FormHelperText error>
                        {errors?.house_detail_in?.[index]?.price?.message}
                      </FormHelperText>
                    )}
                  </div>
                )}
              />
            </div>
            {/* Deposit */}
            <div>
              <Controller
                control={control}
                name={`house_detail_in.${index}.deposit`}
                render={({ field }) => (
                  <div className="space-y-3 w-full">
                    <div className="text-lg text-secondary font-medium">
                      Deposit <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      type="text"
                      id={`house_detail_in.${index}.deposit`}
                      {...field}
                      fullWidth
                      placeholder="Please type here"
                      error={!!errors.house_detail_in?.[index]?.deposit}
                      sx={{
                        borderRadius: 4,
                        fieldset: {
                          borderColor: "secondary.main",
                        },
                      }}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (!isNaN(Number(newValue))) {
                          const numberValue = Number(newValue);
                          field.onChange(numberValue);
                        }
                      }}
                    />
                    {errors?.house_detail_in?.[index]?.deposit && (
                      <FormHelperText error>
                        {errors?.house_detail_in?.[index]?.deposit?.message}
                      </FormHelperText>
                    )}
                  </div>
                )}
              />
            </div>
            {/* Admin fee */}
            <div>
              <Controller
                control={control}
                name={`house_detail_in.${index}.admin_fee`}
                render={({ field }) => (
                  <div className="space-y-3 w-full">
                    <div className="text-lg text-secondary font-medium">
                      Admin fee <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      type="text"
                      id={`house_detail_in.${index}.admin_fee`}
                      {...field}
                      fullWidth
                      placeholder="Please type here"
                      error={!!errors.house_detail_in?.[index]?.admin_fee}
                      sx={{
                        borderRadius: 4,
                        fieldset: {
                          borderColor: "secondary.main",
                        },
                      }}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (!isNaN(Number(newValue))) {
                          const numberValue = Number(newValue);
                          field.onChange(numberValue);
                        }
                      }}
                    />
                  </div>
                )}
              />
              {errors?.house_detail_in?.[index]?.admin_fee && (
                <FormHelperText error>
                  {errors?.house_detail_in?.[index]?.admin_fee?.message}
                </FormHelperText>
              )}
            </div>
            {/* Benefit */}
            <div>
              <Benefits control={control} index={index} />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "80px", height: "40px" }}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
