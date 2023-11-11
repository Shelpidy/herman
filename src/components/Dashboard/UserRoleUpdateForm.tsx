import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const UserRoleUpdateForm: React.FC = () => {
  const [formData, setFormData] = useState({ role: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Add any additional validation logic if needed
    try {
      // Set loading to true to activate the LoadingButton spinner
      setLoading(true);

      // Simulate an API call or any asynchronous task
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // After the task is complete, reset loading state
      setLoading(false);

      // Add any further actions after successful submission
      console.log("Form submitted:", formData);
    } catch (error) {
      // Handle errors if needed
      console.error("Error submitting form:", error);
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Typography variant="h5" gutterBottom>
        Update User Role
      </Typography>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
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
        loading={loading}
        style={{ marginTop: "20px" }}
      >
        Update Role
      </LoadingButton>
    </Container>
  );
};

export default UserRoleUpdateForm;
