declare type Blog = {
  id: string;
  content: string;
  title: string;
  url: string;
  imageURL?: string;
  videoURL?: string;
  numberOfLikes: number | string;
};

declare type Admin = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

declare type About = {
  id: string;
  content: string;
  imageURL: string;
};

declare type Gallery = {
  id: string;
  imageURL?: string;
  videoURL?: string;
  caption: string;
};

declare type Contact = {
  emails?: string[];
  phones?: string[];
  address?: string;
};

declare type SocialMedia = {
  facebook?: string;
  instgram?: string;
  twitter?: string;
  medium?: string;
  linkedin?: string;
};

declare type GalleryImage = {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
};
