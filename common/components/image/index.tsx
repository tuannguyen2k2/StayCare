"use client";

import { CommonConstants } from "@/utils/constants";
import { default as NextImage, ImageProps } from "next/image";
import { FC, ReactElement, useState } from "react";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src?: string;
}

const Image: FC<CustomImageProps> = ({
  src,
  onLoad,
  onError,
  ...props
}): ReactElement => {
  const [imgSrc, setImgSrc] = useState(src ?? CommonConstants.images.notFound);
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoadCallback = (e: any) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const onErrorCallback = (e: any) => {
    setIsLoaded(false);
    setImgSrc(CommonConstants.images.notFound);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div
      className={
        isLoaded ? "" : "animate-pulse duration-300 ease-out delay-1000"
      }
    >
      <NextImage
        src={imgSrc}
        onLoad={onLoadCallback}
        onError={onErrorCallback}
        {...props}
      />
    </div>
  );
};

export default Image;
