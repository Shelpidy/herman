import React from "react";
import Typography from "@mui/material/Typography";
import { IconButton, Box, useTheme, Link } from "@mui/material";
import {
  FacebookOutlined,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{ backgroundColor: "primary.main", width: "100vw" }}
      className="p-6 shadow-lg w-100 bottom-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
    >
      <Box className="m-4 flex gap-4 flex-col mx-5 items-start justify-start">
        <Typography>LOGO</Typography>
        {/* <Typography variant='h4' className='text-gray-400 font-semibold font-poppinsMedium'>SchoolAll</Typography> */}
        <p className="my-1" style={{ color: theme.palette.primary.light }}>
          <span>&#169; Copywrite 2023</span>
        </p>
        <Link href="/p-policy">
          <Typography className="my-4" color="primary.light">
            Privacy And Policies
          </Typography>
        </Link>
        <Link href="/copywrite">
          <Typography color="primary.light">Copywrite</Typography>
        </Link>
        <Link href="/terms">
          <Typography color="primary.light">Term of services</Typography>
        </Link>
      </Box>
      <ul className="m-4 flex gap-4 flex-col mx-5 items-start justify-start">
        <Typography
          color="primary.light"
          variant="h5"
          sx={{ fontFamily: "Inter", fontWeight: "bolder" }}
        >
          NAV LINKS
        </Typography>
        <li className=" transition duration-300 ease-in-out">
          <Link
            href="/"
            style={{
              color: theme.palette.primary.light,
              borderColor: theme.palette.primary.light,
              fontWeight: "bold",
            }}
          >
            Home
          </Link>
        </li>

        <li className=" transition duration-300 ease-in-out">
          <Link
            href="/signup"
            style={{
              color: theme.palette.primary.light,
              borderColor: theme.palette.primary.light,
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </li>
        <li className=" transition duration-300 ease-in-out">
          <Link
            href="/signin"
            style={{
              color: theme.palette.primary.light,
              borderColor: theme.palette.primary.light,
              fontWeight: "bold",
            }}
          >
            Sign In
          </Link>
        </li>
      </ul>

      {/* <ul className="m-4 flex gap-4 flex-col mx-5 items-start justify-start">
        <Typography
          color="primary.light"
          variant="h5"
          sx={{ fontFamily: "Inter", fontWeight: "bolder" }}
        >
          SERVICES
        </Typography>
        <li style={{ color: theme.palette.primary.light, fontWeight: "bold" }}>
          Blood Donation and Transfusion
        </li>
        <li style={{ color: theme.palette.primary.light, fontWeight: "bold" }}>
          Doctor and Patient Appointment
        </li>
        <li style={{ color: theme.palette.primary.light, fontWeight: "bold" }}>
          Medical Analytics
        </li>
      </ul> */}
      <Box className="flex m-4 text-gray-400">
        <Box className="flex flex-row justify-start text-gray-400 items-start py-3">
          <IconButton aria-label="facebook">
            <FacebookOutlined sx={{ color: theme.palette.primary.light }} />
          </IconButton>
          <IconButton aria-label="twitter">
            <Twitter sx={{ color: theme.palette.primary.light }} />
          </IconButton>
          <IconButton aria-label="instagram">
            <Instagram sx={{ color: theme.palette.primary.light }} />
          </IconButton>
          <IconButton aria-label="github">
            <GitHub sx={{ color: theme.palette.primary.light }} />
          </IconButton>
          <IconButton aria-label="linkedin">
            <LinkedIn sx={{ color: theme.palette.primary.light }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
