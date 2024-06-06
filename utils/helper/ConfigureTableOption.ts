import { Theme } from "@mui/material";
import {
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableOptions,
} from "material-react-table";

const configureDataTable = <TData extends MRT_RowData>(
  columns: MRT_ColumnDef<TData>[],
  data: TData[]
): MRT_TableOptions<TData> => {
  return {
    columns: columns,
    data: data,
    enablePagination: false,
    enableColumnFilterModes: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableFullScreenToggle: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    mrtTheme: (theme: Theme) => ({
      baseBackgroundColor: theme.palette.background.default,
    }),
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableProps: {
      sx: {
        boxShadow: "none",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderBottom: "none",
      },
    },
    muiTableHeadCellProps: {
      align: "center",
      sx: {
        borderBottom: 2,
        color: "secondary.main",
        justifyContent: "center",
      },
    },
  };
};

export default configureDataTable;
