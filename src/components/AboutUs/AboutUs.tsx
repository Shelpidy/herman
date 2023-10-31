import {
  Divider,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
// import AOS from 'aos';
import React, { useEffect } from "react";
import "./AboutUs.css";
// import "aos/dist/aos.css";

function AboutUs() {
  const mytheme = useTheme();
  const lessThanTab = useMediaQuery(mytheme.breakpoints.down("md"));

  let aboutImgWidth = lessThanTab ? "99vw" : "50vw";

  // useEffect(()=>{
  //     AOS.init({duration:1000})
  // },[])

  return (
    <div className="my-20 mb-2">
      <Typography
        className="text-center pb-2"
        fontFamily="Inter"
        fontWeight="bold"
        color="primary.main"
        variant={lessThanTab ? "h4" : "h3"}
      >
        About Augustine Sorie-sengbe Marrah
      </Typography>
      {/* <h4 className='text-center mb-5 text-customPrimary10 text-3xl font-semibold font-inter md:text-5xl md:mb-8 opacity-4'>About Us</h4> */}
      {/* <Divider></Divider> */}
      <div className="flex w-100 flex-col mt-2 gap-5 justify-center lg:flex-row">
        <img
          alt="About Us Image"
          className="rounded"
          style={{ width: aboutImgWidth }}
          src="/about.png"
        />
        <div>
          {/* <h4 className='text-center text-customPrimary20 text-2xl font-inter md:text-4xl'>SchoolAll Company Here To Digitize Education</h4> */}
          <div className="p-4 mx-2">
            <p className="font-poppinsLight text-md">
              Augustine Sorie-sengbe Marrah is a leading civil and commercial
              litigator, top constitutional expert, and democracy activist. He
              graduated top of the class from the Sierra Leone Law School in
              2009 and has been in legal practice for over ten years. He spent
              his first seven years of practice in Sierra Leone’s leading law
              firm—Yada Williams and Associates. He has offered ranging legal
              and consultancy services to top corporate/commercial entities,
              national and international human rights and charitable
              institutions, and highly distinguished individuals. He has
              litigated a few international commercial arbitrations before the
              London Court of International Arbitration and the International
              Chamber of Commerce Arbitration Court. He is co-counsel in an
              action brought by the Association of Ebola survivors in Sierra
              Leone against the Republic of Sierra Leone at the ECOWAS Community
              Court of Justice. He sits on the Pharmacy Board of Sierra Leone
              and was a member of the Board of directors of the Sierra Leone
              Cable Limited, the sole entity responsible for wholesale internet
              services in Sierra Leone. He was recently appointed, one of a
              seven-member team, to craft the national anti-corruption strategy
              for 2019-2023. Augustine served as secretary of the regulatory
              body for lawyers in Sierra Leone (General Legal Council) and its
              disciplinary committee for two consecutive years. He is a member
              of the Sierra Leone Bar Association, the International Bar
              Association, and the Commonwealth Lawyers Association. He
              currently runs his own law firm in Sierra Leone—Marrah &
              Associates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
