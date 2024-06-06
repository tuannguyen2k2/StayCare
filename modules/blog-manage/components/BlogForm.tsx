"use client";
import dynamic from "next/dynamic";
import { CommonConstants } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormHelperText, OutlinedInput } from "@mui/material";
import { FilePondFile } from "filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { blogApi } from "@/clientApi/blog";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BaseResponse } from "@/interfaces/response.interface";
import { BlogPost } from "@/interfaces/blog.interface";

const TextEditor = dynamic(() => import("@common/components/text-editor"), {
  ssr: false,
});

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author_name: z.string(),
  content: z.string().min(1, "Content is required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
});

const BlogForm = ({type}:{type:string}) => {
  const Router = useRouter();
  const [titleImage, settitleImage] = useState<File[]>([]);
  const [id, setId] = useState<number | null>(null);

  const editorRef = useRef<any>();
  const imageRef = useRef<any>();

  const {
    control,
    trigger,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author_name: "",
      content: "",
      images: [],
    },
  });

  const handleSubmitForm = async (is_draft: boolean) => {
    await trigger(undefined, { shouldFocus: true });
    if (isValid) {
      const data = getValues();
      const toastId = toast.loading( type !=='edit' ? "Uploading blog..." : "Uploading Edit blog...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      if(type === 'edit') {
        if(id === null) return
        const dataEdit =  {
          title: data.title,
          content: data.content,
          author_name: data.author_name,
          tags: [],
          is_feature: true
        }
        await blogApi.updatePost({ body:dataEdit, id: id.toString()  }).then((res) => {
          if (res.status) {
            toast.update(toastId, {
              render: "Blog updated successfully",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            Router.back();
          }
        }).catch((err) => {
          toast.update(toastId, {
            render: "Failed to upload blog",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        });
      }

      if(type === 'create') {
        await blogApi
        .createBlog(data)
        .then((res) => {
          if (res.status) {
            toast.update(toastId, {
              render: "Blog uploaded successfully",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            handleClearForm();
          } else {
            toast.update(toastId, {
              render: "Failed to upload blog",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        })
        .catch((err) => {
          toast.update(toastId, {
            render: "Failed to upload blog",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        });
      }
    }
  };

  useEffect(() => {
    const firstError: string = Object.keys(errors)[0];
    if (firstError) {
      if (firstError === "images") {
        imageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      } else if (firstError === "content") {
        const element = document.getElementsByClassName("ck ck-editor")[0];
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
          editorRef.current.focus();
        }
      } else {
        const element = document.getElementById(firstError);
        element?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [errors]);
  
  const handleClearForm = () => {
    setValue("title", "");
    setValue("author_name", "");
    setValue("content", "");
    setValue("images", []);
    settitleImage([]);
  };

  useEffect(() => {
    if (type === "edit") {
      const searchParams = new URLSearchParams(window.location.search).get('slug');
      if(searchParams === null) return
      blogApi.getPostDetails({ slug: searchParams }).then((data) => {
        let dataResponse: BaseResponse<BlogPost> = data.payload as BaseResponse<BlogPost>;
        setId(dataResponse.data.id);
        setValue("title", dataResponse.data.title);
        setValue("author_name", dataResponse.data.author_name);
        setValue("content", dataResponse.data.content);
        setValue("images", dataResponse.data.images);
        settitleImage(dataResponse.data.images.map((image) => new File([image], getNameImage(image))));
      }).catch((error) => {
        console.error(error);
      });
      // Fetch data to edit
      
    }
  }, []);

  const getNameImage = (images: string) => {
    const parts: string[] = images.split('/');
    return parts[parts.length - 1];
  }

  return (
    <form className="w-full flex flex-col gap-8">
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

      <Controller
        control={control}
        name="author_name"
        render={({ field }) => (
          <div className="space-y-3 w-full">
            <div className="text-lg text-secondary font-medium">
              Author name <span className="text-red-500">*</span>
            </div>
            <OutlinedInput
              {...field}
              fullWidth
              placeholder="Please type here"
              error={!!errors.author_name}
              sx={{
                borderRadius: 4,
                fieldset: {
                  borderColor: "secondary.main",
                },
              }}
            />
            {errors.author_name && (
              <FormHelperText error>
                {errors.author_name.message}
              </FormHelperText>
            )}
          </div>
        )}
      />

      {type === 'create' && (
        <div className="w-full flex flex-col gap-3">
          <div className="text-lg text-secondary font-medium" ref={imageRef}>
            Featured Image <span className="text-red-500">*</span>
          </div>
          <FilePond
            required
            files={titleImage}
            onupdatefiles={(files: FilePondFile[]) => {
              settitleImage(files.map((file) => file.file as File));
              setValue(
                "images",
                files.map((file) => file.file as File)
              );
            }}
            allowMultiple={false}
            instantUpload={false}
            credits={false}
            name="images"
          />
          {errors.images && (
            <FormHelperText error>{errors.images.message}</FormHelperText>
          )}
        </div>
      )}

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <div className="w-full">
            <div className="text-lg text-secondary font-medium">
              Content <span className="text-red-600">*</span>
            </div>
            <Box
              borderRadius={4}
              height="800px"
              bgcolor="white"
              sx={{
                ".ck-editor__editable": {
                  height: "722px",
                  overflow: "auto",
                },
              }}
            >
              <TextEditor
                {...field}
                propRef={editorRef}
                noEdit={false}
                initialData={field.value || ""}
                onChange={(data) => {
                  setValue("content", data);
                }}
                uploadImageRequestHeader={{
                  "Content-Type": "application/x-www-form-urlencoded",
                }}
                uploadImageRequestUrl={
                  CommonConstants.apiUrl + "/images"
                }
              />
            </Box>
            {errors.content && (
              <FormHelperText error>{errors.content.message}</FormHelperText>
            )}
          </div>
        )}
      />

      <div className="flex justify-end gap-10 my-10">
        {type === 'create' && (
          <Button
            variant="outlined"
            component={Link}
            href="/blog-manage"
            sx={{
              borderRadius: 4,
              width: "200px",
            }}
          >
            Cancel
          </Button>
        )}
        {type === 'edit' && (
          <Button
            variant="outlined"
            sx={{
              borderRadius: 4,
              width: "200px",
            }}
            onClick={() => Router.back()}
          >
            Cancel
          </Button>
        )}

        {/* <Button
          variant="outlined"
          onClick={() => handleSubmitForm(true)}
          sx={{
            borderRadius: 4,
            width: "200px",
          }}
        >
          Save as Draft
        </Button> */}

        <Button
          variant="outlined"
          onClick={() => handleSubmitForm(false)}
          sx={{
            borderRadius: 4,
            width: "200px",
          }}
        >
          Upload
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
