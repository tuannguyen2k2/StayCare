"use client";
import { RoomType } from "@/common/models/RoomType";
import { CommonConstants } from "@/utils/constants";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import RoomTypeCard from "../components/RoomTypeCard";
import { house } from "@/clientApi/house";
import { useEffect, useRef, useState } from "react";
import { ICustomRoom } from "@/interfaces/room.interface";
import { ANIMATION_REVEAL_ELEMENT } from "@/utils/common";

function RoomTypeList() {
  const [dataHouse, setDataHouse] = useState<ICustomRoom[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const contentWidth = CommonConstants.dimensions.contentWidth;
  const boxRef = useRef(null);
  const getHouse = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/houses`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setDataHouse(data.data);
      setTotalPage(data.metadata.total_page);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHouse();
  }, [page]);
  console.log("page", page);

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={"40px"}
    >
      <Box
        width={contentWidth}
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={7}
      >
        <Box
          ref={boxRef}
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          gap={2}
          mb={7}
        >
          <Typography variant="h4" fontWeight="bold" color="secondary">
            ROOMS AND RATES
          </Typography>

          <Typography variant="subtitle2" color="secondary">
            Excludes utilities & guardianship services (non-legal)
          </Typography>
        </Box>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box width="100%" display="flex" flexDirection="column" gap={5}>
              <Grid container spacing={2}>
                {dataHouse.length > 0 &&
                  dataHouse?.map((room, index) => (
                    <Grid
                      item
                      xs={6}
                      className={ANIMATION_REVEAL_ELEMENT.LEFT_TO_RIGHT.default}
                      key={room.id}
                      sx={{
                        pl:
                          index % 2 !== 0 ? "36px!important" : "16px!important",
                        mb: "20px!important",
                      }}
                    >
                      <RoomTypeCard room={room} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default RoomTypeList;
