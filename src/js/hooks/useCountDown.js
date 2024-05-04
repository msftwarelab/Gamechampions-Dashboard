import { useEffect, useState } from "react";

export const useCountDown = date => {
  const [countDownTime, setCountDownTime] = useState({
    seconds: "--",
    minutes: "--",
    hours: "--",
    days: "--"
  });
  useEffect(() => {
    let timeInterval = null;
    if (date) {
      timeInterval = setInterval(() => {
        setCountDownTime(getTimeRemaining(date));
      }, 1000);
    }
    return () => timeInterval && clearInterval(timeInterval);
  }, [date]);

  return countDownTime;
};

const getTimeRemaining = endDate => {
  let total = endDate - Date.now();

  const seconds = String(Math.floor((total / 1000) % 60)).padStart(2, "0");
  const minutes = String(Math.floor((total / 1000 / 60) % 60)).padStart(2, "0");
  const hours = String(Math.floor((total / (1000 * 60 * 60)) % 24)).padStart(
    2,
    "0"
  );
  const days = String(Math.floor(total / (1000 * 60 * 60 * 24))).padStart(
    2,
    "0"
  );

  return {
    days,
    hours,
    minutes,
    seconds
  };
};

export default useCountDown;
