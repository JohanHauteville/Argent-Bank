import logo from "../../assets/img/argentBankLogo.png";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../features/user";
import { APP_ROUTES } from "../../utils/constants";

function Banner() {
  const dispatch = useDispatch();
  const { isConnected, profile } = useSelector((state) => state.user);

  return (
    <>
      <nav className="main-nav">
        <Link to={"/"} className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {isConnected ? (
            <>
              <i className="fa fa-user-circle"></i>
              <Link to={APP_ROUTES.PROFILE}>
                {profile && profile.firstName}
              </Link>
              <Link
                to={"/"}
                className="main-nav-item"
                onClick={() => dispatch(userActions.signOut())}
              >
                Sign out
              </Link>
            </>
          ) : (
            <Link to={APP_ROUTES.SIGN_IN} className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Banner;
