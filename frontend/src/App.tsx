import React from 'react';
import JobList from './JobList';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">All Jobs</Link></li>
            <li><Link to="/new">New Jobs</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/new">
            <JobList filterNew={true} />
          </Route>
          <Route path="/">
            <JobList filterNew={false} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
