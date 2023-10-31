import React from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const IMAGES = [
  { id: 1, img: "GalleryImages/Img1.jpg", title: "Image Title" },
  { id: 2, img: "GalleryImages/Img2.jpg", title: "Image Title" },
  { id: 3, img: "GalleryImages/Img3.jpg", title: "Image Title" },
  { id: 4, img: "GalleryImages/Img4.jpg", title: "Image Title" },
  { id: 5, img: "GalleryImages/Img5.jpg", title: "Image Title" },
  { id: 6, img: "GalleryImages/Img6.jpg", title: "Image Title" },
  { id: 7, img: "GalleryImages/Img7.jpg", title: "Image Title" },
  { id: 8, img: "GalleryImages/Img8.jpg", title: "Image Title" },
  { id: 9, img: "GalleryImages/Img9.jpg", title: "Image Title" },
  { id: 10, img: "GalleryImages/Img10.jpg", title: "Image Title" },
  { id: 11, img: "GalleryImages/Img11.jpg", title: "Image Title" },
  { id: 12, img: "GalleryImages/Img12.jpg", title: "Image Title" },
  { id: 13, img: "GalleryImages/Img13.jpg", title: "Image Title" },
  { id: 14, img: "GalleryImages/Img14.jpg", title: "Image Title" },
  { id: 15, img: "GalleryImages/Img15.jpg", title: "Image Title" },
];

function ImageGallery() {
  const mytheme = useTheme();
  const lessThanTab = useMediaQuery(mytheme.breakpoints.down("md"));
  return (
    <ImageList variant="masonry" cols={lessThanTab ? 2 : 3} gap={8}>
      {IMAGES.map((item) => (
        <ImageListItem className="shadow-lg" key={item.id}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
export default ImageGallery;
