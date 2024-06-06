"use client";
import AboutUs from "@/modules/home/sections/AboutUs";
import Blog from "@/modules/home/sections/Blog";
import RoomTypeList from "@/modules/home/sections/RoomTypeList";
import TestimonialSection from "@/modules/home/sections/Testimonial";
import { ScrollRevealElement } from "@/utils/animation";
import { ANIMATION_REVEAL_ELEMENT } from "@/utils/common";
import { CommonConstants } from "@/utils/constants";
import { Phone } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    ScrollRevealElement(
      ANIMATION_REVEAL_ELEMENT.BOTTOM_TO_TOP.default,
      ANIMATION_REVEAL_ELEMENT.BOTTOM_TO_TOP.active
    );
    ScrollRevealElement(
      ANIMATION_REVEAL_ELEMENT.LEFT_TO_RIGHT.default,
      ANIMATION_REVEAL_ELEMENT.LEFT_TO_RIGHT.active
    );
    ScrollRevealElement(
      ANIMATION_REVEAL_ELEMENT.RIGHT_TO_LEFT.default,
      ANIMATION_REVEAL_ELEMENT.RIGHT_TO_LEFT.active
    );
    ScrollRevealElement(
      ANIMATION_REVEAL_ELEMENT.LEFT_TO_RIGHT.default,
      ANIMATION_REVEAL_ELEMENT.LEFT_TO_RIGHT.active,
      true
    );
    ScrollRevealElement(
      ANIMATION_REVEAL_ELEMENT.RIGHT_TO_LEFT.default,
      ANIMATION_REVEAL_ELEMENT.RIGHT_TO_LEFT.active,
      true
    );
  }, []);
  return (
    <>
      {/* Banner section */}
      <div className="relative h-170 w-full">
        <Image
          src={CommonConstants.images.homeBanner}
          alt="Home banner"
          fill
          style={{
            maxWidth: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          className="absolute inset-0 bg-black/50 flex flex-col justify-around"
          px={CommonConstants.spacing.horizontalPadding}
        >
          <div className="flex flex-col text-white gap-5">
            <Typography variant="h4" className="uppercase">
              Welcome to
            </Typography>
            <Typography variant="h2" className="uppercase" fontWeight="bold">
              SING STAY & CARE
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Book your stay and enjoy amentities redefined at the most
              affordable rates.
            </Typography>
          </div>

          <div className="flex justify-center">
            <Button
              component={Link}
              href="/contact-us"
              variant="contained"
              startIcon={<Phone />}
              sx={{
                px: 4,
                py: 2,
              }}
            >
              Contact us
            </Button>
          </div>
        </Box>
      </div>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={CommonConstants.spacing.horizontalPadding}
        py={CommonConstants.spacing.verticalPadding}
      >
        <div className={ANIMATION_REVEAL_ELEMENT.BOTTOM_TO_TOP.default}>
          <AboutUs />
        </div>
        <Divider sx={{ height: "1px", width: "100%", mt: "60px" }} />
        <div className={ANIMATION_REVEAL_ELEMENT.LEFT_TO_RIGHT.default}>
          <RoomTypeList />
        </div>
        <Divider sx={{ height: "1px", width: "100%", mb: "60px" }} />
        <Blog />
        <Divider sx={{ height: "1px", width: "100%", mb: "60px" }} />
        <TestimonialSection />
      </Box>
    </>
  );
}

export default HomePage;
