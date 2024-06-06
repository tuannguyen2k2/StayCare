import { CommonConstants } from "@/utils/constants";
import { Box, Container, Typography } from "@mui/material";
import { FaHourglassStart } from "react-icons/fa";
import { FaHourglassEnd } from "react-icons/fa";
import Home from  "@/public/images/home.png"
import Image from "next/image";
type PageParams = {
  searchParams: {
    page?: number;
    status: string;
    type: string;
  };
};

async function RoomDetail(props: PageParams) {

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
        mb={"10px"}
      >
        Twin sharing master room   
      </Typography>
      <Box display={"flex"} gap={"60px"}>
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                  <FaHourglassStart size={18} />
                  <Typography color={"#8D8D8D"} fontWeight={"medium"} fontSize={20}>Start date</Typography>
                  <Typography color={"#F7961D"} fontWeight={"medium"} fontSize={20}>19-03-2024</Typography>
              </Box>
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                  <FaHourglassEnd size={18} />
                  <Typography color={"#8D8D8D"} fontWeight={"medium"} fontSize={20}>Due date</Typography>
                  <Typography color={"#F7961D"} fontWeight={"medium"} fontSize={20}>19-04-2024</Typography>
              </Box>
          </Box>
          <Box display={"flex"} mt={"20px"}>
              <Box>
                  <Image src={Home} alt="home" width={1004} height={480} />
                <Box display={"flex"} gap={"24px"} mt={"20px"}>
                  <Image src={Home} alt="home" width={490} height={259} />
                  <Image src={Home} alt="home" width={490} height={259}/>
                </Box>
              </Box>
              <Box></Box>
        </Box>
    </Container>
  );
}
export default RoomDetail;
