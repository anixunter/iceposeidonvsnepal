import "./AdminPanel.css";

const AdminPanel = ({ challenges, data }) => {
  const completeHandler = (challenge, i) => {
    if (challenge.completed_at !== null) return;

    // Create a new date object to get the current date and time and Convert the date object to ISO string format
    const currentDate = new Date().toISOString();

    // Make a PUT request to update the challenge data on the server
    fetch(`https://iceposeidonvsnepal-api.onrender.com/data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data, // Assuming data contains the entire JSON data object
        challenges: data.challenges.map((ch) => {
          if (ch.id === challenge.id) {
            // Update the completed_at field for the specific challenge
            return { ...ch, completed_at: currentDate };
          }
          return ch;
        }),
        // update the point also when challenge is completed
        current_point: data.current_point + challenge.point_reward,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update challenge");
        }
        // Handle success response
        console.log("Challenge completed successfully");
      })
      .catch((error) => {
        console.error("Error completing challenge:", error);
      });
  };

  return (
    <div className="main-admin-container">
      <div className="admin-container">
        <div className="challenges-title">Challenges</div>
        <div className="incomplete-challenge-section">
          {challenges?.map((challenge, i) => (
            <div className="challenge-list" key={i}>
              <div className="challenge-list-text">
                <div className="point-text">
                  For {challenge.point_reward} points
                </div>
                <div>{challenge.title}</div>
              </div>
              <div
                className={
                  challenge.completed_at === null
                    ? "mark-as-complete-button"
                    : "completed-button"
                }
                onClick={() => completeHandler(challenge)}
              >
                {challenge.completed_at === null
                  ? "Mark as Complete"
                  : "Completed"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
