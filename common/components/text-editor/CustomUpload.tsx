import { getServerAuthCookies } from "@/utils/cookies";
import { FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository";

export class CustomUploader {
  loader: FileLoader; // Add loader property
  uploadImageRequestUrl: string;

  constructor(loader: FileLoader, uploadImageRequestUrl: string) {
    this.loader = loader;
    this.uploadImageRequestUrl = uploadImageRequestUrl;
  }

  upload = async () => {
    try {
      console.log("Uploading image...");

      let formData = new FormData();

      const file = await this.loader.file;

      let fileUrl;

      if (file) {
        formData.append("images", file);
        // fileUrl = URL.createObjectURL(file);
      }

      const response = await fetch(this.uploadImageRequestUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${(await getServerAuthCookies()).accessToken?.value}`,
          Accept: "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      console.log('result',result)
      return {
        default: result?.data[0] || fileUrl,
        // default: fileUrl,
      };
    } catch (error) {
      console.error("Upload failed", error);
      throw error;
    }
  };

  abort() {
    console.log("Upload aborted");
  }
}
