import "./styles.scss";
import { APP_ROUTES } from "../../utils/constants";
import { getProfile } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as userActions from "../../features/user";
import Header from "../../components/Header";
import { useUser } from "../../lib/customHooks";

function User() {
  const { connectedUser, isAuthenticated, userLoading } = useUser();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isUserProfileLoading, setIsUserProfileLoading] = useState(true);

  console.log("render : User Page");

  useEffect(() => {
    if (!userLoading) {
      if (!isAuthenticated || !connectedUser) {
        console.log("page user: supression");
        dispatch(userActions.signOut());
        navigate(APP_ROUTES.SIGN_IN);
      }
      dispatch(userActions.getStorage());
    }
  }, [userLoading, navigate, isAuthenticated, connectedUser, dispatch]);

  useEffect(() => {
    async function getUserProfile() {
      try {
        console.log("getProfile");
        const { data, isLoading } = await getProfile(connectedUser.token);
        console.log(data);
        if (data) {
          await dispatch(userActions.update(data.body));
          setIsUserProfileLoading(false);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération du profil :", error);
      }
    }
    if (user.isConnected) {
      if (!userLoading) {
        // console.log(user);
        // if (isUserProfileLoading) {
        if (!user.profile.firstName) {
          getUserProfile();
        }
        // }
      }
    }
  }, [user, userLoading, connectedUser, dispatch]);

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
