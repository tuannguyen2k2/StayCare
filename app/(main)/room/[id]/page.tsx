import { PaymentType } from "@/common/models/PaymentType";
import { RoomType } from "@/common/models/RoomType";
import PaymentCard from "@/modules/payments/components/PaymentCard";
import { CommonConstants } from "@/utils/constants";
import {
  CleaningServices,
  DirectionsBus,
  LocalLaundryService,
  PhoneCallback,
  PinDrop,
  Restaurant,
  Wifi,
} from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import Image from "@/common/components/image";
import http from "@/utils/http";
import { house } from "@/clientApi/house";
import { IPaymentUpdate } from "@/interfaces/payment.interface";

async function RoomDetailPage({ params }: { params: { id: string } }) {
  const data = RoomType.find((room) => room.id === params.id);

  const data1 = await house.getDetailHouse(params.id);

  return (
    <Box
      display="flex"
      justifyContent="center"
      py={CommonConstants.spacing.verticalPadding}
    >
      <Box
        width={CommonConstants.dimensions.contentWidth}
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" className="grid grid-cols-3 gap-3">
          {(data1.payload as any).data.images.length > 0 &&
            (data1.payload as any).data.images.map(
              (img: string, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      aspectRatio: 1,
                      position: "relative",
                      borderRadius: "0 20px 20px 0",
                      overflow: "hidden",
                    }}
                  >
                    <Image src={img} alt={data?.name ?? ""} fill />
                  </Box>
                );
              }
            )}
        </Box>

        <Divider sx={{ my: 5 }} />

        <Typography
          variant="h4"
          fontWeight="bold"
          textTransform="capitalize"
          color="secondary.main"
        >
          {(data1.payload as any)?.data?.title}
        </Typography>

        <Box width="100%" display="flex" justifyContent="center" py={3}>
          <Box
            width={CommonConstants.dimensions.contentWidthSmaller}
            className="grid grid-cols-2 gap-10"
          >
            {(data1.payload as any)?.metadata?.map(
              (payment: IPaymentUpdate) => (
                <PaymentCard key={payment.rent_time_title} payment={payment} />
              )
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" fontWeight="bold" color="secondary.main">
          Things to know
        </Typography>

        <Box className="grid grid-cols-3">
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1" fontWeight="bold" color="primary.main">
              Key highlights
            </Typography>

            <Box display="flex">
              <DirectionsBus
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">
                Walking distance to bus stop
              </Typography>
            </Box>

            <Box display="flex">
              <PinDrop
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">
                Amenities within 10 minutes walking distance (including
                supermarkets, convenient stores, foodcourt, clinics,…)
              </Typography>
            </Box>

            <Box display="flex">
              <PhoneCallback
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">Hotline customer service</Typography>
            </Box>

            <Box display="flex">
              <PinDrop
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">Emergency student support</Typography>
            </Box>

            <Box display="flex">
              <PinDrop
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">
                Free Mandarin speaking class for non Chinese-speaking students
                (coming soon)
              </Typography>
            </Box>

            <Box display="flex">
              <PinDrop
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">
                Strong Vietnamese and International students community
              </Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1" fontWeight="bold" color="primary.main">
              Facilities and services
            </Typography>

            <Box display="flex">
              <Wifi
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">Wifi</Typography>
            </Box>

            <Box display="flex">
              <PinDrop
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">Air Conditioning</Typography>
            </Box>

            <Box display="flex">
              <LocalLaundryService
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">Laundry</Typography>
            </Box>

            <Box display="flex">
              <CleaningServices
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">Cleaning service</Typography>
            </Box>

            <Box display="flex">
              <Restaurant
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">Cooking allowed</Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1" fontWeight="bold" color="primary.main">
              Student age - Group and Diversity
            </Typography>

            <Box display="flex">
              <DirectionsBus
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">
                Average age: 15 years old and above
              </Typography>
            </Box>

            <Box display="flex">
              <PinDrop
                color="primary"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="body1">
                Residents mostly: Vietnam, South Korea, Philippines, Myanmar,
                Taiwanese
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RoomDetailPage;
