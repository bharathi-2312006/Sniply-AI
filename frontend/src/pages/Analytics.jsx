import { useEffect, useState } from "react";
import jsPDF from "jspdf";

import API from "../services/api";

import ClickChart from "../charts/ClickChart";
import ClicksPieChart from "../charts/ClicksPieChart";

export default function Analytics() {

  const [urls, setUrls] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const res =
        await API.get("/urls");

      setUrls(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const totalClicks =
    urls.reduce(
      (sum, item) =>
        sum + item.clicks,
      0
    );

  const totalLinks =
    urls.length;

  const avgClicks =
    totalLinks > 0
      ? (
          totalClicks /
          totalLinks
        ).toFixed(1)
      : 0;

  const topLink =
    urls.length > 0
      ? [...urls].sort(
          (a, b) =>
            b.clicks -
            a.clicks
        )[0]
      : null;

  const healthyLinks =
    urls.filter(
      (u) =>
        u.health_status ===
        "Healthy"
    ).length;

  const chartData =
    urls.map((url) => ({
      name:
        url.short_code,
      clicks:
        url.clicks,
    }));

  const exportPDF = () => {

    const doc =
      new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "BlackFlag Analytics Report",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Total Links: ${totalLinks}`,
      20,
      40
    );

    doc.text(
      `Total Clicks: ${totalClicks}`,
      20,
      50
    );

    doc.text(
      `Average Clicks: ${avgClicks}`,
      20,
      60
    );

    doc.text(
      `Healthy Links: ${healthyLinks}`,
      20,
      70
    );

    if (topLink) {

      doc.text(
        `Top Link: ${topLink.short_code}`,
        20,
        80
      );

    }

    doc.save(
      "blackflag-report.pdf"
    );
  };

  return (

    <div className="page-card">

      <div
        className="analytics-header"
      >

        <div>

          <h1>
            📊 BlackFlag Analytics
          </h1>

          <p>
            Real-time pirate fleet
            performance tracking
          </p>

        </div>

        <button
          onClick={exportPDF}
        >
          Export Report
        </button>

      </div>

      <div className="kpi-grid">

        <div className="stat-card">
          <h3>Total Links</h3>
          <h1>{totalLinks}</h1>
        </div>

        <div className="stat-card">
          <h3>Total Clicks</h3>
          <h1>{totalClicks}</h1>
        </div>

        <div className="stat-card">
          <h3>Avg Clicks</h3>
          <h1>{avgClicks}</h1>
        </div>

        <div className="stat-card">
          <h3>Healthy Links</h3>
          <h1>{healthyLinks}</h1>
        </div>

      </div>

      {topLink && (

        <div className="chart-card">

          <h2>
            🏆 Top Treasure Route
          </h2>

          <h3>
            {topLink.short_code}
          </h3>

          <p>
            {topLink.clicks}
            {" "}
            clicks
          </p>

        </div>

      )}

      <div className="chart-card">

        <h2>
          🤖 Captain's Insights
        </h2>

        <ul className="insight-list">

          <li>
            Tracking
            {" "}
            {totalLinks}
            {" "}
            routes across
            the fleet
          </li>

          <li>
            Total treasure
            traffic:
            {" "}
            {totalClicks}
            {" "}
            clicks
          </li>

          <li>
            Average route
            engagement:
            {" "}
            {avgClicks}
          </li>

          <li>
            Healthy routes:
            {" "}
            {healthyLinks}
          </li>

        </ul>

      </div>

      <div className="chart-card">

        <h2>
          📈 Click Analytics
        </h2>

        <ClickChart
          data={chartData}
        />

      </div>

      <div className="chart-card">

        <h2>
          🥧 Click Distribution
        </h2>

        <ClicksPieChart
          urls={urls}
        />

      </div>

    </div>

  );

}