import { Avatar, Box, Button, IconButton, useTheme,Link } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";
import "./NavMenuBarStyle.css";
import { useCookies } from "react-cookie";
import { useCurrentUser } from "../../hooks/customHooks";


const NavMenuVariant = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
    exit: {
      opacity: 0,
    },
  },
};

type NavMenuBarProps = {
  setThemeMode: () => void;
};

function NavMenuBar({ setThemeMode }: NavMenuBarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const currentUser = useCurrentUser()
  const [_cookie,_setCookie,removeCookie] = useCookies(["token"]);
  // const navigate = useNavigate()

  const handleSignout = () => {
    removeCookie("token");
    // navigate("/")
    window.location.reload();
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div
     
        className={open ? "bars-wrapper open" : "bars-wrapper"}
        onClick={handleOpen}
      >
        <span className="bar1"></span>
        <span className="bar2"></span>
        <span className="bar3"></span>
      </div>
      {open && (
        <AnimatePresence mode="wait">
          <motion.div
            variants={NavMenuVariant}
            initial="initial"
            animate="final"
            exit="exit"
            style={{backgroundColor:"#fff"}}
            className="menu-bar py-5 shadow-lg rounded"
          >
            <Box className="flex flex-rowitems-center justify-center">
            {currentUser && currentUser.role === "admin" && (
              <Link
                style={{ textDecoration: "none" }}
                className=" px-10 py-2 rounded hover:text-gray-300"
                href="/dashboard"
              >
                <Avatar src="User" sx={{ width: 25, height: 25 }} />
              </Link>
            )}

            {currentUser && currentUser.role === "user" && (
              <Link
                style={{ textDecoration: "none" }}
                className=" px-10 py-2 rounded hover:text-gray-300"
                href="/profile"
              >
                <Avatar src="User" sx={{ width: 25, height: 25 }} />
              </Link>
            )}
            <IconButton onClick={setThemeMode} sx={{ color: "white" }}>
              {theme.palette.mode === "light" ? (
                <DarkMode color="primary" />
              ) : (
                <LightMode color="primary" />
              )}
            </IconButton>

            </Box>
           
            <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
          
            <Link
              color="primary.light"
              style={{ textDecoration: "none" }}
              className="px-5 py-2 rounded"
              href="/"
            >
              Home
            </Link>
            <Link
              color="primary.light"
              style={{ textDecoration: "none" }}
              className="px-5 py-2 rounded"
              href="/stories"
            >
              Audio Stories
            </Link>
            {currentUser && (
              <Button
           
                sx={{
                  color: theme.palette.primary.light,
                  textTransform: "none",
                  fontFamily: "Poppins-Medium",
                }}
                onClick={handleSignout}
              >
                Signout
              </Button>
            )}
            {!currentUser && (
              <Link
                color="primary.light"
                style={{ textDecoration: "none" }}
                className="px-5 py-2 rounded"
                href="/signin"
              >
                Signin
              </Link>
            )}
            <Link
              color="primary.light"
              style={{ textDecoration: "none" }}
              className="px-5 py-2 rounded"
              href="/signup"
            >
              Signup
            </Link>
{/* 
            <IconButton
              onClick={setThemeMode}
              sx={{ color: theme.palette.primary.light }}
            >
              {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton> */}
         
          </Box>
            {/* <a
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none" }}
              className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
              href="/"
            >
              Home
            </a>
            <a
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none" }}
              className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
              href="/#about"
            >
              About
            </a>
            <a
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none" }}
              className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
              href="/#services"
            >
              Services
            </a>
            <a
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none" }}
              className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
              href="/#gallery"
            >
              Gallery
            </a>
            <a
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none" }}
              className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
              href="/#stories"
            >
              Stories
            </a>
            <a
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none" }}
              className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
              href="/#contact"
            >
              Contact
            </a>
            {isLogin && (
              <a
                onClick={() => setOpen(false)}
                style={{ textDecoration: "none" }}
                className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
                href="/signout"
              >
                Signout
              </a>
            )}

            <a
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none" }}
              className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
              href="/signup"
            >
              Signup
            </a>
            {!isLogin && (
              <a
                onClick={() => setOpen(false)}
                style={{ textDecoration: "none" }}
                className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
                href="/signin"
              >
                Signin
              </a>
            )}

            {isLogin && (
              <a
                onClick={() => setOpen(false)}
                style={{ textDecoration: "none" }}
                className="hover:bg-slate-300 px-10 py-2 rounded hover:text-gray-300"
                href="/dashboard"
              >
                <Avatar src="User" sx={{ width: 25, height: 25 }} />
              </a>
            )} */}

            {/* <div className='hover:bg-customPrimary20 hover:cursor-pointer hover:text-gray-400'>Home</div> */}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}

export default NavMenuBar;
