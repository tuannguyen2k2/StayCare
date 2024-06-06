import { INavigate } from "@/interfaces/navigate.interface";
import {
  ContentCopyRounded,
  DriveFileRenameOutlineRounded,
  EditNoteRounded,
  HomeRounded,
  PaymentsRounded,
  GroupRounded,
} from "@mui/icons-material";
import HouseIcon from "@mui/icons-material/House";
export const NavRoutes: INavigate[] = [
  {
    to: "/home",
    label: "Home",
  },
  {
    to: "/contact-us",
    label: "Contact Us",
  },
  {
    to: "/blogs",
    label: "Blog",
  },
  {
    to: "/my-room?page=1",
    label: "My Room",
  },
];

export const AdminNavRoutes: INavigate[] = [
  {
    to: "/my-room",
    label: "My Room",
    icon: <HomeRounded />,
  },
  {
    to: "/contract-manage",
    label: "Contract Manage",
    icon: <EditNoteRounded />,
  },
  {
    to: "/add-home",
    label: "House Manage",
    icon: <HouseIcon />,
  },
  {
    to: "/payment",
    label: "Payment",
    icon: <PaymentsRounded />,
  },
];

export const AdminNavBlogRoute: INavigate[] = [
  {
    to: "/blog-create",
    label: "Blog Creator",
    icon: <DriveFileRenameOutlineRounded />,
  },
  {
    to: "/blog-manage",
    label: "Blog List",
    icon: <ContentCopyRounded />,
  },
];
