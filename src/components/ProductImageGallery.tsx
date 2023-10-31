import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import "primereact/galleria/galleria.min.css";
import { Box } from "@mui/material";

type ImagesGalleryProps = {
  galleryImages: Gallery[];
};

export default function ImagesGallery({ galleryImages }: ImagesGalleryProps) {
  const [images, setImages] = useState<Gallery[] | []>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  useEffect(() => {
    setImages(galleryImages);
  }, [galleryImages]);

  const itemTemplate = (item: Gallery) => {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "65vh",
          borderRadius: 2,
          overflow: "hidden",
        }}
        className="my-2"
      >
        <img src={item?.imageURL} alt={item.caption} />
      </Box>
    );
  };

  const thumbnailTemplate = (item: Gallery) => {
    return (
      <Box
        sx={{
          position: "relative",
          width: "9vw",
          height: "9vw",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <img src={item.imageURL} alt={item.caption} />
      </Box>
    );
  };

  return (
    <div>
      <Galleria
        value={images}
        activeIndex={activeIndex}
        onItemChange={(e) => setActiveIndex(e.index)}
        numVisible={4}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        style={{ width: "100%", maxWidth: "600px" }}
      />
    </div>
  );
}
