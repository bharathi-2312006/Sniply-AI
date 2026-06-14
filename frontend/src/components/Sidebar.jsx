import {
  FaHome,
  FaLink,
  FaChartBar,
  FaQrcode,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { FaBullhorn } from "react-icons/fa";
export default function Sidebar() {
  const menu = [
    {
      icon: <FaHome />,
      text: "Dashboard",
      path: "/",
    },
    {
      icon: <FaLink />,
      text: "Links",
      path: "/links",
    },
    {
 icon:<FaBullhorn />,
 text:"Campaigns",
 path:"/campaigns"
},
    {
      icon: <FaChartBar />,
      text: "Analytics",
      path: "/analytics",
    },
    {
      icon: <FaQrcode />,
      text: "QR Studio",
      path: "/qr",
    },
    {
      icon: <FaCog />,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        ⚡ Sniply AI
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