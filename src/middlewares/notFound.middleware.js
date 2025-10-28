import createHttpError from "http-errors";

export default (req, res, next) => {
  //   res.status(404).json({ msg: "Path Not Found" });
  return next(createHttpError.NotFound("Path not found"));
};
