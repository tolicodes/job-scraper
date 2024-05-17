import { scrapeFrontendJobs } from './scrapers';
import { createClient } from '@supabase/supabase-js';
import YAML from 'yamljs';
import { supabaseKey, supabaseUrl } from './secrets';

interface Company {
  name: string;
  job_listing_urls: string[];
}


const supabase = createClient(supabaseUrl, supabaseKey);

const config: { companies: Company[] } = YAML.load('./scripts/job_boards.yaml');

const scrapeJobs = async () => {
  for (const company of config.companies) {
    for (const url of company.job_listing_urls) {
      const jobs = await scrapeFrontendJobs(url);

      if (jobs && jobs.length > 0) {
        for (const job of jobs) {
          const { data: existingJob, error: selectError } = await supabase
            .from('job_listings')
            .select('id')
            .eq('job_url', job.link)
            .single();

          if (!existingJob) {
            console.log('Inserting job:', job.title);
            const { error: insertError } = await supabase.from('job_listings').insert({
              company: company.name,
              title: job.title,
              job_url: job.link,
              date_found: new Date(),
              is_new: true
            });

            if (insertError) {
              console.error('Error inserting job:', insertError);
            } else {
              console.log('Job inserted successfully:', job.title);
            }
          } else {
            console.log('Job already exists:', job.title);
          }
        }
      } else {
        console.log('No jobs found for URL:', url);
      }
    }
  }
};

scrapeJobs();
