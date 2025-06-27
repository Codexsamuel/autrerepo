"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DefaultImageProps extends ComponentProps<typeof Image> {
  fallbackSrc?: string;
}

export function DefaultImage({
  src,
  alt,
  fallbackSrc = "/placeholder.png",
  className,
  ...props
}: DefaultImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

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