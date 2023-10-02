import "./styles.scss";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.user);
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user.profile.firstName} {user.profile.lastName} !
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default Header;
