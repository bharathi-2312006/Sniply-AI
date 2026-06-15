import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaLink,
  FaMousePointer,
  FaQrcode,
  FaRocket,
} from "react-icons/fa";

import API from "../services/api";

import StatCard from "../components/StatCard";
import CreateLink from "./CreateLink";
import History from "./History";

import ClickChart from "../charts/ClickChart";

export default function Dashboard() {

  const [urls, setUrls] =
    useState([]);

  const loadUrls = async () => {

    try {

      const res =
        await API.get("/urls");

      setUrls(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    loadUrls();
  }, []);

  const totalClicks =
    urls.reduce(
      (sum, item) =>
        sum + item.clicks,
      0
    );

  const chartData =
    urls.map((url) => ({
      name:
        url.short_code,
      clicks:
        url.clicks,
    }));

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

  const aiInsights = [];

  if (urls.length === 0) {

    aiInsights.push(
      "Create your first shortened link to start tracking analytics."
    );

  }

  if (urls.length > 0) {

    aiInsights.push(
      `${urls.length} links currently managed.`
    );

    aiInsights.push(
      `${totalClicks} total clicks recorded.`
    );

    if (topLink) {

      aiInsights.push(
        `Top performer: ${topLink.short_code} (${topLink.clicks} clicks)`
      );

    }

    const inactive =
      urls.filter(
        (u) => u.clicks === 0
      ).length;

    if (inactive > 0) {

      aiInsights.push(
        `${inactive} links have not received traffic yet.`
      );

    }

    aiInsights.push(
      `${healthyLinks} healthy links detected.`
    );

  }

  return (

    <div className="dashboard-page">

      {/* HERO */}

      <motion.div
        className="hero-banner"
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <h1>
          🏴‍☠️ BlackFlag
        </h1>

        <p>
          Smart URL Shortener &
          Marketing Analytics Platform
        </p>

      </motion.div>

      {/* KPI */}

      <div className="kpi-grid">

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
        >
          <StatCard
            title="Total Links"
            value={urls.length}
            icon={<FaLink />}
          />
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
        >
          <StatCard
            title="Total Clicks"
            value={totalClicks}
            icon={<FaMousePointer />}
          />
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
        >
          <StatCard
            title="QR Generated"
            value={urls.length}
            icon={<FaQrcode />}
          />
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
        >
          <StatCard
            title="Healthy Links"
            value={healthyLinks}
            icon={<FaRocket />}
          />
        </motion.div>

      </div>

      {/* TOP LINK */}

      {topLink && (

        <div className="page-card">

          <h2>
            🏆 Top Performing Link
          </h2>

          <div
            style={{
              marginTop: "15px",
            }}
          >

            <h3>
              {topLink.short_code}
            </h3>

            <p>
              Total Clicks:
              {" "}
              {topLink.clicks}
            </p>

          </div>

        </div>

      )}

      {/* AI INSIGHTS */}

      <div className="page-card">

        <h2>
          🤖 AI Insights
        </h2>

        <div
          style={{
            marginTop: "20px",
          }}
        >

          {aiInsights.map(
            (item, index) => (

              <div
                key={index}
                className="insight-item"
              >

                {item}

              </div>

            )
          )}

        </div>

      </div>

      {/* CREATE LINK */}

      <CreateLink
        reload={loadUrls}
      />

      {/* CHART */}

      <div className="chart-card">

        <h2>
          Click Analytics
        </h2>

        <ClickChart
          data={chartData}
        />

      </div>

      {/* HISTORY */}

      <div className="history-wrapper">

        <History
          urls={urls}
          reload={loadUrls}
        />

      </div>

    </div>

  );
}