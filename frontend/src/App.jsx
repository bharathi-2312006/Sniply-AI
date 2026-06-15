import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Links from "./pages/Links";
import Analytics from "./pages/Analytics";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<MainLayout />}
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="links"
            element={<Links />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;