"use client";

import NextImage from "next/image";
import Masonry from "react-masonry-css";

import "../assets/css/gallery.css"

interface GalleryImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
}

const breakpointColumns = {
  default: 4,
  1024: 3,
  768: 2,
  500: 1,
};

export default function Gallery({ images }: GalleryProps) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4"
      columnClassName="space-y-4"
    >
      {images.map((image) => (
        <NextImage
          key={image.id}
          src={image.url}
          alt=""
          width={image.width}
          height={image.height}
          className="w-full h-auto rounded-lg"
        />
      ))}
    </Masonry>
  );
}