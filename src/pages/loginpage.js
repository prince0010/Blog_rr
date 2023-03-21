import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";


export const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function Login(evt)  {
    evt.preventDefault();
   const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json',
      },
    //   if we have cookies which is the token then it will be included in the credentials and will be included in the browser and included in the next request 
      credentials: 'include',
    });
    // if response is ok or if user is logged in
    if(response.ok){
      // in response we want to parse the json  and we have arrow function since this response json is async
      response.json().then(useInfo =>{
        // before redirect we want to set the context infomration
        //The useInfo is from the json from the account taht is logged in the _id and username
        //and with this setUserInfo(useInfo) and setRedirect(true), every logged in on the user the navbar in the right side will changed, if the user is logged in the navbar will change to createnewpost, Profile 
        // and Logout if it's logged out or no user logged in then the navbar will be stayed as Login and Register 
        setUserInfo(useInfo);        
        setRedirect(true);
      })
    }
    else{
        alert('Wrong Password! Please try');
    }
  }
  // if logged in, redirect to home page
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return(
    <div className='m-auto pt-[120px] ml-18 '>
            {/* post is a customized className in the App.css */}
           <form className="m-auto max-w-md" onSubmit={Login}>
            <h1 className="font-bold text-3xl text-center py-6"> LOGIN </h1>
              <input className=" bg-bginput text-primaryblack
               bordersty shadow-lg transition ease-in-out delay-150 
              hover:-translate-y-1 hover:scale-105 duration-300 
              rounded-xl px-4" 
              type="text" 
              placeholder='Enter Username'
              value={username}
                onChange = {evt => setUsername(evt.target.value)}
              />
              <input className=" bg-bginput text-primaryblack 
               bordersty shadow-lg transition ease-in-out delay-150 
              hover:-translate-y-1 hover:scale-105 duration-300 rounded-xl
               px-4"
                type="password"
                 placeholder='Enter Password'
                 value={password}
                 onChange = {evt => setPassword(evt.target.value)}
                 />
              <button className="m-auto w-32 grid items-center bord rounded-xl p-[6.8px] text-light bg-primaryblack transition
              ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"> Login </button>
            </form>
                       </div>
  )
}