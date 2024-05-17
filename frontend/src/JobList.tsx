import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jumrbdehpfpubinniluw.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Job {
  id: string;
  company: string;
  title: string;
  job_id: string;
  date_found: string;
  is_new: boolean;
  url: string;
}

const JobList: React.FC<{ filterNew: boolean }> = ({ filterNew }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_new', filterNew);

      if (filterNew) {
        // Mark jobs as seen
        data.forEach(async (job: Job) => {
          await supabase
            .from('job_listings')
            .update({ is_new: false })
            .eq('id', job.id);
        });
      }

      setJobs(data);
    };

    fetchJobs();
  }, [filterNew]);

  return (
    <div>
      <h1>{filterNew ? 'New Jobs' : 'All Jobs'}</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <a href={job.url}>{job.title}</a> at {job.company} (Found on: {new Date(job.date_found).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
