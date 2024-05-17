import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = 5000;

const supabaseUrl = 'https://jumrbdehpfpubinniluw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bXJiZGVocGZwdWJpbm5pbHV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTg5OTU0MywiZXhwIjoyMDMxNDc1NTQzfQ.AbKYghrZdNhdm02ZBuFGH8XnUA0SwI5RUADvdFGpwo8';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());

app.get('/jobs', async (req, res) => {
  const { data, error } = await supabase.from('job_listings').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
