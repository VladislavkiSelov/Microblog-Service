function routerError(err, req, res, next) {
  res.render(req.errorRender, { error: err.message || err });
}

module.exports = {
  routerError,
};
