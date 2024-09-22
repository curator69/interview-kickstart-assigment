import { Typography } from "@mui/material";
import CreateWebinar from "./CreateWebinar";

const Navbar = ({ setWebinars }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <Typography>Webinar</Typography>
      <CreateWebinar setWebinars={setWebinars} />
    </div>
  );
};

export default Navbar;
