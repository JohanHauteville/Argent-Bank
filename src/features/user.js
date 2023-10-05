import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "user",
  initialState: {
    status: "void",
    token: null,
    email: null,
    profile: {},
    storage: "off",
    isConnected: false,
  },
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isConnected = true;
      if (action.payload.storage === "on") {
        // const expirationTime = Date.now() + 3600000;
        const data = { token: state.token, email: state.email, storage: "on" };
        localStorage.setItem(
          "userData",
          JSON.stringify({ data })
          // JSON.stringify({ data, expirationTime })
        );
      } else {
        const data = { token: state.token, email: state.email, storage: "off" };
        console.log("data for session storage", data);
        console.log("action : ", action);
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
        // const { data, expirationTime } = userData;
        // if (expirationTime > Date.now()) {
        state.token = data.token;
        state.email = data.email;
        state.storage = data.storage;
        state.isConnected = true;
        // } else {
        //   userData = null;
        //   localStorage.removeItem("userData");
        //   sessionStorage.removeItem("userData");
        // }
      }
    },
    signOut: (state) => {
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      state.status = "void";
      state.token = null;
      state.email = null;
      state.profile = {};
      state.storage = "off";
      state.isConnected = false;
    },
    update: (state, action) => {
      action.payload.firstName &&
        (state.profile.firstName = action.payload.firstName);
      action.payload.lastName &&
        (state.profile.lastName = action.payload.lastName);
    },
  },
});

export const { signIn, getStorage, signOut, update } = actions;
export default reducer;
