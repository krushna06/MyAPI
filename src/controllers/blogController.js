const axios = require('axios');
const cheerio = require('cheerio');

exports.getBlogDetails = async (req, res) => {
  try {
    const response = await axios.get('https://n0step.xyz/blogs');
    const html = response.data;
    
    const $ = cheerio.load(html);
    
    const blogs = [];
    
    $('ul.animated-list.flex > li').each((index, element) => {
      const title = $(element).find('a.text-lg.font-medium.text-primary').text().trim();
      const date = $(element).find('time.text-sm.text-secondary').text().trim();
      const description = $(element).find('p.line-clamp-3').text().trim();
      
      if (title) {
        blogs.push({
          title,
          date,
          description
        });
      }
    });

    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog details' });
  }
};
