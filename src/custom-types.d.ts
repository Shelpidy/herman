declare interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  profileImage?: string;
  contactNumber: string;
  gender: "male" | "female" | "other";
  dateOfBirth: {
    seconds: number;
    nanoseconds: number;
  };
  address?: string;
  region?: string;
  password: string;
  email: string;
  role: "admin" | "user";
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

declare type CurrentUser = {
  id: string | number;
  fullName: string;
  profileImage: string;
  role: "admin" | "user";
};

declare type Audio = {
  id: string;
  title: string;
  url: string;
  status: "draft" | "review" | "publish";
  recorder: { id: string; fullName: string; profileImage: string };
  rank: number | string;
  userId: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

declare type Audio2 = {
  id: string;
  audioId: string;
  title: string;
  language: string;
  translateLanguage: string;
  url: string;
  iframe: string;
  type: "summary" | "full";
  status:
    | "draft"
    | "write"
    | "edit"
    | "translate"
    | "read"
    | "final-edit"
    | "publish"
    | "manage";
  author: {
    authorId: string;
    fullName: string;
    address: string;
    region: string;
    phoneNumber: string;
    gender: string;
    country: string;
  };
  felicitator?:{
    felicitatorId:string;
    fullname:string;
    address:string;
    phoneNumber:string;
    region:string;
    country:string
  };
  rank: number | string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  publishedAt: null | {
    seconds: number;
    nanoseconds: number;
  };
};

declare type Gallery = {
  fileId: string;
  imageURL?: string;
  videoURL?: string;
  caption: string;
};

declare type GalleryImage = {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
};
