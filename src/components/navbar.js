import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";

export const Navbar = () => {
    //we'll gonna use context
    //grab the set user information from the context 
        const {setUserInfo, userInfo} = useContext(UserContext);
    // const [username, setUsername] = useState('');
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
            }).then(response => {
                response.json().then(userInfo =>{
                    setUserInfo(userInfo);
                    // setUsername(userInfo.username);
                });
            });
    }, [setUserInfo]);
    // we'll gonna invalidate the cookie in the backend part or erase the cookie in the backend part
    // If user is logged out it must invalidate the token and reset the username that the user uses
    function logout(){
        fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
        });
        // if logged out in the navbar it will reset to the login and register <username>
        setUserInfo(null);
        // setUsername(null);
    }
    
    //since sometimes the username is new or null then you must add questionmark in the userInfo(?) you must add it if theres new or null or somthing like that
    const username = userInfo?.username;

    return(
        <div>
               {/* <main className ='p-[10px] max-w-[1200px] m-auto '> */}
            <header className="fixed gap-2 w-full h-[80px] flex justify-between items-center px-5 bg-white text-black shadow-lg"> 

            <Link to = '/' className = "font-bold text-xl">
            SV& G. Corp. Blog 
            {/* SV&G Corp. */}
            
            </Link>
            {/* if there is username or logged in then the login and register will change into this */}
            {username && (
                <>
               
                <nav className="flex gap-4">
                <span>Hello, {username}</span>
                <Link to = '/create' className=""> Create New Article </Link>
                <Link onClick={logout} className=""> Logout </Link>
                </nav>
                </>
            )}
            {/* else if walay acc then this will be the one who will display */}
            {/* !username or not username or opposite of having username */}
                    {!username && (
                    <>
                     <nav className="flex gap-4">
                     <Link to ="/login"> Login </Link>
                     <Link to ="/register"> Register </Link>
                     </nav>
                    </>
                    )}
        </header>

                    </div>
    )
}