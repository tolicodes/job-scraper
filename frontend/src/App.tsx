import React from 'react';
import JobList from './JobList';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <JobList/>
  );
};

export default App;
