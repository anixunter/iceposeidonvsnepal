import { useState } from "react";
import "./ChallengeRules.css";

const ChallengeRules = ({ data }) => {
  const [showDisclosure, setShowDisclosure] = useState(null);

  const { daily_scenarios, tiers, current_point } = data;

  const getTier = () => {
    if (current_point <= 20000) return 1;
    if (current_point <= 50000) return 2;
    if (current_point <= 100000) return 3;
  };

  return (
    <div className="challenge-rules-container">
      <div className="challenge-rules">
        <div className="challenge-rules-heading">
          <div className="point-system-heading">Point System</div>
          <p className="rules-text">
            Ice earns points by completing 10 challenges per day. By gaining
            points, Ice will be able to level up to different tiers, unlocking
            benefits and rewards, such as the ability to stay at nicer hotels,
            eat at better restaurants, and more. However, Ice can also lose
            points by failing bonus challenges or encountering various
            scenarios.
            <br />
            <br />
            Once Ice reaches 100,000 points, the stream will end.
          </p>
        </div>
        <div className="tiers-list">
          <div className="tiers-list-heading">Tiers</div>
          <p className="rules-text">
            Different amounts of points unlock benefits and rewards
          </p>
          <div className="tiers-disclosure">
            {tiers.map((tier, i) => {
              return (
                <div key={i}>
                  <div
                    className="disclosure"
                    onClick={() =>
                      setShowDisclosure(showDisclosure === i ? null : i)
                    }
                  >
                    <div>{tier.title}</div>
                    <div className="points-box">
                      Up to {tier.until_pts.toLocaleString()} points
                    </div>
                    {tier.id === getTier() && (
                      <div className="current-tier">Current</div>
                    )}
                    <div className="carat-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  {showDisclosure === i && (
                    <div className="disclosure-content">{tier.description}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="point-loss">
          <div className="point-loss-heading">Point Loss</div>
          <div className="donate-heading">Donate to Reset</div>
          <p className="text">
            Points can be reset to 0 by donating the USD$ equivalent of the
            point balance. The USD value is equal to 1/2 of the point balance.
            For example, if Ice has 10,000 points, the donation amount would be
            USD$5,000.
          </p>
          <div className="daily-scenarios">Daily Scenarios</div>
          <p className="text">
            Every 24 hours, one of the following two scenarios can cause Ice to
            lose points. Once one of these scenarios occurs, they will be on
            cooldown for 24 hours.
          </p>
          <div className="daily-scenarios-grid">
            <div className="grid-item">
              Lose 20% of points to a stream sniper with random object. Today's
              object: {daily_scenarios.object}
            </div>
            <div className="line-between-grid"></div>
            <div className="grid-item">
              Lose 20% of points from a randomly selected word used in a
              conversation (by someone else) each day. CANNOT BE A SNIPER
              (except )! Today's word: {daily_scenarios.word}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeRules;
