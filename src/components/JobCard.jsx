import { Bookmark } from 'lucide-react';

const JobCard = ({ job, company, isBookMarked, onToggle }) => {
    const getDaysAgo = (dateString) => {
        const posted = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - posted);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days ago`;
    };
    return (
        <div 
            data-testid={`job-card-${job.id}`}
            style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", position: "relative" }}
        >
            {/* FIX 1: Added onClick and dynamic color for bookmark */}
            <button 
                onClick={() => onToggle(job.id)}
                data-testid={`bookmark-btn-${job.id}`}
                style={{ 
                    position: "absolute", 
                    border: "none", 
                    top: "10px", 
                    right: "10px", 
                    background: "none", 
                    cursor: "pointer",
                    color: isBookMarked ? "#facc15" : "#666" // Gold if bookmarked
                }}
            >
                {/* Use fill attribute to show if it's active */}
                <Bookmark size={20} fill={isBookMarked ? "#facc15" : "none"} />
            </button>

            <h3>{job.title}</h3>
            <p><strong>{company?.name}</strong></p>
            <p>{job.location} | {job.jobType}</p>
            <p data-testid="job-salary">₹{job.salary.toLocaleString()}</p>

            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '10px' }}>
                {
                    // FIX 2: Used () for implicit return so skills actually appear
                    job.skills.map((ele) => (
                        <span key={ele} style={{ background: '#eee', padding: "2px 8px", borderRadius: "4px", fontSize: "12px" }}>
                            {ele}
                        </span>
                    ))
                }
            </div>
            <p style={{fontSize: '12px', color: '#888'}}>{getDaysAgo(job.postedDate)}</p>
        </div>
    );
}

export default JobCard;