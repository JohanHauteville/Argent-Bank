import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "user",
  initialState: {
    status: {
      message: "",
      class: "notification",
    },
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
      state.status = {
        message: "",
        class: "notification",
      };
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
    updateStatus: (state, action) => {
      state.status.message = action.payload.message;
      state.status.class = action.payload.class;
    },
  },
});

export const { signIn, getStorage, signOut, update, updateStatus } = actions;
export default reducer;
