const mongoose = require('mongoose');

const Demo = mongoose.model('demo');

module.exports = (app) => {
  app.post('/api/demo/', async (req, res) => {
    const demo = new Demo({
      data: req.body.text,
    });
    try {
      await demo.save();
      res.send('success');
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
