import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from './publicSecrets';

const app = express();
const port = 5000;

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
