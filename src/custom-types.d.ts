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
  recorder: { id: string; fullName: string; profileImage: string };
  numberOfLikes: number | string;
  userId: string;
  createdAt: {
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
