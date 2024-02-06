import React from "react";
import {
  ListItem,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
  Avatar,
} from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";

interface AudioListItemProps {
  audio: Audio2;
}

const AudioListItem: React.FC<AudioListItemProps> = ({ audio }) => {
  const [status, setStatus] = React.useState<"draft" | "review" | "publish">(
    audio.status,
  );
  const handleStatusChange = (event: SelectChangeEvent<any>) => {
    let s = event.target.value;
    setStatus(s);
  };
  const [deleted, setDeleted] = React.useState<boolean>(false);

  const handleDelete = () => {
    setDeleted(true);
  };
  if (deleted) {
    return null;
  }
  return (
    <ListItem
      sx={{ marginTop: 2, justifyContent: "space-evenly" }}
      key={audio.id}
    >
      <Box sx={{ marginX: 2 }}>
        <Avatar sx={{ width: 50, height: 50 }} src={"/record2.png"}></Avatar>
      </Box>

      <ListItemText
        primary={audio.title}
        style={{ width: "fit-content" }}
        primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
        secondary={
          audio.author ? `Author: ${audio.author.fullName || ""}` : "No Author"
        }
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "fit-content",
        }}
      >
        <Typography variant="subtitle1" color="textSecondary">
          {audio.numberOfLikes} Likes
        </Typography>
        <Typography sx={{ marginX: 2 }} variant="caption" color="textSecondary">
          {moment(new Date(audio.createdAt.seconds * 1000)).calendar()}
        </Typography>
      </Box>

      <Box sx={{ marginLeft: 2 }}>
        <ReactAudioPlayer src={audio.url} controls />
      </Box>

      <Box sx={{ marginLeft: 2, display: "flex", alignItems: "center" }}>
        <Select
          value={audio.status}
          size="small"
          onChange={handleStatusChange}
          sx={{ marginRight: 1 }}
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="review">Review</MenuItem>
          <MenuItem value="publish">Publish</MenuItem>
        </Select>

        <Typography variant="caption" color="textSecondary">
          Status: {status}
        </Typography>
      </Box>

      <IconButton color="primary" onClick={handleDelete} sx={{ marginLeft: 2 }}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default AudioListItem;
