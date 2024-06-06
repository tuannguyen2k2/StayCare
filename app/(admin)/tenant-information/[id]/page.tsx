"use client";
import Contact from "@/app/(admin)/tenant-information/components/Contact";
import { contract } from "@/clientApi/contract";
import { payment } from "@/clientApi/payment";
import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function TenantInformation({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const countNumber = searchParams.get("count_number") ?? 1;
  const date = searchParams.get("date") ?? dayjs().format("YYYY-MM-DD");
  const [information, setInformation] = useState({
    due_date: "",
    end_date: "",
    package: "",
    penalty_date: "",
    start_date: "",
    pay_money: 0,
  });
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      tenants: Array.from({ length: Number(countNumber) }, () => ({
        name: "",
        age: "",
        nationality: "",
        identification: "",
        contacts: [],
      })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tenants",
  });
  console.log("information", information);

  const contractCheck = async () => {
    setIsLoading(true);
    try {
      const res = await contract.checkContract({
        house_detail_id: Number(id),
        start_date: date,
      });

      setInformation(
        res.payload as {
          due_date: string;
          end_date: string;
          pay_money: number;
          penalty_date: string;
          start_date: string;
          package: string;
        }
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    contractCheck();
  }, []);

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Đang gửi yêu cầu...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    const member = data.tenants.map((tenant: any) => {
      return {
        name: tenant.name,
        birth: tenant.age,
        nationality: tenant.nationality,
        identification: tenant.identification,
        email: tenant?.contacts[0]?.email ?? "",
        country_code: tenant.contacts[0]?.code ?? "",
        phone: tenant?.contacts[0]?.phone ?? "",
      };
    });
    const body = {
      members: member,
      house_detail_id: Number(id),
      start_date: date,
      end_date: information.end_date,
      due_date: information.due_date,
      penalty_date: information.penalty_date,
      pay_money: information.pay_money,
      package: information.package,
    };
    try {
      const res = await payment.postPayment(body);
      toast.update(toastId, {
        render: "Thanh toán nhà thành công",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      window.open(
        (res.payload as { checkout_session_url: string }).checkout_session_url,
        "_blank"
      );
    } catch (error) {
      toast.update(toastId, {
        render: "Thanh toán nhà thất bại",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }

    console.log("member", member);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <form
          className="w-full max-w-[950px] mx-auto my-12 flex flex-col gap-14 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" w-full max-w-[950px]">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-col gap-6 p-6 items-center w-full max-w-[950px] border border-solid border-[#F7961D]">
                <h2 className="m-0 text-[#F7961D] text-2xl font-bold mt-4">
                  Thông tin chi tiết
                </h2>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2 items-center w-[250px]">
                    <p className="font-bold text-lg w-[130px]">Ngày bắt đầu:</p>
                    <span className="font-normal">
                      {information.start_date}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center w-[250px]">
                    <p className="font-bold text-lg w-[130px]">
                      Ngày kết thúc:
                    </p>
                    <span className="font-normal">{information.end_date}</span>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center w-[250px]">
                    <p className="font-bold text-lg w-[130px]">Ngày hết hạn:</p>
                    <span className="font-normal">{information.due_date}</span>
                  </div>
                  <div className="flex gap-2 items-center w-[250px]">
                    <p className="font-bold text-lg w-[140px]">
                      Ngày đóng phạt:
                    </p>
                    <span className="font-normal">
                      {information.penalty_date}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 items-center w-[250px]">
                  <p className="font-bold text-lg w-[100px]">Tiền tổng:</p>
                  <span className="font-normal">{`S$${information.pay_money}`}</span>
                </div>
              </div>
            )}
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-solid border-[#F7961D] w-full px-5 rounded-md flex flex-col gap-8 items-center"
            >
              <h2 className="m-0 text-[#F7961D] text-lg mt-4">{`Person ${index + 1}`}</h2>
              <Controller
                name={`tenants.${index}.name`}
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <TextField
                      {...field}
                      sx={{ width: "100%" }}
                      className="w-full"
                      label="Fullname"
                      variant="outlined"
                    />
                  </div>
                )}
              />
              <Controller
                name={`tenants.${index}.age`}
                control={control}
                render={({ field }) => (
                  <>
                    <DatePicker
                      value={dayjs(field.value)}
                      onChange={(date: any) =>
                        field.onChange(date?.format("YYYY-MM-DD HH:mm:ss"))
                      }
                      label="Ngày sinh"
                      className="w-full"
                    />
                  </>
                )}
              />
              <Controller
                name={`tenants.${index}.nationality`}
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <TextField
                      {...field}
                      sx={{ width: "100%" }}
                      className="w-full"
                      label="Nationality"
                      variant="outlined"
                    />
                  </div>
                )}
              />
              <Controller
                name={`tenants.${index}.identification`}
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <TextField
                      {...field}
                      sx={{ width: "100%" }}
                      className="w-full"
                      label="Identification"
                      variant="outlined"
                    />
                  </div>
                )}
              />
              <div className="w-full">
                <Contact control={control} index={index} />
              </div>
            </div>
          ))}

          <div className="flex justify-end items-end w-full mb-6">
            <Button type="submit" variant="contained" className="mb-6">
              CONFIRM
            </Button>
          </div>
        </form>
      </>
    </LocalizationProvider>
  );
}
