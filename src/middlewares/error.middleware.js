export default (err, req, res, next) => {
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      errors: err.issues,
      // errors: err.errors.issue.map((err) => message),
    });
  }
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message || "Server Error!!",
  });
};
