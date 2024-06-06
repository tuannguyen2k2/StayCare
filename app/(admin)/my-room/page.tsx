import { room } from "@/clientApi/room";
import CommonButton from "@/common/components/button";
import CommonSearchDay from "@/common/components/datepicker";
import { IContract } from "@/interfaces/contract.interface";
import { IRoomData } from "@/interfaces/room.interface";
import MyRoomTable from "@/modules/my-room";
import { CommonConstants } from "@/utils/constants";
import { Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";

type PageParams = {
  searchParams: {
    page?: number;
    status: string;
    type: string;
  };
};

async function ManageRoom(props: PageParams) {
  const data = await room.getListRoom(
    props.searchParams.page ?? 1,
    props.searchParams.status,
    props.searchParams.type
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: CommonConstants.spacing.verticalPadding,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="secondary"
        mb={CommonConstants.spacing.verticalPadding}
      >
        Room List
      </Typography>
      <div className="flex gap-9">
        <CommonSearchDay searchParams={props.searchParams} />
      </div>
      <div className="flex justify-end mb-8">
        <CommonButton
          url="/add-home"
          titleName="Add New Room"
          iconImg="/images/icons/plus.svg"
        />
      </div>
      <MyRoomTable
        data={(data.payload as any).data}
        totalPage={(data.payload as any).metadata.total_page}
        searchParams={props.searchParams}
      />
    </Container>
  );
}
export default ManageRoom;
