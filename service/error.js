function routerError(err, req, res, next) {
    res.status(req.status || 400).send({ error: err.message });
  }

module.exports = {
    routerError
};
