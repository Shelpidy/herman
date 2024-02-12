import { LoadingButton } from "@mui/lab";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
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

const userCollection = collection(firestore, "users");

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});

const UserRoleUpdateForm: React.FC = () => {
  const [formData, setFormData] = useState({ role: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      let _users: User[] = [];
      let usersQuery = query(
        userCollection,
        where("email", "==", formData.email),
      );
      let usersSnapshot = await getDocs(usersQuery);
      usersSnapshot.forEach((snap) => {
        console.log(`${snap.id} ${JSON.stringify(snap.data())}`);
        let user = {
          id: snap.id,
          ...JSON.parse(JSON.stringify(snap.data())),
        };
        _users.push(user);
      });

      console.log({ Users: _users });
      if (_users.length < 1) {
        Toast.fire({
          text: "Email does not exist",
          icon: "warning",
        });
      } else {
        let _user = _users[0];
        let userDoc = doc(firestore, `users/${_user.id}`);
        await updateDoc(userDoc, { role: formData.role });
        Toast.fire({
          text: `User role with email ${formData.email} is updated to ${formData.role}`,
          icon: "success",
        });
      }
    } catch (err) {
      console.log(err);
      Toast.fire({
        text: "Update failed. Check your internet connection",
        icon: "warning",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Typography gutterBottom>Update User Role</Typography>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          size="small"
          label="Role"
          value={formData.role}
          onChange={(e) => handleInputChange("role", e.target.value as string)}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
        size="small"
        onChange={(e) => handleInputChange("email", e.target.value)}
      />

      <LoadingButton
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        size="small"
        disabled={loading}
        loading={loading}
        style={{ marginTop: "20px" }}
      >
        Update Role
      </LoadingButton>
    </Container>
  );
};

export default UserRoleUpdateForm;
