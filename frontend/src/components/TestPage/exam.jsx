/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import MathLive from "../Math";

const ExamPage = () => {
  const [time, setTime] = useState(0);
  const [ans, setAns] = useState([]);
  const startButtonRef = useRef();
  const stopButtonRef = useRef();
  const intervalRef = useRef();

  const [value, setValue] = useState("");

  const startExamTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopExamTimer = () => {
    clearInterval(intervalRef.current);
  };

  const [answers, setAnswers] = useState({});

  async function doneExam() {
    try {
      setAnswers(value);
    } catch (err) {
      console.error(err);
    }
  }

  const sendExamData = () => {
    stopExamTimer();
    alert(`You took ${time} seconds!`);
    localStorage.setItem("time", time);
    // Do something with the exam data, e.g., setAns(data);
    setTimeout(() => {
      //2 seconds redirect!
      navigator("/");
    }, 2000);
  };

  useEffect(() => {
    return () => {
      // Cleanup the interval on component unmount
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <h1>Exam Page</h1>
      <button onClick={startExamTimer} ref={startButtonRef}>
        Start Exam!
      </button>
      <MathLive />
      <div>
        <h2>{`${time} <- Time Elapsed`}</h2>
        <LineChart
          xAxis={[{ data: [0, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </div>

      <button onClick={sendExamData} ref={stopButtonRef}>
        Done!
      </button>
    </div>
  );
};

export default ExamPage;
