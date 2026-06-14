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
  const [urls, setUrls] = useState([]);

  const loadUrls = async () => {
    try {
      const res = await API.get("/urls");
      setUrls(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const totalClicks = urls.reduce(
    (sum, item) => sum + item.clicks,
    0
  );

  const chartData = urls.map((url) => ({
    name: url.short_code,
    clicks: url.clicks,
  }));

  return (
    <div className="dashboard-page">

      {/* HERO */}

      <motion.div
        className="hero-banner"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>⚡ Sniply AI</h1>

        <p>
          Smart URL Shortener &
          Marketing Analytics Platform
        </p>
      </motion.div>
      <div className="page-card">

 <h2>Recent Activity</h2>

 <ul className="activity-feed">

  <li>
   🔗 google created
  </li>

  <li>
   📱 QR downloaded
  </li>

  <li>
   🚀 Campaign launched
  </li>

  <li>
   👆 Link clicked
  </li>

 </ul>

</div>

      {/* KPI */}

      <div className="kpi-grid">

        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <StatCard
            title="Total Links"
            value={urls.length}
            icon={<FaLink />}
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <StatCard
            title="Total Clicks"
            value={totalClicks}
            icon={<FaMousePointer />}
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <StatCard
            title="QR Generated"
            value={urls.length}
            icon={<FaQrcode />}
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <StatCard
            title="Campaigns"
            value="1"
            icon={<FaRocket />}
          />
        </motion.div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="quick-actions">

        <div className="action-card">
          <h3>Create Campaign</h3>
          <p>
            Create a trackable
            marketing campaign.
          </p>
        </div>

        <div className="action-card">
          <h3>Generate QR</h3>
          <p>
            Create QR codes for
            offline marketing.
          </p>
        </div>

        <div className="action-card">
          <h3>Track Analytics</h3>
          <p>
            Monitor engagement
            and click activity.
          </p>
        </div>

      </div>

      {/* CREATE LINK */}

      <CreateLink reload={loadUrls} />

      {/* ANALYTICS */}

      <div className="chart-card">

        <h2>
          Click Analytics
        </h2>

        <ClickChart
          data={chartData}
        />

      </div>

      {/* RECENT LINKS */}

      <div className="history-wrapper">

        <History
          urls={urls}
          reload={loadUrls}
        />

      </div>

    </div>
  );
}