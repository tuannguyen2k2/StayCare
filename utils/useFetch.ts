type ApiResponse<T> = {
    code: number
    message: "SUCCESS" | "FAILED"
    data?: T
    metadata?: any
}

export const useFetch = async<T> ({url, data, method = "GET", headerOptions } : {url: string, data?: any, method?: 'GET' | 'POST', headerOptions?: {
    Authorization: string,
}} ) : Promise<ApiResponse<T>> => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${BASE_URL}${url}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...headerOptions
        },
        body: JSON.stringify(data),
    })

    return response ? await response.json() : { code: 500, message: "FAILED", data: null};
}