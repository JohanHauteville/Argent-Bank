import { createSlice } from "@reduxjs/toolkit";
import {
  signInUser,
  getProfileFromAPI,
  editProfileFromAPI,
} from "../services/services";
import { APP_ROUTES } from "../utils/constants";

const { actions, reducer } = createSlice({
  name: "user",
  initialState: {
    status: "void",
    token: null,
    email: null,
    profile: {},
    storage: "Session",
    isConnected: false,
  },
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isConnected = true;
      if (action.payload.storage === "on") {
        const data = {
          token: state.token,
          email: state.email,
          storage: "Local",
        };
        localStorage.setItem("userData", JSON.stringify({ data }));
      } else {
        const data = {
          token: state.token,
          email: state.email,
          storage: "Session",
        };
        console.log("data for session storage", data);
        sessionStorage.setItem("userData", JSON.stringify({ data }));
      }
    },
    getStorage: (state) => {
      let userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData) {
        userData = JSON.parse(sessionStorage.getItem("userData"));
      }
      if (userData) {
        const { data } = userData;
        state.token = data.token;
        state.email = data.email;
        state.storage = data.storage;
        state.isConnected = true;
      }
    },
    signOut: (state) => {
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      state.status = "void";
      state.token = null;
      state.email = null;
      state.profile = {};
      state.storage = "Session";
      state.isConnected = false;
    },
    update: (state, action) => {
      action.payload.firstName &&
        (state.profile.firstName = action.payload.firstName);
      action.payload.lastName &&
        (state.profile.lastName = action.payload.lastName);
    },
    // status : (state, action) => {}
  },
});

// Action Creator Thunks
export const connectUser = (userDataLogin) => {
  return async (dispatch) => {
    const { data, error } = await signInUser(userDataLogin);
    if (data) {
      dispatch(
        signIn({
          token: data.body.token,
          email: userDataLogin.username,
          storage: userDataLogin.rememberMe,
        })
      );
    }
    if (error) {
      console.log("Erreur lors de la connexion: ", error);
    }
  };
};

export const getUserProfile = (token) => {
  return async (dispatch) => {
    const { data, error } = await getProfileFromAPI(token);

    // Si le status retourné est 401: déconnexion et navigation vers la page de connexion
    if (data.status === 401) {
      dispatch(signOut());
      window.location.href(APP_ROUTES.SIGN_IN);
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
      dispatch(update(userInfo));
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
      dispatch(signOut());
      window.location.href(APP_ROUTES.SIGN_IN);
      return false;
    }
    if (!error) {
      dispatch(update(data.body));
    }
  };
};

export const { signIn, getStorage, signOut, update } = actions;
export default reducer;
