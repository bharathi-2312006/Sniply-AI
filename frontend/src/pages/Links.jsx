import { useEffect, useState } from "react";
import API from "../services/api";

export default function Links() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const res = await API.get("/urls");
      setLinks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-card">

      <h1>🔗 Links Manager</h1>

      <table>

        <thead>
          <tr>
            <th>Alias</th>
            <th>Clicks</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {links.map((item) => (
            <tr key={item.short_code}>
              <td>{item.short_code}</td>
              <td>{item.clicks}</td>
              <td>
                <span className="badge">
                  Active
                </span>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}