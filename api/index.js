const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      const params = new URLSearchParams(body);
      const targetUrl = params.get('ajax_url');

      if (!targetUrl) {
        return res.status(400).send('URL is required');
      }

      try {
        const response = await axios.get(targetUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
          timeout: 10000
        });
        res.status(200).send(response.data);
      } catch (error) {
        res.status(500).send("Error fetching the website: " + error.message);
      }
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
