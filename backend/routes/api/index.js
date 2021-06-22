//---URLs of the routes in the api router will be prefixed with /api ---//
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const photosRouter = require('./photos.js');
const albumsRouter = require('./albums.js');
const commentsRouter = require('./comments.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/photos', photosRouter);
router.use('/albumsRouter', albumsRouter);
router.use('/commentsRouter', commentsRouter)


router.post('/test', function(req, res) {
    res.json({requestBody: req.body});
})

// Add a XSRF-TOKEN cookie in development for frontend application
//to use
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.json({});
    });
  }



module.exports = router;
