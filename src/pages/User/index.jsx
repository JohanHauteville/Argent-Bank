import "./styles.scss";
import { getProfile } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as userActions from "../../features/user";
import Header from "../../components/Header";
import checkAuthentication from "../../utils/authentification";

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // const [userData, setUserData] = useState({});

  console.log("render : User Page");

  useEffect(() => {
    const fetchData = async () => {
      checkAuthentication(dispatch);
      // setIsConnected(user.isConnected);
      console.log("is Connected = ", user.isConnected);
      console.log("fetchData");
      if (!user.isConnected) {
        console.log("not Connected");
        console.log("user", user);
        navigate("/sign-in/");
      } else {
        try {
          console.log("getProfile");

          const { data, isLoading } = await getProfile(user.token);
          console.log(data);
          if (data) {
            dispatch(userActions.setProfile(data.body));
            setIsDataLoading(isLoading);
          }
        } catch (error) {
          console.log("Erreur lors de la récupération du profil :", error);
        }
      }
      setIsLoadingUser(false);
    };
    fetchData();
  }, [navigate, user.isConnected, user.token, dispatch]);

  useEffect(() => {
    if (isLoadingUser) {
      // Attendre que isLoadingUser soit faux pour continuer
      return;
    }

    // Mettez ici le code que vous souhaitez exécuter une fois que l'utilisateur est connecté.
    console.log(
      "L'utilisateur est connecté, vous pouvez exécuter du code ici."
    );
  }, [isLoadingUser]);

  return (
    <>
      {user.isConnected && (
        <main className="main bg-dark">
          <Header />
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default User;
