import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"

export const LayoutNav = () =>{
    return(
        <main>
            <Navbar/>
            <Outlet/>
        </main> 
    )
}