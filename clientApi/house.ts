import http from "@/utils/http"
import { headers } from "next/headers"

export const house = {
    getHouse : async (page : number) => {
        return await http.get(`/houses?page=${page ?? 1}&limit=4`,{
            headers: {
                "Content-Type": "application/json", 
              },
        })
    },
    getDetailHouse : async (slug : string) => {
        return await http.get(`houses/${slug}`,{
            headers: {
                "Content-Type": "application/json", 
              }
        })
    }
}