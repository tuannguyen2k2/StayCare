import { Post } from "@/interfaces/blog.interface";
import { formatDate } from "@/utils/helper";
import configureDataTable from "@/utils/helper/ConfigureTableOption";
import { Box } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Action from "./Action";

interface BlogDataTableProps {
  data: Post[] | null;
  onAction:(fetch:boolean)=>void;
}

const BlogDataTable = ({ data, onAction }: BlogDataTableProps) => {

  if (!data) {
    return null;
  }

  const columns: MRT_ColumnDef<Post>[] = [
    {
      accessorKey: "id",
      header: "Id",
      grow: false,
      size: 100,
      Cell: ({ cell }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            p={1}
          >
              {cell.getValue<string>()}
          </Box>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      grow: false,
      size: 100,
      Cell: ({ cell }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            p={1}
          >
              {cell.getValue<string>()}
          </Box>
        );
      },
    },
    {
        accessorKey: "author_name",
        header: "Author",
        Cell: ({ cell }) => {
          return (
            <Box
              display="flex"
              justifyContent="center"
              p={1}
            >
                {cell.getValue<string>()}
            </Box>
          );
        },
      },
    {
      accessorKey: "updated_at",
      header: "Publish Date",
      grow: false,
      size: 80,
      Cell: ({ cell }) => {
         return (
            <Box 
              display="flex"
              justifyContent="center"
              p={1}
            >
                {formatDate(cell.getValue<string>(), 'dd/MM/yyyy')}
            </Box>
          );
        },
     },
    {
      accessorKey: "actions",
      header: "Actions",
      grow: false,
      size: 100,
      muiTableBodyCellProps: { style: { overflow: 'unset' } },
      Cell: ({ cell }) => (
        <div className="flex justify-center">
          <Action id={cell.row.original.id} slug={cell.row.original.slug} onAction={(e)=>onAction(e)}/>
        </div>
      ),
    },
  ];

  const table = useMaterialReactTable(
    configureDataTable<Post>(columns, data)
  );

  return (
    <Box className='table-has-overFlow' border={1} borderRadius={2} borderColor="divider" >
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default BlogDataTable;
