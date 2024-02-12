import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const UserProfile = (user: User) => {
  // const theme = useTheme();
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
        <div>
          <Avatar
            alt={`${user.firstName} ${user.lastName}'s profile`}
            src={user.profileImage}
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
        </div>
      </Box>
      <Box sx={{ marginTop: 0 }}>
        <Typography variant="h5" fontFamily="Poppins-Medium" component="div">
          {user.firstName} {user.middleName} {user.lastName}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
              primary="Contact"
              secondary={user?.contactNumber}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
              primary="Address"
              secondary={user?.address}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
              primary="Gender"
              secondary={user?.gender}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
              primary="Region"
              secondary={user?.region}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
              primary="Date of Birth"
              secondary={new Date(
                user.dateOfBirth.seconds * 1000,
              ).toDateString()}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
              primary="Email"
              secondary={user?.email}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default UserProfile;
