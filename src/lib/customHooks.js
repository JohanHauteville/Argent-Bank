import { useEffect, useState } from "react";
import { getUserStorage } from "./common";
import { useDispatch } from "react-redux";
import * as userActions from "../features/user";
import { getUserProfile } from "../features/user";

export function useUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedUser, setconnectedUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isDataProfile, setIsDataProfile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserConnexionDetails() {
      setUserLoading(true);
      // Essai de récupération des info de connexion de l'utilisateur depuis le Storage
      const { authenticated, user } = await getUserStorage();
      setIsAuthenticated(authenticated);
      setconnectedUser(user);

      // Utilisateur authentifié?
      if (authenticated) {
        // dispatch(getUserProfile(user.token));

        // Les données du profil de l'utilisateur ont bien été récupérées ?
        const isUserProfileDataLoaded = await dispatch(
          getUserProfile(user.token)
        );
        setIsDataProfile(isUserProfileDataLoaded);
      }
      // Récupération depuis Redux du token utilisateur contenu dans le Storage
      dispatch(userActions.getStorage());
      setUserLoading(false);
    }

    getUserConnexionDetails();
  }, [dispatch]);

  return { connectedUser, isAuthenticated, userLoading, isDataProfile };
}
