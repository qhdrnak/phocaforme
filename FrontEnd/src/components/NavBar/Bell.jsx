import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Bell = () => {
  return (
    <Badge color="primary" variant="dot">
      <NotificationsIcon id="bell-icon" color="info" />
    </Badge>
  );
};

export default Bell;
