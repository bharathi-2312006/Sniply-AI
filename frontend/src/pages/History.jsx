import { useState } from "react";
import API from "../services/api";

export default function History({
  urls,
  reload,
}) {

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const deleteUrl = async (
    code
  ) => {

    if (
      !window.confirm(
        "Delete this link?"
      )
    ) {
      return;
    }

    await API.delete(
      `/urls/${code}`
    );

    reload();
  };

  const copyLink = (
    code
  ) => {

    navigator.clipboard.writeText(
      `http://127.0.0.1:8000/${code}`
    );

    alert(
      "Link copied!"
    );
  };

  const filteredUrls =
    [...urls]
      .filter((url) =>
        url.short_code
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )
      .sort((a, b) => {

        if (
          sortBy ===
          "highest"
        ) {
          return (
            b.clicks -
            a.clicks
          );
        }

        if (
          sortBy ===
          "lowest"
        ) {
          return (
            a.clicks -
            b.clicks
          );
        }

        if (
          sortBy ===
          "oldest"
        ) {
          return (
            a.id - b.id
          );
        }

        return (
          b.id - a.id
        );
      });

  return (
    <div className="card">

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          marginBottom:
            "20px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >

        <h2>
          Recent Links
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >

          <input
            placeholder="Search alias..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              width: "220px",
            }}
          />

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
          >

            <option value="newest">
              Newest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="highest">
              Highest Clicks
            </option>

            <option value="lowest">
              Lowest Clicks
            </option>

          </select>

        </div>

      </div>

      {filteredUrls.length ===
      0 ? (

        <div
          style={{
            padding:
              "30px",
            textAlign:
              "center",
            opacity: 0.7,
          }}
        >

          No links found

        </div>

      ) : (

        <table>

          <thead>

            <tr>

              <th>
                Alias
              </th>

              <th>
                Clicks
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUrls.map(
              (url) => (

                <tr
                  key={url.id}
                >

                  <td>
                    {
                      url.short_code
                    }
                  </td>

                  <td>
                    {
                      url.clicks
                    }
                  </td>

                  <td>

                    <span
                      style={{
                        padding:
                          "6px 12px",
                        borderRadius:
                          "30px",
                        background:
                          url.clicks >
                          0
                            ? "#16a34a"
                            : "#64748b",
                        fontSize:
                          "12px",
                      }}
                    >

                      {url.clicks >
                      0
                        ? "Active"
                        : "New"}

                    </span>

                  </td>

                  <td>

                    <button
                      onClick={() =>
                        copyLink(
                          url.short_code
                        )
                      }
                    >
                      Copy
                    </button>

                    <button
                      onClick={() =>
                        deleteUrl(
                          url.short_code
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>
      )}

    </div>
  );
}