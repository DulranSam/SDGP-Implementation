import { BrowserRouter, Routes, Route } from "react-router-dom";
import StatPage from "./components/StatPage";
import PureMath from "./components/PureMath";
import HomePage from "./components/HomePage";
import AddStat from "./components/AddStat";
import AddPure from "./components/AddPure";
import ViewUsers from "./components/Users/ViewUsers";
import "./App.css";
import CreateUsers from "./components/Users/CreateUsers";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(); //setter should contain details of user to pass around as props
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage username={user} isLogged={isLogged}></HomePage>}
          ></Route>
          <Route path="/stat" element={<StatPage></StatPage>}></Route>
          <Route path="/addstat" element={<AddStat></AddStat>}></Route>
          <Route path="/puremath" element={<PureMath></PureMath>}></Route>
          <Route path="/addpure" element={<AddPure></AddPure>}></Route>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
