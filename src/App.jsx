import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ReactSlider from 'react-slider'
import Select from 'react-select'
import data from './data/mock-data.json'
import JobCard from './components/JobCard'
import TrackerPage from './pages/TrackerPage'
import './App.css'

const JobBoard = ({ bookMarks, onToggle }) => {
  const [salaryRange, setSalaryRange] = useState([0, 2500000])
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [typeFilter, setTypeFilter] = useState('');

  // Prepare skill options for the dropdown
  const allSkills = [...new Set(data.jobs.flatMap(job => job.skills))];
  const skillOptions = allSkills.map(skill => ({ value: skill, label: skill }))

  // Main Filtering Logic
  const filterJobs = data.jobs.filter(job => {
    const company = data.companies.find(c => c.id === job.companyId);
    const searchLower = searchQuery.toLowerCase();
    
    const matchesType = typeFilter === '' || job.jobType === typeFilter;
    const matchesSearch = job.title.toLowerCase().includes(searchLower) || 
                          (company?.name || "").toLowerCase().includes(searchLower);
    const matchesSkills = selectedSkills.length === 0 || 
                          selectedSkills.every(skill => job.skills.includes(skill));
    const matchesSalary = Number(job.salary) >= salaryRange[0] && 
                          Number(job.salary) <= salaryRange[1];

    return matchesType && matchesSkills && matchesSearch && matchesSalary;
  })

  return (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
      {/* SIDEBAR FILTERS */}
      <aside style={{ width: '300px', flexShrink: 0, position: 'sticky', top: '20px', background: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ marginTop: 0 }}>Filters</h2>
        
        <div style={{ marginBottom: "20px" }}>
          <label><strong>Search</strong></label>
          <input 
            data-testid="search-input" 
            placeholder="Search Jobs or Companies..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label><strong>Skills</strong></label>
          <Select 
            isMulti 
            options={skillOptions} 
            placeholder="Select skills..." 
            onChange={choices => setSelectedSkills(choices.map(c => c.value))}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <strong>Salary Range (₹)</strong>
          <div style={{ margin: '10px 0' }}>{salaryRange[0].toLocaleString()} - {salaryRange[1].toLocaleString()}</div>
          <ReactSlider 
            className='horizontal-slider' 
            thumbClassName='example-thumb'
            trackClassName='example-track'
            min={0} max={2500000}
            value={salaryRange}
            onChange={value => setSalaryRange(value)}
            pearling minDistance={100000}
          />
        </div>

        <div>
          <strong>Job Type</strong>
          <div style={{ display: 'flex', gap: '5px', marginTop: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => setTypeFilter('')}>All</button>
            <button onClick={() => setTypeFilter('Remote')}>Remote</button>
            <button onClick={() => setTypeFilter('Hybrid')}>Hybrid</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0 }}>Available Jobs ({filterJobs.length})</h1>
          <div>
            <button data-testid="grid-view-btn" onClick={() => setViewMode('grid')}>Grid View</button>
            <button data-testid="list-view-btn" onClick={() => setViewMode('list')} style={{ marginLeft: "10px" }}>List View</button>
          </div>
        </div>

        <div 
          data-testid="job-list-container" 
          data-view-mode={viewMode}
          style={{
            display: "grid", 
            gridTemplateColumns: viewMode === 'grid' ? "repeat(auto-fill, minmax(280px, 1fr))" : '1fr', 
            gap: "20px"
          }}
        >
          {filterJobs.map(job => {
            const company = data.companies.find(c => c.id === job.companyId);
            return (
              <JobCard 
                key={job.id} 
                job={job} 
                company={company} 
                isBookMarked={bookMarks.includes(job.id)} 
                onToggle={onToggle}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}

function App() {
  const [bookMarks, setBookMarks] = useState(() => {
    const saved = localStorage.getItem('job-bookmarks');
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    localStorage.setItem('job-bookmarks', JSON.stringify(bookMarks));
  }, [bookMarks]);

  const toggleBookMark = (id) => {
    setBookMarks(prev => prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id])
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <nav style={{ marginBottom: "20px", borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <Link to="/" style={{ marginRight: "20px", fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>Home</Link>
        <Link to="/tracker" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>My Bookmarks ({bookMarks.length})</Link>
      </nav>
      <Routes>
        <Route path='/' element={<JobBoard bookMarks={bookMarks} onToggle={toggleBookMark} />} />
        <Route path='/tracker' element={<TrackerPage bookMarks={bookMarks} onToggle={toggleBookMark} />} />
        <Route path="*" element={<h2>404: Page Not Found. <Link to="/">Go Home</Link></h2>} />
      </Routes>
    </div>
  )
}

export default App;