import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "editButton",
  initialState: false,
  reducers: {
    toggle: (state) => {
      return (state = !state);
    },
  },
});

export const { toggle } = actions;
export default reducer;
