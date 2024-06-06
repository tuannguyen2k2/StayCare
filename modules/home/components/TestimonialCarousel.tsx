"use client";

import Image from "@/common/components/image";
import { usePrevNextButtons } from "@/common/hook/useCarouselArrowButtons";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

const CarouselItem = ({
  avatar,
  quote,
  name,
}: {
  avatar: string;
  quote: string;
  name: string;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      p={4}
    >
      <Box
        width={100}
        height={100}
        borderRadius="50%"
        overflow="hidden"
        position="relative"
        mb={2}
      >
        <Image
          src={avatar}
          alt="avatar"
          fill
          style={{ width: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box textAlign="center" display="flex" flexDirection="column">
        <Typography
          color="secondary.main"
          variant="h6"
        >{`"${quote}"`}</Typography>
        <Typography color="secondary.main">{name}</Typography>
      </Box>
    </Box>
  );
};

const TestimonialCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

  const { onClickNext, onClickPrev } = usePrevNextButtons(emblaApi);

  return (
    <Box position="relative" pb={4}>
      <Box ref={emblaRef} overflow="hidden">
        <Box display="flex">
          <Box flex="0 0 100%" minWidth={0} position="relative">
            <CarouselItem
              avatar="/images/home/avatar.png"
              quote="Calm, Serene, Retro – What a way to relax and enjoy"
              name="Mr. and Mrs. Baxter, UK"
            />
          </Box>
          <Box flex="0 0 100%" minWidth={0} position="relative">
            <CarouselItem
              avatar="/images/home/avatar.png"
              quote="Calm, Serene, Retro – What a way to relax and enjoy"
              name="Mr. and Mrs. Baxter, UK"
            />
          </Box>
          <Box flex="0 0 100%" minWidth={0} position="relative">
            <CarouselItem
              avatar="/images/home/avatar.png"
              quote="Calm, Serene, Retro – What a way to relax and enjoy"
              name="Mr. and Mrs. Baxter, UK"
            />
          </Box>
        </Box>
      </Box>

      <Box
        position="absolute"
        bottom={0}
        width="100%"
        display="flex"
        justifyContent="center"
        gap={3}
      >
        <Button
          variant="contained"
          onClick={onClickPrev}
          sx={{
            minWidth: 0,
            px: 1,
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="contained"
          onClick={onClickNext}
          sx={{
            minWidth: 0,
            px: 1,
          }}
        >
          <ChevronRight />
        </Button>
      </Box>
    </Box>
  );
};

export default TestimonialCarousel;
