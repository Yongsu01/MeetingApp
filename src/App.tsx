import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import InfoPage from "./pages/SignUpPage/components/UserInfo";
import Matching from "./pages/MatchingPage/Matching";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="userinfo" element={<InfoPage />} />
        <Route path="matching" element={<Matching />} />
      </Routes>
    </div>
  );
}

export default App;
