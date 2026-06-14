import {
 FaBell,
 FaUserCircle
} from "react-icons/fa";

export default function Navbar(){

 return(

  <div className="topbar">

   <input
    placeholder="Search links..."
   />

   <div className="topbar-right">

    <FaBell />

    <FaUserCircle />

   </div>

  </div>

 );
}