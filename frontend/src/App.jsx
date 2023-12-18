import { BrowserRouter, Routes, Route } from "react-router-dom";
import StatPage from "./components/StatPage";
import PureMath from "./components/PureMath";
import HomePage from "./components/HomePage";
import AddStat from "./components/AddStat";
import AddPure from "./components/AddPure";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/stat" element={<StatPage></StatPage>}></Route>
          <Route path="/addstat" element={<AddStat></AddStat>}></Route>
          <Route path="/puremath" element={<PureMath></PureMath>}></Route>
          <Route path="/addpure" element={<AddPure></AddPure>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
