import "./styles.scss";
import { useSelector } from "react-redux";
import EditProfileButton from "../EditProfileButton";

function Header() {
  const user = useSelector((state) => state.user);
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user.profile.firstName} {user.profile.lastName} !
      </h1>
      {user.profile && <EditProfileButton />}
    </div>
  );
}

export default Header;
