/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StatPage from "./components/Math/Stat/StatPage";
import PureMath from "./components/Math/PureMath/PureMath";
import HomePage from "./components/Main/HomePage";
import AddStat from "./components/Math/Stat/AddStat";
import AddPure from "./components/Math/PureMath/AddPure";
import ViewUsers from "./components/Users/ViewUsers";
import "./App.css";
import CreateUsers from "./components/Users/CreateUsers";
import Forum from "./components/Forum/Forum";
import { useState, createContext } from "react";
import CreateQuestion from "./components/Forum/CreateQuestion";
import Login from "./components/Users/Login";
import GPTLinked from "./components/Api/GPTLinked";
import Dashboard from "./components/Dashboard/Dashboard";
import Gemini from "./components/Api/Gemini/GeminiLinked";
import Unknown from "./components/Exceptions/Unknown";
import MuiPage from "./components/MUI";
import Statistical from "./components/Math/Stat/Test";
import Study from "./components/StudyMaterials/Study";
import Navbar from "./components/Misc/Navbar";
import ExamPage from "./components/TestPage/exam";
import ForgotPass from "./components/Users/ForgotPass";
import ExamFinalized from "./components/TestPage/ExamFinalized";

//We need to reorganize this to pass props in the context provider , this is very messy!
//we could possibly use redux for global state management , will make life easier!

export const userContext = createContext();
function App() {
  const [user, setUser] = useState("tester"); //let's modify to props later
  const [rank, setRank] = useState(100);
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      <BrowserRouter>
        <userContext.Provider
          value={
            (user,
            setUser,
            isLogged,
            setIsLogged,
            rank,
            setRank,
            loading,
            setLoading)
          }
        >
          <Navbar />
          <Gemini />
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/forgot" element={<ForgotPass />}></Route>
            <Route path="/exam" element={<ExamPage />}></Route>
            <Route path="/examfinal" element={<ExamFinalized />}></Route>
            <Route path="/marker" element={<Statistical />}></Route>
            <Route path="/mui" element={<MuiPage></MuiPage>}></Route>
            <Route path="/study" element={<Study />}></Route>
            <Route path="/stat" element={<StatPage></StatPage>}></Route>
            <Route path="/stat/addstat" element={<AddStat></AddStat>}></Route>
            <Route path="/puremath" element={<PureMath></PureMath>}></Route>
            <Route
              path="/puremath/addpure"
              element={<AddPure></AddPure>}
            ></Route>
            <Route
              path="/adduser"
              element={<CreateUsers></CreateUsers>}
            ></Route>
            <Route path="/viewusers" element={<ViewUsers></ViewUsers>}></Route>
            <Route path="/forum" element={<Forum></Forum>}></Route>
            <Route
              path="/createforum"
              element={<CreateQuestion></CreateQuestion>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/gpt" element={<GPTLinked></GPTLinked>}></Route>
            <Route path="/dash" element={<Dashboard></Dashboard>}></Route>
            <Route path="*" element={<Unknown />}></Route>
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
