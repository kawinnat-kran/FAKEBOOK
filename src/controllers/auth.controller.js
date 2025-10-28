export const register = (req, res) => {
  res.send("Register Controller");
};

export const login = (req, res) => {
  res.json({
    mesg: "Login Controller",
    body: req.body,
  });
};

export const getMe = (rq, res) => {
  res.json({
    msg: "GetMe Controller",
  });
};
