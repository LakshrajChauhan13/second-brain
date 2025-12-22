import { useState } from "react";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const AuthPage = () => {
 const[isSignedUp , setIsSignedUp] =  useState(true)
 function SignUpToggle (){
    setIsSignedUp(c => !c)
 }
 
  return (
  <>
    {isSignedUp ?  <Signin SignUpToggle={SignUpToggle} /> :<Signup SignUpToggle={SignUpToggle} /> }
    </>
  )
};

export default AuthPage;