/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

const ExamPage = () => {
  const [time, setTime] = useState(0);
  const starter = useRef();
  const stopper = useRef();

  const startExamTimer = setInterval(() => {
    setTime((prev) => prev + 1);
  }, 1000);

  // useEffect(() => {
  //   startExamTimer();
  // }, [starter]);

  // return clearInterval(timer);

  const stopExamTimer = clearInterval(startExamTimer);

  // return clearInterval(timer);

  // useEffect(() => {
  //   statExamTimer();
  // }, [time]);

  return (
    <div>
      <h1>Exam Page</h1>
      <button onClick={startExamTimer} ref={starter}>
        Start Exam!
      </button>
      <div>
        <h2>{`${time} <- Timer`}</h2>
      </div>

      <button onClick={stopExamTimer} ref={stopper}>
        Done!
      </button>
    </div>
  );
};

export default ExamPage;
