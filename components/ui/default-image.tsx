"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DefaultImageProps extends React.ComponentProps<typeof Image> {
  fallbackSrc?: string;
}

export function DefaultImage({
  src,
  alt,
  fallbackSrc = "/placeholder.png",
  className,
  ...props
}: DefaultImageProps) {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={cn("object-cover", className)}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
} 