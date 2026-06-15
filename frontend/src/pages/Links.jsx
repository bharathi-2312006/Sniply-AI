import { useEffect, useState } from "react";
import API from "../services/api";

export default function Links() {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState("");

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

  const deleteLink = async (code) => {
    if (!window.confirm("Delete this link?")) return;

    try {
      await API.delete(`/urls/${code}`);
      loadLinks();
    } catch (err) {
      console.log(err);
    }
  };

  const copyLink = (code) => {
    navigator.clipboard.writeText(
      `http://127.0.0.1:8000/${code}`
    );

    alert("Link copied");
  };

  const openLink = (code) => {
    window.open(
      `http://127.0.0.1:8000/${code}`,
      "_blank"
    );
  };

  const filteredLinks = links.filter((item) =>
    item.short_code
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-card">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >
        <div>
          <h1>🔗 Links Manager</h1>
          <p>
            Manage all shortened URLs
          </p>
        </div>

        <input
          placeholder="Search alias..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "260px"
          }}
        />
      </div>

      {filteredLinks.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            opacity: 0.7
          }}
        >
          No links found
        </div>
      ) : (
        <table>

          <thead>
            <tr>
              <th>Alias</th>
              <th>Clicks</th>
              <th>Health</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredLinks.map((item) => (

              <tr
                key={item.short_code}
              >

                <td>
                  {item.short_code}
                </td>

                <td>
                  {item.clicks}
                </td>

                <td>

                  <span
                    className="badge"
                    style={{
                      background:
                        item.health_status ===
                        "Healthy"
                          ? "#16a34a"
                          : "#64748b"
                    }}
                  >
                    {item.health_status ||
                      "Unknown"}
                  </span>

                </td>

                <td>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px"
                    }}
                  >

                    <button
                      onClick={() =>
                        openLink(
                          item.short_code
                        )
                      }
                    >
                      Open
                    </button>

                    <button
                      onClick={() =>
                        copyLink(
                          item.short_code
                        )
                      }
                    >
                      Copy
                    </button>

                    <button
                      onClick={() =>
                        deleteLink(
                          item.short_code
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}