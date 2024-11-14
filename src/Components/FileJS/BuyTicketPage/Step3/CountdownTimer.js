import React, { useState, useEffect } from "react";
import styles from "../../../FileCSS/BuyTicketPage/Step3/ComboPage.module.css";

const CountdownTimer = ({ initialMinutes = 0, initialSeconds = 0, onEnd }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(timerId);
        if (onEnd) onEnd();
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [minutes, seconds, onEnd]);

  return (
    <div className={styles.countdown} >
      <span>Countdown Clock</span>
      <div className={styles.timer}>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{String(minutes).padStart(2, '0')}</span>
          <span className={styles.timeLabel}>Minutes</span>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{String(seconds).padStart(2, '0')}</span>
          <span className={styles.timeLabel}>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
