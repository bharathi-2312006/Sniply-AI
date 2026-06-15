import {
  FaHome,
  FaLink,
  FaChartBar
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const menu = [
    {
      icon: <FaHome />,
      text: "Dashboard",
      path: "/"
    },
    {
      icon: <FaLink />,
      text: "Links",
      path: "/links"
    },
    {
      icon: <FaChartBar />,
      text: "Analytics",
      path: "/analytics"
    }
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        🏴‍☠️ BlackFlag
      </div>

      {menu.map((item) => (

        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          {item.icon}
          <span>{item.text}</span>
        </NavLink>

      ))}

    </aside>
  );
}