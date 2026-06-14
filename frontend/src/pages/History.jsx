import API from "../services/api";

export default function History({ urls, reload }) {
  const deleteUrl = async (code) => {
    await API.delete(`/urls/${code}`);
    reload();
  };

  const copyLink = (code) => {
    navigator.clipboard.writeText(
      `http://127.0.0.1:8000/${code}`
    );

    alert("Copied");
  };

  return (
    <div className="card">
      <h2>History</h2>

      <table>
        <thead>
          <tr>
            <th>Alias</th>
            <th>Clicks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.short_code}</td>
              <td>{url.clicks}</td>

              <td>
                <button
                  onClick={() =>
                    copyLink(url.short_code)
                  }
                >
                  Copy
                </button>

                <button
                  onClick={() =>
                    deleteUrl(url.short_code)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}