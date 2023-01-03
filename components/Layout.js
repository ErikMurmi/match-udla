import { NavBar } from "./NavBar";

export const Layout =({children}) =>{
    return(<div>
    <NavBar/>
    {children}
    </div>)
}