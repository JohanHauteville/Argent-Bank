import "./styles.scss";
import { APP_ROUTES } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { connectUser } from "../../features/user-actions";
import { useUser } from "../../lib/customHooks";

function Connexion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const notification = useSelector((state) => state.user.status);
  useUser();

  useEffect(() => {
    userData.isConnected && navigate(APP_ROUTES.PROFILE);
  }, [userData.isConnected, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const connectingValues = Object.fromEntries(formData);
    dispatch(connectUser(connectingValues));
  }

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {notification.message !== "" && (
            <p className={notification.class}>{notification.message}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={userData.email ? userData.email : ""}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Connexion;
