import React from "react";
import { Typography, Divider, useTheme, useMediaQuery } from "@mui/material";
import AboutUs from "../components/AboutUs/AboutUs";
import ContactUs from "../components/ContactUs/ContactUs";
import SappChat from "../components/SappLiveChat/SappChat";
import Banner from "../components/Banner/Banner";

function HomePage() {
  const theme = useTheme();
  const lessThanTab = useMediaQuery(theme.breakpoints.down("md"));
  const themeMode = theme.palette.mode;
  return (
    <main
      className="py-10 h-full w-full "
      style={{ background: themeMode === "dark" ? "black" : "white" }}
    >
      <SappChat />
      <section data-aos="zoom-in" id="about-us" className="my-1">
        <Banner />
      </section>
      <section data-aos="zoom-in" id="about-us" className="my-1 px-4">
        <AboutUs />
      </section>

      <section data-aos="fade-in" id="courses" className="my-8 px-4">
        <Typography
          className="text-center pb-2"
          fontFamily="Inter"
          fontWeight="bold"
          color="primary.main"
          variant={lessThanTab ? "h4" : "h3"}
        >
          Blogs
        </Typography>
        {/* <h4 className='text-center my-6 text-customPrimary10 text-3xl font-semibold font-inter md:text-5xl opacity-4'>Our Services</h4> */}
        <Divider></Divider>
      </section>

      <section data-aos="fade-out" id="gallery" className="my-4 px-4">
        <Typography
          className="text-center pb-2"
          fontFamily="Inter"
          fontWeight="bold"
          color="primary.main"
          variant={lessThanTab ? "h4" : "h3"}
        >
          Gallery And Portfolio
        </Typography>
      </section>

      <section data-aos="zoom-in" id="contact-us" className="my-8 px-4">
        <Typography
          className="text-center pb-2"
          fontFamily="Inter"
          fontWeight="bold"
          color="primary.main"
          variant={lessThanTab ? "h4" : "h3"}
        >
          Contact
        </Typography>
        <ContactUs />
      </section>
    </main>
  );
}

export default HomePage;
