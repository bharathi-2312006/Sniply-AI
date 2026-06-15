import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ClicksPieChart({
  urls,
}) {

  const data = urls
    .filter(
      (u) => u.clicks > 0
    )
    .map((u) => ({
      name: u.short_code,
      value: u.clicks,
    }));

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#14b8a6",
    "#e11d48",
  ];

  if (data.length === 0) {

    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        No click data available
      </div>
    );

  }

  return (

    <div
      style={{
        width: "100%",
        height: 400,
      }}
    >

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={130}
            label
          >

            {data.map(
              (_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}