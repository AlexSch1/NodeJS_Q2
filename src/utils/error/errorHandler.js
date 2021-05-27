module.exports = (res, error) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message || error,
  });
};
