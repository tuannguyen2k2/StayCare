import http from "@/utils/http";

export const house_images = {
    uploadImage : async(body : File[]) => {
        const formData = new FormData();
        body.forEach((file) => {
            formData.append("file",file);
        });
        return await http.post("/houses/free-image",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
              },
        })
    },
    uploadHouse : async(body : any) => {
        const parseBody = JSON.stringify(body);
        return await http.post("/houses",parseBody,{
            headers: {
                "Content-Type": "application/json",
              },
        })
    }
}