"use client";
import { ContractStatus } from "@/common/models/ContractStatus";
import { IContract, IContractUpdate } from "@/interfaces/contract.interface";
import UploadContract from "@/modules/contract-manage/components/UploadContract";
import { formatCurrency } from "@/utils/helper";
import configureDataTable from "@/utils/helper/ConfigureTableOption";
import { Visibility } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { Box, IconButton } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useState } from "react";

interface ContractDataTableProps {
  // data: IContract[];
  data: IContractUpdate[];
}

const ContractDataTable = ({ data }: ContractDataTableProps) => {
  console.log("data", data);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const handleOpen = () => setOpen(true);
  const handleUploadContract = (id: number) => {
    handleOpen();
    setId(id);
  };
  const columns: MRT_ColumnDef<IContractUpdate>[] = [
    {
      accessorKey: "type_room",
      header: "Type of Room",
      Cell: ({ cell }) => (
        <div className="flex justify-center items-center">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "package",
      header: "Package Name",
      Cell: ({ cell }) => (
        <div className="flex justify-center items-center">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "pay_money",
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
      accessorKey: "start_date",
      header: "Start Date",
      Header: ({ column }) => <div>{column.columnDef.header}</div>,
      Cell: ({ cell }) => (
        <div className="flex justify-center items-center">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      Header: ({ column }) => <div>{column.columnDef.header}</div>,
      Cell: ({ cell }) => (
        <div className="flex justify-center items-center">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      grow: false,
      size: 100,
      Cell: ({ cell }) => {
        // const status = ContractStatus.fromId(cell.getValue<number>());
        return (
          // <Box
          //   display="flex"
          //   justifyContent="center"
          //   bgcolor={status?.color}
          //   color="white"
          //   p={1}
          //   borderRadius={3}
          // >
          //   {status?.name}
          // </Box>
          <div className="flex justify-center items-center">
            {cell.getValue<string>()}
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      grow: false,
      size: 100,
      Cell: ({ cell }) => (
        <div className="flex justify-center gap-2">
          <IconButton
            size="small"
            onClick={
              () => window.open(`${cell.row.original.file_pdf}`, "_blank")
              // console.log(`View contract ID: ${cell.row.original.id}`)
            }
          >
            <Visibility />
          </IconButton>
          {!cell.row.original.file_pdf && (
            <IconButton
              size="small"
              onClick={() =>
                // console.log(`View contract ID: ${cell.row.original.id}`)
                handleUploadContract(cell.row.original.id)
              }
            >
              <UploadIcon />
            </IconButton>
          )}
        </div>
      ),
    },
  ];

  const table = useMaterialReactTable(
    configureDataTable<IContractUpdate>(columns, data)
  );

  return (
    <Box border={1} borderRadius={2} borderColor="divider" overflow="hidden">
      <MaterialReactTable table={table} />
      <UploadContract open={open} setOpen={setOpen} id={id} setId={setId} />
    </Box>
  );
};

export default ContractDataTable;
