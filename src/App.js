import '../src/App.css'
import { Routes, Route } from "react-router-dom";
import { LayoutNav } from "./components/layoutnav";
import { IndexPage } from "./pages/indexpage";
import { LoginPage } from './pages/loginpage';
import { RegisterForm } from './pages/Register';
import { UserContextProvider } from './components/UserContext';
import { CreateNewArticles } from './pages/CreateNewArticle';

function App() {
  return (
    <UserContextProvider>
    <Routes> 
      <Route path='/' element ={<LayoutNav/>} >
      <Route index element = {<IndexPage/>}/>
  {/* Login Route */}
      <Route path = {'/login'} element = {<LoginPage/>} />
      <Route path={'/register'} element = {<RegisterForm/>} />   
      <Route path ={'/create'} element  = {<CreateNewArticles/>} />
         </Route>
    </Routes>
    </UserContextProvider>
    );
}

export default App;
