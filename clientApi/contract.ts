import { IBlogForm } from "@/interfaces/blog.interface";
import { IContractUpload } from "@/interfaces/contract.interface";
import { convertBodyData } from "@/utils/helper";
import http from "@/utils/http";

export const contract = {
  createBlog: (body: IBlogForm) =>
    http.post(
      "/posts",
      convertBodyData({
        data: body,
        contentType: "multipart/form-data",
      }),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),

    getListContract: async () => {
      return await http.get(`/contracts/admin?page=1&limit=9`, {
        headers: {
          "Content-Type": "application/json", 
        },
      }) 
    },
    searchPost: async (body: { params:string }) => {
      return await http.get(`/posts/search${body.params}`, {
        headers: {
          "Content-Type": "application/json", 
        },
      }) 
    },
    uploadContract : async (body: IContractUpload) => {
      const formData = new FormData();
      // Add data to formData
      // formData.append("contract_id", body.contract_id.toString());
      formData.append("file_pdf", body.file_pdf);
        return await http.post(`/contracts/template/new?contract_id=${body.contract_id.toString()}`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
    },
    checkContract : async (params: { house_detail_id: number,start_date : string}) => {
      const body = {
        house_detail_id : params.house_detail_id,
        start_date :  new Date(params.start_date)
      
      }
      return await http.post(`/contracts/check`,JSON.stringify(body), {
        
      
      })
    }
};