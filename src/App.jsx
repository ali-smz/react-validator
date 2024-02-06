import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import { useContext } from "react";
import AuthContex from "./Store/AuthContex";

function App() {
  const authctx = useContext(AuthContex);
  return (
    <>
      <MainHeader />
      <main>
        {!authctx.isLoggedIn && <Login />}
        {authctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
