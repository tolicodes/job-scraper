import axios from 'axios';
import cheerio from 'cheerio';

const keywords = [
    "frontend", "front end", 
    // we need the space otherwise it will match a lot of words
    "ui "
];

export const scrapeFrontendJobs = async (pageUrl: string) => {
  try {
    const { data } = await axios.get(pageUrl);
    const $ = cheerio.load(data);

    const jobs: { title: string, link: string }[] = [];

    // Find all elements and filter those that contain any of the keywords (case-insensitive)
    $('*').each((index, element) => {
      const textContent = $(element).text().trim().toLowerCase();
     
      if (keywords.some(keyword => textContent.includes(keyword))) {
        
        const parent = $(element).closest('a');

        if (parent.length > 0) {
          const jobTitle = $(element).text().trim();
          let jobLink = parent.attr('href');

          // Prepend the page URL if the jobLink starts with '/'
          if (jobLink && jobLink.startsWith('/')) {
            const parsedUrl = new URL(pageUrl);
            jobLink = `${parsedUrl.origin}${jobLink}`;
          }

          if (jobLink) {
            jobs.push({ title: jobTitle, link: jobLink });
          }
        }
      }
    });

    return jobs;
  } catch (error) {
    console.error(`Error scraping URL ${pageUrl}:`, error);
    return null;
  }
};
