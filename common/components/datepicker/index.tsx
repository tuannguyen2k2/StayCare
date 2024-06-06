"use client";
import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RoomIcon from "@mui/icons-material/Room";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import { filterFalsyValues } from "@/utils/helper/filtersearch";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/common/components/searchbar";
import debounce from "lodash.debounce";
type Condition = {
  page?: number;
  status?: string;
  type?: string;
};
interface CommonSearchDayProps {
  searchParams: Condition;
}
export default function CommonSearchDay(props: CommonSearchDayProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const [age, setAge] = React.useState("");
  const [conditions, setConditions] = useState<Condition>({
    page: props.searchParams.page ?? 1,
    status: props.searchParams.status,
    type: decodeURIComponent(props.searchParams.type ?? ""),
  });
  const router = useRouter();
  const updatePath = (condition: Condition) => {
    const truthyConditions = filterFalsyValues<Condition>(condition);
    const formattedConditions = Object.entries(truthyConditions).map(
      ([key, value]) => `${key}=${value}`
    );
    router.push(`/my-room?${formattedConditions.join("&")}`);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    updatePath({ ...conditions, status: event.target.value });
  };
  const handleSearchChange = debounce((value: string | null) => {
    updatePath({ ...conditions, type: value ?? "" });
  }, 500);
  useEffect(() => {
    const cond: Condition = {
      status: props.searchParams.status ?? undefined,
      page: 1,
      type: props.searchParams.type ?? undefined,
    };
    setConditions(cond);
  }, [props.searchParams]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex gap-4 mb-9">
        {/* <DatePicker
          label="Ngày đi"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <DatePicker
          label="Ngày về"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        /> */}
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="demo-simple-select-label">Type of room</InputLabel>
          <Select
            value={age}
            label="Type of room"
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <Image
                  src={"/images/icons/type_room.svg"}
                  alt="icon"
                  width={16}
                  height={16}
                />
              </InputAdornment>
            }
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"available"}>Available</MenuItem>
            <MenuItem value={"ordered"}>Ordered</MenuItem>
            <MenuItem value={"renting"}>Renting</MenuItem>
          </Select>
        </FormControl>
        <SearchBar onChange={handleSearchChange} />
      </div>
    </LocalizationProvider>
  );
}
