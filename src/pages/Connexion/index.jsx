import "./styles.scss";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { signInUser } from "../../services/services";
import { useState } from "react";

function Connexion() {
  const [dataUser, setDataUser] = useState(null);
  const [errorUser, setErrorUser] = useState(null);
  const [isloadingUser, setIsLoadingUser] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const connectingValues = Object.fromEntries(formData);
    const { data, error, isLoading } = await signInUser(connectingValues);
    await setDataUser(data);
    setIsLoadingUser(isLoading);
    // console.log(dataUser);
    // console.log(data);
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
              <input type="text" id="username" name="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
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
