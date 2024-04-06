import { useState, useEffect } from "react";
import "./App.css";
import RealtimeOverview from "./components/RealtimeOverview";
import Time from "./components/Time";
import ChallengeRules from "./components/ChallengeRules";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [data, setData] = useState({});
  const [showRealtime, setShowRealtime] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://iceposeidonvsnepal-api.onrender.com/data"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    // Fetch data initially
    fetchData();

    // Fetch data every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  const path = window.location.pathname;
  // Check if the path is "/admin"
  if (path === "./admin")
    return <AdminPanel challenges={data.challenges} data={data} />;

  return (
    <div className="main">
      <div className="container">
        <div className="top-container">
          <div className="title">
            <div className="title-text">Ice Poseidon vs Nepal</div>
            <div className="time-container">
              <Time />
            </div>
          </div>
          <p className="text-soft">
            <br />
            Join Ice Poseidon as he wanders the streets of Nepal wearing the
            Apple Vision Pro. <br />
            <br />
            Along the way, he must complete challenges which will earn him
            points. Different amounts of points will unlock benefits and
            rewards, and the stream will end once he reaches
            <b style={{ color: "#ffffffde" }}> 100,000 points</b>. However,
            various scenarios and bonus challenges will cause him to lose
            points!
          </p>
        </div>
        <div className="bottom-container">
          <div className="tabs">
            <div
              className={showRealtime ? "selected-tab" : "tab"}
              onClick={() => setShowRealtime(true)}
            >
              Realtime Overview
            </div>
            <div
              className={!showRealtime ? "selected-tab" : "tab"}
              onClick={() => setShowRealtime(false)}
            >
              Challenge Rules
            </div>
          </div>
          <div className="data-container">
            {showRealtime ? (
              <RealtimeOverview data={data} />
            ) : (
              <ChallengeRules data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
