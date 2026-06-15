import { useState, useEffect } from "react";
import API from "../services/api";
import QRPreview from "../components/QRPreview";

export default function CreateLink({ reload }) {

  const [url, setUrl] =
    useState("");

  const [alias, setAlias] =
    useState("");

  const [shortUrl, setShortUrl] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  useEffect(() => {
    generateSuggestions();
  }, [url]);

  const generateSuggestions = () => {

    if (!url) {
      setSuggestions([]);
      return;
    }

    try {

      const hostname =
        new URL(url)
          .hostname
          .replace("www.", "")
          .split(".")[0];

      const clean =
        hostname.toLowerCase();

      setSuggestions([
        clean,
        `${clean}-2026`,
        `${clean}-link`,
        `${clean}-official`,
        `${clean}-campaign`,
      ]);

    } catch {

      setSuggestions([]);

    }
  };

  const createLink = async () => {

    if (!url) {
      alert("Enter URL");
      return;
    }

    try {

      const res =
        await API.post(
          "/shorten",
          {
            original_url: url,
            custom_alias: alias,
            expires_in_days: 7,
          }
        );

      setShortUrl(
        res.data.short_url
      );

      setUrl("");
      setAlias("");
      setSuggestions([]);

      reload();

    } catch (err) {

      alert(
        err.response?.data?.detail ||
          "Unable to create link"
      );

    }
  };

  const copyUrl = () => {

    navigator.clipboard.writeText(
      shortUrl
    );

    alert("URL Copied");
  };

  const openUrl = () => {

    window.open(
      shortUrl,
      "_blank"
    );

  };

  const shareWhatsApp = () => {

    window.open(
      `https://wa.me/?text=${encodeURIComponent(shortUrl)}`,
      "_blank"
    );

  };

  const shareLinkedIn = () => {

    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shortUrl)}`,
      "_blank"
    );

  };

  const shareTwitter = () => {

    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}`,
      "_blank"
    );

  };

  return (
    <>

      <div className="card">

        <h2>
          🚀 Create Smart Link
        </h2>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) =>
            setUrl(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Custom alias"
          value={alias}
          onChange={(e) =>
            setAlias(
              e.target.value
            )
          }
        />

        {suggestions.length > 0 && (

          <>
            <p
              style={{
                marginTop: 20,
                opacity: .8,
              }}
            >
              🤖 AI Suggested Aliases
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >

              {suggestions.map(
                (item) => (

                  <button
                    key={item}
                    onClick={() =>
                      setAlias(item)
                    }
                  >
                    {item}
                  </button>

                )
              )}

            </div>
          </>
        )}

        <button
          onClick={createLink}
          style={{
            marginTop: "20px",
          }}
        >
          Create Short URL
        </button>

        {shortUrl && (

          <div
            className="result"
            style={{
              marginTop: "25px",
            }}
          >

            <h3>
              ✅ Link Generated
            </h3>

            <p>
              {shortUrl}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "15px",
              }}
            >

              <button
                onClick={copyUrl}
              >
                Copy
              </button>

              <button
                onClick={openUrl}
              >
                Open
              </button>

              <button
                onClick={
                  shareWhatsApp
                }
              >
                WhatsApp
              </button>

              <button
                onClick={
                  shareLinkedIn
                }
              >
                LinkedIn
              </button>

              <button
                onClick={
                  shareTwitter
                }
              >
                X / Twitter
              </button>

            </div>

          </div>
        )}

      </div>

      <QRPreview
        url={shortUrl}
      />

    </>
  );
}
