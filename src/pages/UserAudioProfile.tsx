import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import AudiosList from "../components/AudiosList";
import { doc, getFirestore, getDoc } from "firebase/firestore";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9EOaEqf4vO1VUDoxSDAZDjnIkadFUCVE",
  authDomain: "herman-98ed4.firebaseapp.com",
  projectId: "herman-98ed4",
  storageBucket: "herman-98ed4.appspot.com",
  messagingSenderId: "290673052798",
  appId: "1:290673052798:web:ab0598cc200626b3d91c2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore();

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});

const UserAudioProfilePage = () => {
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    async function getUser() {
      try {
        let userDoc = doc(firestore, `users/${userId}`);
        let snap = await getDoc(userDoc);
        console.log(`${snap.id} ${JSON.stringify(snap.data())}`);
        let _user = { id: snap.id, ...JSON.parse(JSON.stringify(snap.data())) };
        setUser(_user);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [userId]);

  if (!user) {
    return (
      <Box
        sx={{
          height: "95vh",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <CircularProgress color="primary" size={30} />
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          LOADING...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: "12vh" }}>
      <UserProfile {...user} />
      {userId && <AudiosList userId={userId} />}
    </Box>
  );
};

export default UserAudioProfilePage;
