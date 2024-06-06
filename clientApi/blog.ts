import { IBlogEditForm, IBlogForm } from "@/interfaces/blog.interface";
import { convertBodyData } from "@/utils/helper";
import http from "@/utils/http";

export const blogApi = {
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

    getListPost: async (body: { params:string }) => {
      return await http.get(`/posts/getListPost${body.params}`, {
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

    getPostDetails: async ({slug}: {slug:string }) => {
      return await http.get(`/posts/getPost?slug=${slug}`,{
        headers: {
          "Content-Type": "application/json", 
        },
      }) 
    },

    updatePost: async ({body, id}:{body: IBlogEditForm, id:string} ) => {
      const newBody = JSON.stringify(body);
      return await http.put(`/posts/edit?slug=${id}`,newBody, {
        headers: {
          "Content-Type": "application/json", 
        },
      }) 
    },

    deletePost: async ({id}: {id:number }) => {
      return await http.delete(`/posts/delete?post_id=${id}`,{
        headers: {
          "Content-Type": "application/json", 
        },
      }) 
    },
    
    postComment: async (body: {post_id:number, data: { content:string, parent_comment_id: number|null}})=>{
      const newBody = JSON.stringify(body.data);
      return await http.post(`/posts/comments?post_id=${body.post_id}`,newBody, {
        headers: {
          "Content-Type": "application/json", 
        },
      }) 
    },
    
    likeComment: async ({id}:{ id:number} ) => {
      return await http.put(`/posts/like?comment_id=${id}`, {
        headers: {
          "Content-Type": "application/json", 
        },
      }) 
    },
};
