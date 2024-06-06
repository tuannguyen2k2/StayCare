import { CommonConstants } from "@/utils/constants";
import {
  Home,
  HowToReg,
  Language,
  LocationOnOutlined,
  TaskAlt,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Image from "@/common/components/image";
import Link from "next/link";
import StaticCard from "../components/StaticCard";

function AboutUs() {
  const contentWidth = CommonConstants.dimensions.contentWidth;
  return (
    <Box className="grid grid-cols-2 gap-10 pl-10" width={contentWidth}>
      <div className="flex items-center">
        <TaskAlt
          color="primary"
          sx={{
            marginRight: "1rem",
            fontSize: "3rem",
          }}
        />
        <Typography variant="h5" fontWeight="bold" color="secondary">
          Room Only
        </Typography>
      </div>

      <div className="flex items-center pl-28">
        <LocationOnOutlined
          color="primary"
          sx={{
            marginRight: "1rem",
            fontSize: "3rem",
          }}
        />
        <Typography variant="h5" fontWeight="bold" color="secondary">
          Various Locations
        </Typography>
      </div>

      <div className="flex flex-col items-start gap-10 w-[88%]">
        <Typography color="secondary" variant="h4" fontWeight="bold">
         Rent Your Dream House With Us
        </Typography>

        <Typography color={"#827b7b"} variant="subtitle2" fontSize={18}>
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
        </Typography>

        <Button
          variant="contained"
          component={Link}
          href="/contact-us"
          sx={{
            boxShadow: 5,
            px: 5,
            py: 1,
          }}
        >
          Contact us
        </Button>

        <div className="w-full grid grid-cols-3">
          <StaticCard
            icon={<HowToReg />}
            value={1200}
            label="international students"
          />

          <StaticCard icon={<Home />} value={2015} label="establishments" />

          <StaticCard icon={<Language />} value={2} label="offices" />
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <Box
          width={400}
          height={400}
          position="relative"
        >
          <Image
            src={CommonConstants.images.aboutUs}
            alt="About us image"
            fill
            style={{
              maxWidth: "100%",
              objectFit: "cover",
              top: -20,
              left: 30,
              borderRadius: "60px 10px 60px 10px",
            }}
          />
        </Box>
      </div>
    </Box>
  );
}

export default AboutUs;
