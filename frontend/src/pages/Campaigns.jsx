export default function Campaigns() {
  const campaigns = [
    {
      name: "Summer Sale",
      clicks: 1234,
      status: "Running",
    },
    {
      name: "Product Launch",
      clicks: 852,
      status: "Running",
    },
    {
      name: "College Event",
      clicks: 321,
      status: "Ended",
    },
  ];

  return (
    <div className="page-card">

      <h1>🚀 Campaign Manager</h1>

      <table>

        <thead>
          <tr>
            <th>Campaign</th>
            <th>Clicks</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {campaigns.map((c) => (
            <tr key={c.name}>
              <td>{c.name}</td>
              <td>{c.clicks}</td>
              <td>{c.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}