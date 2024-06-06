import http from "@/utils/http"
import dayjs from "dayjs";
interface IMemberProps {
    name : string;
    birth :string;
    phone : string;
    nationality : string;
    identification : string;
    email : string;
    country_code : string;

}
interface IPostPayment {
    house_detail_id : number;
    start_date : string;
    end_date : string;
    due_date : string;
    penalty_date : string;
    pay_money : number;
    package : string;
    members : IMemberProps[];
}
export const payment = {
    postPayment : async (params : IPostPayment) => {
        const body = {
            house_detail_id : Number(params.house_detail_id),
            start_date : dayjs(params.start_date).format("YYYY-MM-DD"),
            end_date : dayjs(params.end_date).format("YYYY-MM-DD"),
            due_date : dayjs(params.due_date).format("YYYY-MM-DD"),
            penalty_date : dayjs(params.penalty_date).format("YYYY-MM-DD"),
            pay_money : Number(params.pay_money),
            package : params.package,
            members : params.members.map((member) => {
                return {
                    ...member,
                    birth : dayjs(member.birth).format("YYYY-MM-DD") ?? new Date(),
                }
            }),
        }
      
        
        return await http.post(`/payments/checkout`,JSON.stringify(body), {})
    }
}