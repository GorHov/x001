import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import IconPlay from "./assets/icons/play.png";
import IconPause from "./assets/icons/pause.png";
import IconStop from "./assets/icons/stop.png";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [pausedTime, setPausedTime] = useState(0);
  const intervalRef = useRef(null);

  const formatTime = useMemo(() => {
    return (seconds) => {
      let wholeSeconds = Math.floor(seconds);
      let minutes = Math.floor(wholeSeconds / 60)
        .toString()
        .padStart(2, "0");
      let remainingSeconds = (wholeSeconds % 60).toString().padStart(2, "0");
      let remainingMilliseconds = Math.floor(
        (seconds - wholeSeconds) * 10
      ).toString();

      return `${minutes}.${remainingSeconds}.${remainingMilliseconds}`;
    };
  }, []);

  const playPauseTimer = useCallback(() => {
    if (timeInput !== "") {
      if (!isRunning && !pausedTime) {
        setIsRunning(true);
        setSeconds(parseInt(timeInput) * 1000);
      } else if (pausedTime && !isRunning) {
        setIsRunning(true);
        setSeconds(pausedTime);
      } else {
        setIsRunning(false);
        setPausedTime(seconds);
      }
    }
  }, [timeInput, isRunning, pausedTime, seconds]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setPausedTime(0);
    setSeconds(parseInt(timeInput) * 1000);
    setTimeRemaining(formatTime(parseInt(timeInput)));
  }, [formatTime, timeInput]);

  const handleInputChange = useCallback((event) => {
    setTimeInput(event.target.value);
  }, []);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 10);
      }, 10);
      setTimeRemaining(formatTime(seconds / 1000));
    } else if (seconds === 0) {
      setIsRunning(false);
      setPausedTime(0);
      setTimeRemaining(formatTime(0));
      setTimeInput("");
    } else {
      clearInterval(intervalRef.current);
      setTimeRemaining(formatTime(pausedTime / 1000));
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds, pausedTime, formatTime]);

  const percentage =
    (parseInt(timeInput) * 1000 - seconds) / (parseInt(timeInput) * 10);

  return (
    <div className="countdown-container">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ height: `${percentage}%` }}
        ></div>
      </div>
      <div className="input-container">
        {!isRunning && !pausedTime ? (
          <input
            className="time-input"
            value={timeInput}
            onChange={handleInputChange}
          />
        ) : (
          <div className="time-input">
            {isRunning ? timeRemaining : formatTime(pausedTime / 1000)}
          </div>
        )}
        <div className="btn-container">
          <button onClick={playPauseTimer} className="start">
            {isRunning ? (
              <img src={IconPause} alt="pause" />
            ) : (
              <img src={IconPlay} alt="play" />
            )}
          </button>
          <button onClick={resetTimer} className="reset">
            <img src={IconStop} alt="stop" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
