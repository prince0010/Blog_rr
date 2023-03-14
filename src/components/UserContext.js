import { createContext } from "react";


export const UserContext = createContext({});

//add a printing provider

export function UserContextProvider({children}){
        return(
            <div> 
                {/* do not put this parameter the child as a component  */}
                {children}
            </div>
        )
    // return (
    //     <UserContext.Provider value={{user:null}}>
    //         {children}
    //     </UserContext.Provider>
    // )
} 