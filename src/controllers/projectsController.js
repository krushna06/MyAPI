const axios = require('axios');
const cheerio = require('cheerio');
const { PORTFOLIO_BASE_URL } = require('../config/constants');

exports.getProjects = async (req, res) => {
  try {
    const response = await axios.get(`${PORTFOLIO_BASE_URL}/projects`);
    const html = response.data;
    
    const $ = cheerio.load(html);
    
    const projects = [];
    
    $('ul.animated-list.flex.animate-in.flex-col > li').each((index, element) => {
      const titleElement = $(element).find('a.text-lg.font-medium.text-primary');
      const descriptionElement = $(element).find('p.line-clamp-3.text-tertiary');
      const link = titleElement.attr('href');
      const date = $(element).find('time').text().trim();
      const imageUrl = $(element).find('img').attr('src');

      if (titleElement.length > 0) {
        const title = titleElement.text().trim();
        projects.push({
          title,
          description: descriptionElement.text().trim(),
          link: link ? `${PORTFOLIO_BASE_URL}${link}` : null,
          date,
          imageUrl
        });
      }
    });

    res.json({ projects });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};
