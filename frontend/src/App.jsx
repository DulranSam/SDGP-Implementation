/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StatPage from "./components/Math/StatPage";
import PureMath from "./components/Math/PureMath";
import HomePage from "./components/Main/HomePage";
import AddStat from "./components/Math/AddStat";
import AddPure from "./components/Math/AddPure";
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

export const userContext = createContext();
function App() {
  const [user, setUser] = useState(); //setter should contain details of user to pass around as props
  const [isLogged, setIsLogged] = useState(false);

  //We need to reorganize this to pass props in the context provider , this is very messy!
  //we could possibly use redux for global state management , will make life easier!

  return (
    <>
      <BrowserRouter>
        <userContext.Provider value={(user, setUser, isLogged, setIsLogged)}>
          <Routes>
            <Route
              path="/"
              element={<HomePage username={user} isLogged={true}></HomePage>}
            ></Route>
            <Route path="/gemini" element={<Gemini></Gemini>}></Route>

            <Route path="/stat" element={<StatPage></StatPage>}></Route>
            <Route path="/stat/addstat" element={<AddStat></AddStat>}></Route>
            <Route path="/puremath" element={<PureMath></PureMath>}></Route>
            <Route
              path="/puremath/addpure"
              element={<AddPure></AddPure>}
            ></Route>
            <Route
              path="/adduser"
              element={
                <CreateUsers
                  setUser={(user) => {
                    setUser(user);
                  }}
                  user={user}
                  isLogged={setIsLogged}
                ></CreateUsers>
              }
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
            <Route path="*" element={<Unknown></Unknown>}></Route>
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
