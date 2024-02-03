/* eslint-disable no-unused-vars */
import { useState } from "react";

const ExamFinalized = () => {
  const [marks, setMarks] = useState(20);

  //might have to use some local storage approach for this!

  return (
    <div>
      <h1>Your Exam is Over!</h1>
      <p>Marks {marks}</p>
    </div>
  );
};

export default ExamFinalized;
