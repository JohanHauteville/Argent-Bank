// Action Creator Thunks
import {
  signInUser,
  getProfileFromAPI,
  editProfileFromAPI,
} from "../services/services";
import { APP_ROUTES } from "../utils/constants";
import * as userActions from "../features/user";

export const connectUser = (userDataLogin) => {
  return async (dispatch) => {
    dispatch(
      userActions.updateStatus({
        message: "Connexion en cours...",
        class: "notification",
      })
    );
    const { data, error } = await signInUser(userDataLogin);
    if (data) {
      dispatch(
        userActions.signIn({
          token: data.body.token,
          email: userDataLogin.username,
          storage: userDataLogin.rememberMe,
        })
      );
      dispatch(
        userActions.updateStatus({ message: "", class: "notification" })
      );
    }
    if (error) {
      console.log("Erreur lors de la connexion: ", error);
      dispatch(
        userActions.updateStatus({
          message: "Erreur de login/mot de passe",
          class: "notification--error",
        })
      );
    }
  };
};

export const getUserProfile = (token) => {
  return async (dispatch) => {
    const { data } = await getProfileFromAPI(token);

    // Si le status retourné est 401: déconnexion et navigation vers la page de connexion
    if (data.status === 401) {
      dispatch(userActions.signOut());
      window.location.href = APP_ROUTES.SIGN_IN;
      return false;
    }

    // Si le profil est bien récupéré
    if (data) {
      const userInfo = {
        firstName: data.body.firstName,
        lastName: data.body.lastName,
      };
      // Mise à jour dans Redux des informations du profil utilisateur
      // firstname + lastName
      dispatch(userActions.update(userInfo));
      return true;
    }
    return false;
  };
};

export const editUserProfile = (token, newUserData) => {
  return async (dispatch) => {
    const { data, error } = await editProfileFromAPI(token, newUserData);
    // Si le status retourné est 401: déconnexion et navigation vers la page de connexion
    if (data.status === 401) {
      dispatch(userActions.signOut());
      window.location.href = APP_ROUTES.SIGN_IN;
      return false;
    }
    if (!error) {
      dispatch(userActions.update(data.body));
    }
  };
};
