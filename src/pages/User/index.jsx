import "./styles.scss";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { getProfile } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as userActions from "../../features/user";

function User() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/sign-in/");
      } else {
        try {
          const { data, isLoading } = await getProfile(token);
          if (data) {
            console.log(data);
            dispatch(userActions.setProfile(data.body));
            setIsDataLoading(isLoading);
          }
        } catch (error) {
          console.log("Erreur lors de la récupération du profil :", error);
        }
      }
    };
    fetchData();
  }, [navigate, token, dispatch]);

  return (
    <>
      <Navigation />
      {console.log(user)}
      {isDataLoading ? (
        "Chargement des données..."
      ) : (
        <main className="main bg-dark">
          <div className="header">
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}
            </h1>
            <button className="edit-button">Edit Name</button>
          </div>
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
      <Footer />
    </>
  );
}

export default User;
