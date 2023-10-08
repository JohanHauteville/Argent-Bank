import { useEffect, useState } from "react";
import { getUserStorage } from "./common";
import { useDispatch } from "react-redux";
import * as userActions from "../features/user";
import { getProfileFromAPI } from "../services/services";

export function useUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedUser, setconnectedUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isDataProfile, setIsDataProfile] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUserConnexionDetails() {
      // Essai de récupération des info de connexion de l'utilisateur depuis le Storage
      const { authenticated, user } = await getUserStorage();
      setIsAuthenticated(authenticated);
      setconnectedUser(user);

      // Utilisateur authentifié?
      if (authenticated) {
        // Essai de récupération du profile utilisateur depuis l'API
        const userData = await getProfileFromAPI(user.token);
        // Si le profil est bien récupéré
        if (userData) {
          const userInfo = {
            firstName: userData.data.body.firstName,
            lastName: userData.data.body.lastName,
          };
          setIsDataProfile(true);
          // récupération dans Redux du profil utilisateur
          dispatch(userActions.update(userInfo));
        }
      }
      // récupération dans Redux du token utilisateur contenu dans le Storage
      dispatch(userActions.getStorage());
      setUserLoading(false);
    }

    getUserConnexionDetails();
  }, [dispatch]);

  return { connectedUser, isAuthenticated, userLoading, isDataProfile };
}
