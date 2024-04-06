const Challenges = ({ challenges }) => {
  const incompleteChallenges = challenges?.filter(
    (challenge) => challenge.completed_at === null
  );

  const completedChallenges = challenges
    ?.filter((challenge) => challenge.completed_at !== null)
    .map((challenge) => ({
      ...challenge,
      completed_at: new Date(challenge.completed_at),
    })); // filtering completed challenges and then with map changing the timestamp to Date, so that calculation of times can be done

  //calculation of timeago for completed challenges
  const getTimeAgo = (challenge) => {
    const currentTime = new Date(); // Get the current time
    const timeDifference =
      currentTime.getTime() - challenge.completed_at.getTime(); // Calculate the time difference in milliseconds
    let timeAgo;
    if (timeDifference < 60 * 1000) {
      // Less than a minute
      timeAgo = "Completed just now";
    } else if (timeDifference < 60 * 60 * 1000) {
      // Less than an hour
      const minutesAgo = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes
      timeAgo = `Completed ${minutesAgo} minutes ago`;
    } else {
      // More than an hour
      const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
      timeAgo = `Completed ${hoursAgo} hours ago`;
    }
    return timeAgo;
  };

  return (
    <div className="challenges-container">
      <div className="challenge-title">Today's Challenges</div>
      <p className="challenge-info">
        Each day, before Ice wakes up, new challenges will be published for him
        to complete for the day
      </p>
      <div className="incomplete-heading">
        Incomplete ({incompleteChallenges?.length})
      </div>
      <div className="incomplete-challenge-section">
        {incompleteChallenges?.map((challenge, i) => (
          <div className="incomplete-challenge" key={i}>
            <div className="point-text">
              {challenge.point_reward} point reward
            </div>
            <div>{challenge.title}</div>
          </div>
        ))}
      </div>
      <div className="completed-heading">
        Completed ({completedChallenges?.length})
      </div>
      <div className="completed-challenge-section">
        {completedChallenges?.map((challenge, i) => (
          <div className="completed-challenge" key={i}>
            <div className="completed-info">
              <div className="point-text">
                {challenge.point_reward} point reward
              </div>
              <div className="completed-text">
                <span>{getTimeAgo(challenge)}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginLeft: "0.25rem" }}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div>{challenge.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
