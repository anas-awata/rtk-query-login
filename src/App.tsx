import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./features/auth/Login";
import Layout from "./components/layout";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import Public from "./components/Public";
import SignUp from "./features/auth/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* puplic routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
