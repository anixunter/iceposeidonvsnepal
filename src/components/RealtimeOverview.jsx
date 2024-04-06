import Challenges from "./Challenges";

const RealtimeOverview = ({ data }) => {
  const { current_point, challenges } = data;

  const progress = (current_point / 100000) * 100;

  const getTier = () => {
    if (current_point <= 20000) return 1;
    if (current_point <= 50000) return 2;
    if (current_point <= 100000) return 3;
  };

  let tillNextTier, nextTier;
  (() => {
    if (getTier() === 1) {
      tillNextTier = 20000 - current_point;
      nextTier = 2;
    } else if (getTier() === 2) {
      tillNextTier = 50000 - current_point;
      nextTier = 3;
    } else {
      tillNextTier = 100000 - current_point;
    }
  })(); //iife function

  return (
    <div className="realtime-container">
      <div className="realtime-data">
        <div>
          <span className="current-point">
            {current_point?.toLocaleString()}
          </span>
          <span className="total-point"> / 100,000 points</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="realtime-tier">
          <div>Tier {getTier()}</div>
          {getTier() < 3 && (
            <div>
              {tillNextTier.toLocaleString()} until Tier {nextTier}
            </div>
          )}
          {getTier() === 3 && (
            <div>{tillNextTier.toLocaleString()} until Stream Ends</div>
          )}
        </div>
      </div>
      <div className="section-divider-line"></div>
      <Challenges challenges={challenges} />
    </div>
  );
};

export default RealtimeOverview;
