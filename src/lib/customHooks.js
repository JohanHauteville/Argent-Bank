import { useEffect, useState } from "react";
import { getUserStorage } from "./common";
import { useDispatch } from "react-redux";
import * as userActions from "../features/user";

export function useUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedUser, setconnectedUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUserConnexionDetails() {
      const { authenticated, user } = await getUserStorage();
      setIsAuthenticated(authenticated);
      setconnectedUser(user);
      setUserLoading(false);
      await dispatch(userActions.getStorage());
    }

    getUserConnexionDetails();
  }, [dispatch]);

  return { connectedUser, isAuthenticated, userLoading };
}
