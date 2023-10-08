import "./styles.scss";
import { APP_ROUTES } from "../../utils/constants";
import { signInUser } from "../../services/services";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../features/user";
import { useNavigate } from "react-router";
import { useUser } from "../../lib/customHooks";

function Connexion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Faire en sorte que ce hook lance la connexion et la récupération si les données sont présente
  const { connectedUser } = useUser();
  const [errorUser, setErrorUser] = useState(false);
  const [isloadingUser, setIsLoadingUser] = useState(false);
  const userData = useSelector((state) => state.user);

  console.log("render : connexion");

  useEffect(() => {
    userData.isConnected && navigate(APP_ROUTES.PROFILE);
  }, [userData.isConnected, navigate, connectedUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoadingUser(true);
    const formData = new FormData(e.currentTarget);
    const connectingValues = Object.fromEntries(formData);
    const { data, error, isLoading } = await signInUser(connectingValues);
    setIsLoadingUser(isLoading);

    if (data) {
      dispatch(
        userActions.signIn({
          token: data.body.token,
          email: connectingValues.username,
          storage: connectingValues.rememberMe,
        })
      );
    }
    if (error) {
      setErrorUser(true);
      console.log("Erreur lors de la connexion: ", error);
    }
  }

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {isloadingUser && <p>Connexion en cours...</p>}
          {errorUser && (
            <p className="error-message">Erreur de Username / Password</p>
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
