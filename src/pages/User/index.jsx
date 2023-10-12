import "./styles.scss";
import { APP_ROUTES } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import * as userActions from "../../features/user";
import Header from "../../components/Header";
import { useUser } from "../../lib/customHooks";

import Account from "../../components/Account";
import { MOCK_ACCOUNT } from "../../mock/account";

function User() {
  const { connectedUser, isAuthenticated, userLoading, isDataProfile } =
    useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!isAuthenticated || !connectedUser) {
        dispatch(userActions.signOut());
        navigate(APP_ROUTES.SIGN_IN);
      }
      dispatch(userActions.getStorage());
    }
  }, [userLoading, navigate, isAuthenticated, connectedUser, dispatch]);

  return (
    <>
      {isDataProfile && (
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
