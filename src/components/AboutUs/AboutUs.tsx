import {
  Divider,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";

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
        About Story Telling
      </Typography>
      {/* <h4 className='text-center mb-5 text-customPrimary10 text-3xl font-semibold font-inter md:text-5xl md:mb-8 opacity-4'>About Us</h4> */}
      {/* <Divider></Divider> */}
      <div className="flex w-100 flex-col mt-2 gap-1 justify-center lg:flex-row">
        <img
          alt="About Us Image"
          className="rounded"
          style={{ width: aboutImgWidth }}
          src="/about.png"
        />
        <div>
          {/* <h4 className='text-center text-customPrimary20 text-2xl font-inter md:text-4xl'>SchoolAll Company Here To Digitize Education</h4> */}
          <div className="p-4 mx-2">
            <Typography variant="body1">
              In a world teeming with diverse cultures and rich traditions, the
              essence of storytelling remains a universal language that connects
              us all. At [Company Name], we believe that everyone has a unique
              story to tell, a narrative woven from the threads of their
              experiences, dreams, and aspirations. Our platform serves as a
              vibrant tapestry where these stories intertwine, creating a
              harmonious blend of voices that transcend geographical boundaries
              and cultural divides. Embark on a journey of discovery through our
              platform, where you'll find yourself immersed in a world of
              narratives that span the globe. Delve into the heart of
              traditional homes, where stories echo through the generations,
              revealing the enduring spirit of humanity. Listen to tales of
              resilience, innovation, and unwavering hope, each one a testament
              to the indomitable human spirit. Through the power of
              storytelling, we aim to foster empathy, understanding, and a
              deeper appreciation for the tapestry of human experience. As you
              connect with individuals from diverse backgrounds, you'll gain
              insights into their perspectives, enriching your own understanding
              of the world. By sharing our stories, we open doors to compassion,
              breaking down barriers and fostering a sense of unity amidst our
              differences. We invite you to join us on this transformative
              journey of storytelling. Share your own narrative, lend an ear to
              the voices of others, and discover the profound impact that
              stories can have on our lives. Together, let us create a world
              where stories are celebrated, where cultures intertwine, and where
              the human connection thrives.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
