"use client";

import { ICustomRoom, IRoom } from "@/interfaces/room.interface";
import { formatCurrency } from "@/utils/helper";
import { AddCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Image from "@/common/components/image";
import Link from "next/link";
import { useDotButton } from "@/common/hook/useCarouselDotButtons";
import DotButton from "@/common/components/dot-button";

const ImageCarousel = ({ imageList }: { imageList: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <Box ref={emblaRef} overflow="hidden" height="100%" position="relative">
      <Box display="flex" height="100%">
        {imageList.map((image, index) => (
          <Box
            key={index}
            flex="0 0 100%"
            height="100%"
            width="100%"
            minWidth={0}
            position="relative"
          >
            <Image
              src={image}
              alt="room"
              fill
              style={{
                objectFit: "cover",
                width: "100%",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px"
                // height: "100%",
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        position="absolute"
        bottom={5}
        width="100%"
        display="flex"
        justifyContent="center"
        gap={1}
      >
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            seleted={selectedIndex === index}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </Box>
    </Box>
  );
};
interface IRoomTypeCard {
  room: ICustomRoom;
}

function RoomTypeCard(props: IRoomTypeCard) {
  return (
    <Box
      height={600}
      width="100%"
      display="flex"
      flexDirection="column"
      borderRadius={2}
      borderColor="secondary.main"
      boxShadow={"0px 10px 10px rgba(0, 0, 0, 0.3);"}
    >
      <Box height={400} width="100%">
        <ImageCarousel imageList={props.room?.images ?? []} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        bgcolor="secondary.main"
        py={2}
      >
        <Typography variant="h5" fontWeight="bold" color="white">
          {props.room?.title}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexGrow={1}
        p={2}
      >
        <Button
          startIcon={
            <AddCircle
              style={{
                fontSize: "1.5rem",
              }}
            />
          }
          sx={{
            textTransform: "uppercase",
          }}
          component={Link}
          href={`/room/${props.room.slug}`}
        >
          View room details
        </Button>

        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <Box
            bgcolor="primary.main"
            px={2}
            py={1}
            minWidth={100}
            borderRadius={2}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              {formatCurrency(props.room.price)} / month
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RoomTypeCard;
