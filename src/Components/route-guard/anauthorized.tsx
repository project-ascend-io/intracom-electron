import { useNavigate } from "react-router-dom";
import Navbar from "../nav-bar/nav-bar";
import LeftsideBar from "../leftside-bar/leftside-bar";
import OrganiziationConfig from "../settings-dropdown/organization-configuration";

const Anauthorized = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <LeftsideBar />
        <OrganiziationConfig />
      </div>
    </>
  );
};

export default Anauthorized;
