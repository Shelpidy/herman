import React from "react";
import { Typography } from "@mui/material";

function BlogPage() {
  const [blog, setBlog] = React.useState("");
  return (
    <div>
      <Typography variant="h1">Blog Page!</Typography>
      <Typography variant="body1">This is the home page.</Typography>
    </div>
  );
}

export default BlogPage;
