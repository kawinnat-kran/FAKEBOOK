export const register = (req, res) => {
  res.send("Register Controller");
};

export const login = (req, res) => {
  throw new Error("This is my way");
  res.json({
    mesg: "Login Controller",
    body: req.body,
  });
};

export const getMe = (req, res) => {
  res.json({
    msg: "GetMe Controller",
  });
};
