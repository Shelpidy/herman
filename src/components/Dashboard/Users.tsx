import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Modal,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit, Add, Search } from "@mui/icons-material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import CloseIcon from "@mui/icons-material/Close";
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
} from "firebase/firestore";
import Swal from "sweetalert2";

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

interface AdminUserTableProps {
  users: User[];
}

const firestore = getFirestore();

// const userDoc = doc(firestore,"users")
const userCollection = collection(firestore, "users");

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "88vh",
  p: 4,
  overflow: "auto",
};

const Users = () => {
  const [expand, setExpand] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleExpand = (users: User) => {
    console.log(users);
    setSelectedUser(users);
    setExpand(true);
  };

  useEffect(() => {
    async function getUsers() {
      try {
        let _users: User[] = [];
        let usersQuery = query(userCollection);
        let usersSnapshot = await getDocs(usersQuery);
        let userDocs = usersSnapshot.forEach((snap) => {
          console.log(`${snap.id} ${JSON.stringify(snap.data())}`);
          let user = {
            id: snap.id,
            ...JSON.parse(JSON.stringify(snap.data())),
          };
          _users.push(user);
        });
        setUsers(_users);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (!users) {
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
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                color="primary.main"
                sx={{ fontWeight: "bold", fontFamily: "Poppins-Medium" }}
              >
                User
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontFamily: "Poppins-Medium" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontFamily: "Poppins-Medium" }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontFamily: "Poppins-Medium" }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontFamily: "Poppins-Medium" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter(
                (user) =>
                  user?.email.includes(searchQuery) ||
                  user?.address?.includes(searchQuery),
              )
              .map((user, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar
                      sx={{ width: "25px", height: "25px" }}
                      alt={user.firstName}
                      src={user.profileImage}
                    />
                  </TableCell>
                  <TableCell>
                    {user.firstName +
                      " " +
                      user.middleName +
                      " " +
                      user.lastName}
                  </TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    <IconButton onClick={() => handleExpand(user)}>
                      <ExpandCircleDownIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog
          open={expand}
          onClose={() => setExpand(false)}
          sx={{ maxWidth: "lg", padding: "10px" }}
        >
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={() => setExpand(false)}>
                <CloseIcon color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ marginTop: -1, textAlign: "center" }}>
              <Typography variant="h5">User Details</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Avatar
                  alt={selectedUser?.firstName}
                  src={selectedUser?.profileImage}
                  sx={{ width: "200px", height: "200px" }}
                ></Avatar>
                {/* <img
                  alt="Profile"
                  style={{
                    width: "28%", // Adjust the width as needed
                    height: "auto", // Auto height to maintain aspect ratio
                    maxWidth: "75%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={dummyUser.profileImage} // Use user's profile image
                /> */}
                <div>
                  <Typography variant="h6">
                    <strong>Name:</strong> {selectedUser?.firstName}{" "}
                    {selectedUser?.lastName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {selectedUser?.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Contact Number:</strong>{" "}
                    {selectedUser?.contactNumber}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Gender:</strong> {selectedUser?.gender}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Address:</strong> {selectedUser?.address}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Birth Date:</strong>{" "}
                    {selectedUser?.dateOfBirth?.toString()}
                  </Typography>
                </div>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </TableContainer>
    </Box>
  );
};

export default Users;
