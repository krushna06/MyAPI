const axios = require('axios');
const cheerio = require('cheerio');

exports.getBlogNames = async (req, res) => {
  try {
    const response = await axios.get('https://n0step.xyz/blogs');
    const html = response.data;
    
    const $ = cheerio.load(html);
    
    const blogNames = [];
    
    $('a.text-lg.font-medium.text-primary').each((index, element) => {
      blogNames.push($(element).text().trim());
    });

    res.json({ blogs: blogNames });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog names' });
  }
};
