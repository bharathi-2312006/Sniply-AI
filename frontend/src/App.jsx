import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";
import Campaigns from "./pages/Campaigns";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Links from "./pages/Links";
import Analytics from "./pages/Analytics";
import QRCenter from "./pages/QRCenter";
import Settings from "./pages/Settings";
function App() {

 return (
  <BrowserRouter>

   <Routes>

    <Route
     path="/"
     element={<MainLayout />}
    >
<Route
  path="campaigns"
  element={<Campaigns />}
/>
     <Route
      index
      element={<Dashboard />}
     />

     <Route
      path="links"
      element={<Links />}
     />
<Route
  path="settings"
  element={<Settings />}
/>
     <Route
      path="analytics"
      element={<Analytics />}
     />

     <Route
      path="qr"
      element={<QRCenter />}
     />

    </Route>

   </Routes>

  </BrowserRouter>
 );
}

export default App;