import ReactConfetti from "react-confetti";
import { useSelector, useDispatch } from "react-redux";
import { stopConfetti } from "@/redux/slices/confettiSlice.js";
import React from "react";

const ConfettiWrapper = () => {
  const showConfetti = useSelector((state) => state.confetti.show);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        dispatch(stopConfetti());
      }, 3000); // show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return showConfetti ? <ReactConfetti /> : null;
};

export default ConfettiWrapper;
