import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BackgroundEffects from "../components/BackgroundEffects";

export default function MainLayout() {

 return(

  <>
   <BackgroundEffects />

   <Sidebar />

   <div className="main-content">

    <Navbar />

    <Outlet />

   </div>

  </>

 );

}