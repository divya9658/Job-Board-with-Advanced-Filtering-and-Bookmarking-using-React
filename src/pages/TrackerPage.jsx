import JobCard from '../components/JobCard';
import data from '../data/mock-data.json'
const TrackerPage = ({bookMarks, onToggle})=>{
    const bookMarkedJobs = data.jobs.filter(job=>bookMarks.includes(job.id));
    return(
        <>
        <h1>My BookMarked Jobs</h1>
        <div data-testid="job-list-container" style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"20px"}}>
            {
                bookMarkedJobs.map(job=>{
                    const company = data.companies.find(c=>c.id === job.companyId);
                    return <JobCard key={job.id} job={job} company={company} isBookMarked={true} onToggle={onToggle}/>
                })
            }
        </div>
        </>
    )
}
export default TrackerPage;