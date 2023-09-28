import "./styles.scss";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { signInUser } from "../../services/services";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../features/user";
import { useNavigate } from "react-router";

function Connexion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorUser, setErrorUser] = useState(null);
  const [isloadingUser, setIsLoadingUser] = useState(null);
  const userData = useSelector((state) => state.user);
  const isConnected = useSelector((state) => state.user.isConnected);

  useEffect(() => {
    dispatch(userActions.getStorage());
    isConnected && navigate("/user/");
  }, [dispatch, isConnected, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
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
      navigate("/user/");
    }
    setErrorUser(error);
  }

  return (
    <>
      <Navigation />
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
      <Footer />
    </>
  );
}

export default Connexion;
