import { createContext, useState } from "react";


export const UserContext = createContext({});

//add a printing provider

export function UserContextProvider({children}){
    //the defaul object will be empty

    const [userInfo, setUserInfo] = useState({});
        return(
            // provide userinfo and setuserinfo with our context
            <UserContext.Provider value = {{userInfo, setUserInfo}}> 
                {/* do not put this parameter the child as a component  */}
                {children}
            </UserContext.Provider>
        )
    // return (
    //     <UserContext.Provider value={{user:null}}>
    //         {children}
    //     </UserContext.Provider>
    // )
} 