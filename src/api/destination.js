const {Router} = require('express');
const Destination = require('../persistence/destination');

const router = new Router();

router.post('/destination', async (request, response) => {
  try {
    const {destination} = request.body;
    
    const result = await Destination.search(destination);
    return response.status(200).json(result);
  } catch (error) {
    console.error(
      `Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

module.exports = router;
