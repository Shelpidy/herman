import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
  Grid,
  Divider,
  Card,
  useTheme,
  Link,
} from "@mui/material";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import jwt_encode from "jwt-encode";
import {
  collection,
  doc,
  getFirestore,
  getDocs,
  setDoc,
  query,
  onSnapshot,
  where,
  limit,
  addDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import uploadFileToFirebase from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { AddAPhotoOutlined } from "@mui/icons-material";
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

const userCollection = collection(firestore,"users")

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [cookie, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


 async function handleFormSubmit() {
      try {
        setLoading(true)
        let _users: User[] = [];
        let usersQuery = query(userCollection,where("email","==",formData.email));
        let usersSnapshot = await getDocs(usersQuery);
        usersSnapshot.forEach((snap) => {
          console.log(`${snap.id} ${JSON.stringify(snap.data())}`);
          let user = {
            id: snap.id,
            ...JSON.parse(JSON.stringify(snap.data())),
          };
          _users.push(user);
        });

        console.log({Users:_users})
        if(_users.length < 1){
          Toast.fire({
            text:"Email does not exist",
            icon:"warning"
          })

        }else{
          let _user = _users[0]
          if(_user.password === formData.password){
            let data = {
              id:_user.id,
              fullName:_user.firstName +" "+ _user.middleName + " "+_user.lastName,
              profileImage:_user.profileImage,
              role:_user.role
            }
            let encodedData = jwt_encode(data,'herman')
            console.log({token:encodedData})
            setCookie("token", String(encodedData));
            // navigate("/")
            window.location.assign("/")
          }else{
            Toast.fire({
              text:"Password in incorrect",
              icon:"warning"
            })
          }
        }
        
      } catch (err) {
        console.log(err);
        Toast.fire({
          text:"login fail. Check your internet connection",
          icon:"warning"
        })
      }finally{
        setLoading(false)
      }
    }

  return (
    <Container
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: "400px",
          padding: "25px",
          // minHeight: "45vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          // mb="10px"
        >
          <Typography m='15px' variant="h6" fontFamily="Poppins-Light">Signin</Typography>
        </Box>
        <TextField
          size="small"
          required
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          size="small"
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <LoadingButton
          variant="contained"
          loading={loading}
          disabled={loading}
          color="primary"
          size="small"
          onClick={handleFormSubmit}
        >
          Sign In
        </LoadingButton>
      </Card>
    </Container>
  );
};

export default SignInPage;
