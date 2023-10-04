import { useEffect, useState } from "react";
import { getAuthenticateUser } from "./common";
import { useDispatch } from "react-redux";
import * as userActions from "../features/user";

export function useUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedUser, setconnectedUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticateUser();
      setIsAuthenticated(authenticated);
      setconnectedUser(user);
      setUserLoading(false);
      await dispatch(userActions.getStorage());
    }

    getUserDetails();
  }, []);

  return { connectedUser, isAuthenticated, userLoading };
}
