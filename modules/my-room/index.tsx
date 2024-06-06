"use client";
import { ContractStatus } from "@/common/models/ContractStatus";
import { IContract, IContractUpdate } from "@/interfaces/contract.interface";
import { IRoomData } from "@/interfaces/room.interface";
import PaginationBlog from "@/modules/blog-manage/components/Pagination";
import UploadContract from "@/modules/contract-manage/components/UploadContract";
import ModalDelete from "@/modules/my-room/ModalDelete";
import ModalLock from "@/modules/my-room/ModalLock";
import { formatCurrency } from "@/utils/helper";
import configureDataTable from "@/utils/helper/ConfigureTableOption";
import { filterFalsyValues } from "@/utils/helper/filtersearch";
import { Visibility } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type Condition = {
  page?: number;
  status?: string;
  type?: string;
};
interface ContractDataTableProps {
  data: IRoomData[];
  totalPage: number;
  searchParams: Condition;
}

const MyRoomTable = ({
  data,
  totalPage,
  searchParams,
}: ContractDataTableProps) => {
  const [conditions, setConditions] = useState<Condition>({
    page: searchParams.page ?? 1,
    status: searchParams.status,
    type: searchParams.type,
  });
  const router = useRouter();
  const updatePath = (condition: Condition) => {
    const truthyConditions = filterFalsyValues<Condition>(condition);
    const formattedConditions = Object.entries(truthyConditions).map(
      ([key, value]) => `${key}=${value}`
    );
    router.push(`/my-room?${formattedConditions.join("&")}`);
  };

  const [open, setOpen] = React.useState(false);
  const [openLock, setOpenLock] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [idLock, setIdLock] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const handleOpen = () => setOpen(true);
  const handleOpenLock = () => setOpenLock(true);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    updatePath({ ...conditions, page: value });
  };
  const handleShowModal = (data: number) => {
    setId(data!);
    handleOpen();
  };
  const handleShowModalLock = (val: number, status: string) => {
    setStatus(status);
    setIdLock(val!);
    handleOpenLock();
  };

  const columns: MRT_ColumnDef<IRoomData>[] = [
    {
      accessorKey: "title",
      header: "Title",
      Cell: ({ cell }) => (
        <div className="flex justify-center items-center">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "rent_time_title",
      header: "Rent time title",
      Cell: ({ cell }) => (
        <div className="flex justify-center items-center">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      grow: false,
      size: 80,
      Cell: ({ cell }) => (
        <div className="flex justify-center items-center">
          {formatCurrency(cell.getValue<number>())}
        </div>
      ),
    },

    {
      accessorKey: "rent_state",
      header: "Rent state",
      grow: false,
      size: 100,
      Cell: ({ cell }) => (
        <div className="flex justify-center items-center">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      grow: false,
      size: 100,
      Cell: ({ cell, row }) => (
        <div className="flex justify-center gap-4 items-center">
          <FormControl sx={{ width: 100 }}>
            {/* <InputLabel id="demo-simple-select-label">action</InputLabel>
            <Select value={age} label="action" onChange={handleChange}>
              <MenuItem value={10}>Ten</MenuItem>
            </Select> */}
            {row.original.is_lock ? (
              <Button
                sx={{ backgroundColor: "gray", color: "black" }}
                onClick={() => handleShowModalLock(row.original.id, "lock")}
              >
                Lock
              </Button>
            ) : (
              <Button
                onClick={() => handleShowModalLock(row.original.id, "unlock")}
                variant="contained"
              >
                Unlock
              </Button>
            )}
          </FormControl>
          <IconButton
            onClick={() => handleShowModal(row.original.id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const cond: Condition = {
      page: searchParams.page ?? 1,
      status: searchParams.status ?? undefined,
      type: searchParams.type ?? undefined,
    };
    setConditions(cond);
  }, [searchParams]);
  const table = useMaterialReactTable(
    configureDataTable<IRoomData>(columns, data)
  );

  return (
    <Box border={1} borderRadius={2} borderColor="divider" overflow="hidden">
      <MaterialReactTable table={table} />
      <Pagination
        onChange={handleChangePage}
        page={Number(searchParams.page) ?? 1}
        count={totalPage}
        variant="outlined"
        shape="rounded"
        sx={{ marginY: "24px", display: "flex", justifyContent: "center" }}
      />
      <ModalDelete open={open} setOpen={setOpen} id={id} setId={setId} />
      <ModalLock
        open={openLock}
        setOpen={setOpenLock}
        id={idLock}
        setId={setIdLock}
        status={status}
      />
    </Box>
  );
};

export default MyRoomTable;
