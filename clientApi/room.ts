import http from "@/utils/http";

export const room = {
  getListRoom : async (page : number, status: string,type : string) => {
      let url = `/houses/admin?page=${page ?? 1}&limit=10`;
      if (status) {
          url += `&status=${status}`;
      }
      if (type) {
          url += `&type=${type}`;
      }
      return await http.get(url, {
          headers: {
            "Content-Type": "application/json", 
          },
        }) 
  },
  deleteRoom : async (id : number) => {
    const body = {
      id_ : id
    }
      return await http.delete(`/houses/detail/${id}`,JSON.stringify(body), {
          headers: {
            "Content-Type": "application/json", 
          },
        })
  },
    updateLock : async (id :number,status : boolean) => {
    const body = {
      is_lock : status
    }
      return await http.put(`/houses/detail/${id}`,JSON.stringify(body), {
          headers: {
            "Content-Type": "application/json", 
          },
        })
  }
}