import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import editProfileButtonReducer from "../features/editButton";

export default configureStore({
  reducer: {
    user: userReducer,
    // profile: profileReducer,
    editProfileButton: editProfileButtonReducer,
  },
});
