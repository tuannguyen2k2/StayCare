import { IRoom } from "@/interfaces/room.interface";
import { CommonConstants } from "@/utils/constants";

export const RoomType: IRoom[] = [
  {
    id: "1",
    name: "Triple sharing room",
    type: "monthly",
    price: 200,
    images: [
      CommonConstants.images.room1,
      CommonConstants.images.room2,
      CommonConstants.images.room3,
    ],
  },
  {
    id: "2",
    name: "Twin sharing room",
    type: "monthly",
    price: 300,
    images: [
      CommonConstants.images.room1,
      CommonConstants.images.room2,
      CommonConstants.images.room3,
    ],
  },
  {
    id: "3",
    name: "Single room",
    type: "monthly",
    price: 400,
    images: [
      CommonConstants.images.room1,
      CommonConstants.images.room2,
      CommonConstants.images.room3,
    ],
  },
];
