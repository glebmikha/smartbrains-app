const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'ec8fecd871274b4691a7c55040336891'});

const handleApiCall = (req, res) => {
  app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
  res.json(data);
})
.catch(err => res.status(400).json('unable to work with api'))

}

const handleFindFace = (req, res, db) => {
  const { email } = req.body;
  db('users').where('email', '=', email)
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
    if (entries.length) {
      res.json(entries[0]);
    } else {
      res.status(400).json('no such user');
    }

  })
  .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
  handleFindFace: handleFindFace,
  handleApiCall: handleApiCall
}
