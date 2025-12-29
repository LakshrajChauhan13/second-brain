import { Outlet } from "@tanstack/react-router";
import ToastContainer from "./components/ToastContainer";

const App = () => {
   
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  )
};

export default App;