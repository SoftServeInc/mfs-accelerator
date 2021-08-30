import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  info: {
    visible: false,
    message: "",
  },
};

const snacksSlice = createSlice({
  name: "snacks",

  initialState,

  reducers: {
    toggleInfo(state, action: PayloadAction<boolean>) {
      state.info.visible = action.payload;
    },
    showInfoSnack(state, action: PayloadAction<string>) {
      state.info.visible = true;
      state.info.message = action.payload;
    },
  },
});

export const { toggleInfo, showInfoSnack } = snacksSlice.actions;

export default snacksSlice.reducer;
