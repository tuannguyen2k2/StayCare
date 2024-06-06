import { parseISO, format } from 'date-fns';
import { EntityError } from "@/interfaces/response.interface";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";
import Cheerio  from 'cheerio';

export const formatCurrency = (amount: number) => {
  return amount?.toLocaleString("en-US", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};

export const handleHttpError = ({
  error,
  setError,
}: {
  error: any;
  setError?: UseFormSetError<any>;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((e) => {
      setError(e.field, {
        type: "server",
        message: e.message,
      });
    });
  } else {
    toast.error(error.message ?? "Unknown error");
  }
};

export const convertBodyData = ({
  data,
  contentType = "application/json",
}: {
  data: any;
  contentType: string;
}) => {
  if (contentType === "application/json") {
    console.log("data in convert", data);
    return JSON.stringify(data);
  } else if (contentType === "multipart/form-data") {
    const formData = new FormData();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((item: any) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, data[key]);
      }
    }
    return formData;
  } else if (contentType === "application/x-www-form-urlencoded") {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  } else {
    throw new Error("Invalid content type");
  }
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const formatDate = (date:string, fomatType:string) => {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, fomatType);
  return formattedDate;
}

export const getStringContent = (htmlString: string)=>{
  const $ = Cheerio.load(htmlString);
  const paragraphs: string[] = [];
  $('p').each((index, element) => {
    paragraphs.push($(element).text().trim());
  });
  if(paragraphs.length === 0){
    return htmlString;
  }
  return paragraphs;
}