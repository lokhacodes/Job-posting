import { Link } from "react-router-dom";

const JobCard = ({ job, onDelete, showDelete = false }) => {
  return (
    <div className="job-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span>📍 {job.location}</span>
              <span className="mx-2">•</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                {job.category}
              </span>
            </div>
          </div>
        </div>
        {showDelete && (
          <button
            onClick={() => onDelete(job._id)}
            className="text-red-500 hover:text-red-700 p-2"
            title="Delete Job"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/jobs/${job._id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View Details →
        </Link>
        <span className="text-xs text-gray-400">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
