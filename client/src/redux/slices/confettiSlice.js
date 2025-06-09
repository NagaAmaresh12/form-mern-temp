// confettiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const confettiSlice = createSlice({
  name: "confetti",
  initialState: { show: false },
  reducers: {
    triggerConfetti: (state) => {
      state.show = true;
    },
    stopConfetti: (state) => {
      state.show = false;
    },
  },
});

export const { triggerConfetti, stopConfetti } = confettiSlice.actions;
export default confettiSlice.reducer;
