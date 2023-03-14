import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const RegisterForm = () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
    
  async function Register(evt){
      // Preventing this one to reload in the default page like the homepage
      evt.preventDefault();
     const response = await fetch('http://localhost:4000/register', 
        {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {'Content-Type':'application/json'},
        });
        // if(response.status !== 200){
        //   alert('The Username is already existed, Please try again.');
        // }
        // else{
        //   alert('Account created successfully');
          
        // }
        if(response.status === 200){
          alert('Account created successfully');
          nav('/login');
        }
         
  }

    return(
        <div className=' m-auto pt-[120px] ml-18 '>
        {/* post is a customized className in the App.css */}
       <form className="m-auto max-w-md" onSubmit={Register}> 
        <h1 className="font-bold text-3xl text-center py-6"> REGISTER </h1>
          <input className=" bg-bginput text-primaryblack bordersty 
          shadow-lg transition ease-in-out delay-150 
          hover:-translate-y-1 hover:scale-105 
          duration-300 rounded-xl px-4" 
          type="text" 
          placeholder='Enter Username' 
          value={username} 
          onChange={evt => setUsername(evt.target.value)}/>

          <input className=" bg-bginput text-primaryblack 
           bordersty shadow-lg transition ease-in-out delay-150 
          hover:-translate-y-1 hover:scale-105 duration-300
           rounded-xl px-4" 
           type="password"
            placeholder='Enter Password' 
            value={password} 
            onChange ={evt => setPassword(evt.target.value)}/>
          <button className="m-auto w-32 grid items-center bord rounded-xl p-[6.8px] text-light bg-primaryblack transition
          ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"> Register </button>
        </form>
                   </div>
      )
  
  
}