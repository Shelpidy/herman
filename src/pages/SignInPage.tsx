import React from "react";
import { Button, TextField, Typography } from "@mui/material";

interface SignInFormValues {
  email: string;
  password: string;
}

function SignInPage() {
  const [formData, setFormData] = React.useState<SignInFormValues>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: Submit the sign-in form data to your backend server
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Typography variant="h1">Sign in</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
}

export default SignInPage;
