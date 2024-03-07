import React from "react";
import Typography from "@mui/material/Typography";

interface AudioBadgeProps {
  status:
    | "draft"
    | "write"
    | "edit"
    | "translate"
    | "read"
    | "final-edit"
    | "publish"
    | "manage";
}

const colors = {
  draft: "gray",
  write: "#4caf50",
  edit: "#4cafa0",
  translate: "#1e90ff",
  read: "#ff4500",
  "final-edit": "#8cafa4",
  publish: "#8a2be2",
  manage: "#ff8c00",
};
const AudioBadge: React.FC<AudioBadgeProps> = ({ status }) => {
  return (
    <Typography
      variant="caption"
      className="w-[70px] text-center"
      sx={{
        backgroundColor: colors[status],
        color: "white",
        padding: "2px 8px",
        borderRadius: "20px", // Adjust the value for more or less rounded corners
        display: "inline-block", // Ensures that the background covers only the content width
      }}
    >
      {status}
    </Typography>
  );
};

export default AudioBadge;
