import SideBar from "@/common/components/sidebar";
import { CommonConstants } from "@/utils/constants";

import { PropsWithChildren } from "react";

function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen">
      <SideBar />
      {children}
    </div>
  );
}

export default AdminLayout;
