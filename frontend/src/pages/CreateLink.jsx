import { useState } from "react";
import API from "../services/api";
import QRPreview from "../components/QRPreview";

export default function CreateLink({ reload }) {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const suggestions = [
    "summer-sale",
    "launch-2026",
    "offer-link",
    "sniply-ai",
  ];

  const createLink = async () => {
    if (!url) {
      alert("Enter URL");
      return;
    }

    try {
      const res = await API.post("/shorten", {
        original_url: url,
        custom_alias: alias,
        expires_in_days: 7,
      });

      setShortUrl(res.data.short_url);

      setUrl("");
      setAlias("");

      reload();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Unable to create link"
      );
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("URL Copied");
  };

  return (
    <>
      <div className="card">

        <h2>Create Link</h2>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Custom alias"
          value={alias}
          onChange={(e) =>
            setAlias(e.target.value)
          }
        />

        <div
          style={{
            marginTop: "15px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() =>
                setAlias(item)
              }
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={createLink}
          style={{ marginTop: "20px" }}
        >
          Create Short URL
        </button>

        {shortUrl && (
          <div className="result">

            <strong>
              Generated URL
            </strong>

            <p>{shortUrl}</p>

            <button
              onClick={copyUrl}
            >
              Copy URL
            </button>

          </div>
        )}

      </div>

      <QRPreview
        url={shortUrl}
      />
    </>
  );
}