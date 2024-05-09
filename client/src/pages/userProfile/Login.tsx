import { Navbar } from "../../components/Layout/Navbar";
import LoginForm from "../../components/UserProfile/LoginForm";
// import Footer from "../../components/Layout/Footer";


type loginprops={
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<loginprops> = ({isLoggedIn, setIsLoggedIn}) => {
  
  return (
    <>
    <Navbar/>
    <LoginForm isLoggedIn= {isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    {/* <Footer/> */}
    </>
  )
}

export default Login