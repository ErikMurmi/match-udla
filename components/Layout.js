import { NavBar } from "./NavBar";
import { NavBarAdmin } from "./NavBarAdmin";

export const Layout =({children}) =>{
    return(<div>
    {/* <NavBar/> */}
    <NavBarAdmin/>
    {children}
    </div>)
}