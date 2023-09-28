import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "user",
  initialState: {
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    storage: "off",
    isConnected: false,
  },
  reducers: {
    signIn: (state, action) => {
      console.log(action);
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isConnected = true;
      if (action.payload.storage === "on") {
        const expirationTime = Date.now() + 3600000;
        const data = { token: state.token, email: state.email, storage: "on" };
        localStorage.setItem(
          "userData",
          JSON.stringify({ data, expirationTime })
        );
      } else {
        sessionStorage.setItem("userData", state.token);
      }
    },
    getStorage: (state) => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        const { data, expirationTime } = userData;
        if (expirationTime > Date.now()) {
          state.token = data.token;
          state.email = data.email;
          state.storage = data.storage;
          state.isConnected = true;
        } else {
          localStorage.removeItem("userData");
        }
      }
    },
    signOut: (state) => {
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      state.token = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.storage = "off";
      state.isConnected = false;
    },
    setProfile: (state, action) => {
      console.log(action);
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { signIn, getStorage, signOut, setProfile } = actions;
export default reducer;
