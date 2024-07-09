const express = require('express')
const router = express.Router()
const {sendToLogin, restoreUser } = require('../utils/auth')
const path = require('path')
// //Add a XSRF-TOKEN cookie to allow any developer to re-set the CSRF token cookie XSRF-TOKEN
router.get('/api/csrf/restore', (req, res) => {
    //set a cookie on the response with the name of XSRF-TOKEN to the valuie of the req.csrfToken method's return
    const csrfToken = req.csrfToken();
    //then send the token as the response for easy retrival
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

const apiRouter = require('./api');
router.use('/api', apiRouter);


router.use(restoreUser);//, sendToLogin

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
      );
    });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/dist")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
      );
    });
  }

  // Add a XSRF-TOKEN cookie in development
  if (process.env.NODE_ENV !== 'production') {
    router.get("/api/csrf/restore", (req, res) => {
      const csrfToken = req.csrfToken();
      res.cookie("XSRF-TOKEN", csrfToken);
      res.status(200).json({
        'XSRF-Token': csrfToken
      });
    });
  }




module.exports = router
