const StatsCards = ({ stats }) => {

  return (
    <div className="stats-row">

      <div className="card purple">
        <h1>{stats.newCandidates}</h1>
        <p>New candidates</p>
      </div>

      <div className="card green">
        <h1>{stats.jobApplied}</h1>
        <p>Applications</p>
      </div>

      <div className="card blue">
        <h1>{stats.jobViews}</h1>
        <p>Job views</p>
      </div>

      <div className="card gray">
        <h1>{stats.jobsOpen}</h1>
        <p>Jobs Open</p>
      </div>

    </div>
  );
};

export default StatsCards;