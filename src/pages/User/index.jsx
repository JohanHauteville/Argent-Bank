import "./styles.scss";
import { APP_ROUTES } from "../../utils/constants";
import { getProfile } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as userActions from "../../features/user";
import Header from "../../components/Header";
import { useUser } from "../../lib/customHooks";

import Account from "../../components/Account";
import { MOCK_ACCOUNT } from "../../mock/account";

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
          {MOCK_ACCOUNT &&
            MOCK_ACCOUNT.map((account) => (
              <Account
                key={account.title}
                title={account.title}
                amount={account.amount}
                description={account.description}
              />
            ))}
        </main>
      )}
    </>
  );
}

export default User;
