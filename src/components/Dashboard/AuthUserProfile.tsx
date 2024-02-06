import { Edit, PhotoCamera, SaveAlt } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/customHooks";
import uploadFileToFirebase from "../../utils/utils";
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
initializeApp(firebaseConfig);

const firestore = getFirestore();

// interface UserProfileProps {
//   user: User;
//   onRefetch: () => void;
// }

const AuthUserProfile = () => {
  // const theme = useTheme();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [_, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);

  const [updateUser, setUpdateUser] = useState<{
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    address: string;
    gender: string;
    contactNumber: string;
    dateOfBirth: Date;
    profileImage: string;
  }>({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    contactNumber: "",
    dateOfBirth: new Date(),
    profileImage: "",
  });
  const navigate = useNavigate();
  const _currentUser = useCurrentUser();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    setCurrentUser(_currentUser);
    // console.log({CurrentUser:_currentUser})
  }, [_currentUser]);

  useEffect(() => {
    getUser();
  }, [currentUser]);

  async function getUser() {
    if (!currentUser) {
      return;
    }
    try {
      let userDoc = doc(firestore, `users/${currentUser.id}`);
      let snap = await getDoc(userDoc);
      console.log(`${snap.id} ${JSON.stringify(snap.data())}`);
      let _user = { id: snap.id, ...JSON.parse(JSON.stringify(snap.data())) };
      setUserProfile(_user);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = (userprofile: User) => {
    console.log(userprofile);
    setIsEditing(true);
    // Initialize editedData with the current user data
    setEditedData(updateUser);
    setUpdateUser({
      id: userprofile?.id,
      firstName: userprofile?.firstName,
      middleName: userprofile?.middleName || "",
      lastName: userprofile?.lastName,
      email: userprofile?.email,
      address: userprofile?.address || "",
      gender: userprofile?.gender,
      contactNumber: userprofile?.contactNumber,
      dateOfBirth: new Date(userProfile?.dateOfBirth.seconds! * 1000),
      profileImage: userprofile?.profileImage || "",
    });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  ///// performs the put request//////
  async function handleUpdate(userId: string) {
    // Logic to update the appointment
    try {
      let userDoc = doc(firestore, `users/${userId}`);
      let { id, ...newUser } = updateUser;
      await updateDoc(userDoc, { ...newUser });
    } catch (error: any) {
      console.log(error.message);
      Toast.fire({
        icon: "error",
        iconColor: "red",
        text: "An error occurred while updating.",
      });
    } finally {
      setLoading(false);
      getUser();
      setIsEditing(false);
    }
    // Update the appointments state after updating
  }

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    let files = event?.target?.files;
    if (!files) return;
    let url = URL.createObjectURL(files[0]);
    let response = await fetch(url);
    let blob = await response.blob();
    let imageUrl = await uploadFileToFirebase({
      folderName: "ProfileImage",
      userId: currentUser.id as string,
      blob,
    });

    setUpdateUser((prev) => ({ ...prev, profileImage: imageUrl }));
    setUserProfile((prev) => {
      if (prev) {
        return { ...prev, profileImage: imageUrl };
      } else {
        return null;
      }
    });
  };

  if (!userProfile) {
    return (
      <Box
        sx={{
          height: "50vh",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <CircularProgress color="primary" size={25} />
        <Typography variant="caption" sx={{color: "primary.main" }}>
          LOADING...
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <Box sx={{ marginRight: 5 }}>
        {/* Avatar */}
        <div>
          {isEditing ? (
            <label htmlFor="avatar-input">
              <Avatar
                alt={`${updateUser.firstName} ${updateUser.lastName}'s profile`}
                src={updateUser.profileImage}
                sx={{
                  maxWidth: "200px",
                  minWidth: "160px",
                  marginTop: { xs: 0, sm: -28 },
                  width: "auto", // Make the width 100%
                  height: "auto",
                  borderRadius: "10px", // Rounded edges
                  cursor: "pointer",
                }}
              />
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          ) : (
            <Avatar
              alt={`${userProfile.firstName} ${userProfile.lastName}'s profile`}
              src={userProfile.profileImage || "/default-avatar.png"}
              sx={{
                maxWidth: "200px",
                minWidth: "160px",
                marginTop: { xs: 0, sm: -30 },
                width: "auto", // Make the width 100%
                height: "auto",
                borderRadius: "10px", // Rounded edges
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </Box>
      <Box sx={{ marginTop: 0 }}>
        <Typography variant="h5" fontFamily="Poppins-Medium">
          {isEditing ? (
            <TextField
              name="firstName"
              variant="outlined"
              label="First Name"
              sx={{ marginLeft: 2, marginTop: 1 }}
              size="small"
              value={updateUser.firstName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, firstName: e.target.value })
              }
            />
          ) : (
            `${userProfile.firstName}`
          )}{" "}
          {isEditing ? (
            <TextField
              name="middleName"
              variant="outlined"
              label="Middle Name"
              sx={{ marginLeft: 2, marginTop: 1 }}
              size="small"
              value={updateUser.middleName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, middleName: e.target.value })
              }
            />
          ) : (
            `${userProfile.middleName}`
          )}{" "}
          {isEditing ? (
            <TextField
              variant="outlined"
              name="lastName"
              label="Last Name"
              size="small"
              sx={{ marginTop: 1, marginLeft: { xs: 2 } }}
              value={updateUser.lastName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, lastName: e.target.value })
              }
            />
          ) : (
            userProfile.lastName
          )}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            {isEditing ? (
              <TextField
                variant="outlined"
                name="contactNumber"
                label="Phone Number"
                size="small"
                value={updateUser.contactNumber}
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    contactNumber: e.target.value,
                  })
                }
              />
            ) : (
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
                primary="Contact"
                secondary={userProfile?.contactNumber}
              />
            )}{" "}
          </ListItem>
          <ListItem>
            {isEditing ? (
              <TextField
                variant="outlined"
                name="email"
                label="Email"
                size="small"
                value={updateUser.email}
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, email: e.target.value })
                }
              />
            ) : (
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
                primary="Address"
                secondary={userProfile?.address}
              />
            )}{" "}
          </ListItem>
          <ListItem>
            {isEditing ? (
              <TextField
                variant="outlined"
                name="gender"
                label="Gender"
                size="small"
                value={updateUser.gender}
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, gender: e.target.value })
                }
              />
            ) : (
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
                primary="Gender"
                secondary={userProfile?.gender}
              />
            )}{" "}
          </ListItem>
          <ListItem>
            {isEditing ? (
              <TextField
                variant="outlined"
                name="dateOfBirth"
                label="Date of Birth"
                size="small"
                type="date"
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    dateOfBirth: new Date(e.target.value),
                  })
                }
              />
            ) : (
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
                primary="Date of Birth"
                secondary={new Date(
                  userProfile.dateOfBirth.seconds * 1000,
                ).toDateString()}
              />
            )}{" "}
          </ListItem>
          <ListItem>
            {isEditing ? (
              <TextField
                variant="outlined"
                name="address"
                label="Address"
                size="small"
                value={updateUser.address}
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, address: e.target.value })
                }
              />
            ) : (
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
                primary="Email"
                secondary={userProfile?.email}
              />
            )}{" "}
          </ListItem>
          <ListItem>
            {isEditing ? (
              <LoadingButton
                size="small"
                variant="contained"
                loading={loading}
                disabled={loading}
                color="inherit"
                onClick={() => handleUpdate(userProfile.id)}
              >
                <SaveAlt />
                <span style={{ marginLeft: 5 }}>Save</span>
              </LoadingButton>
            ) : (
              <LoadingButton
                size="small"
                variant="contained"
                color="inherit"
                onClick={() => handleEdit(userProfile)}
              >
                <Edit /> <span style={{ marginLeft: 5 }}>Edit</span>
              </LoadingButton>
            )}
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default AuthUserProfile;
