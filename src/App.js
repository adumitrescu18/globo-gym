import {BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import RoutePage from "./pages/RoutePage";
import HazardsPage from "./pages/HazardsPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import Sidebar from "./components/Sidebar";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/route" element={<RoutePage />} />
          <Route path="/hazards" element={<HazardsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signIn" element={<SignInPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
