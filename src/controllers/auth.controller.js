import createHttpError from "http-errors";
import identityKeyUtil from "../utils/identity-key.util.js";
import prisma from "../config/prisma.config.js";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../validations/schema.js";
import { id } from "zod/locales";

export const register = async (req, res, next) => {
  const { identity, firstName, lastName, password, confirmPassword } = req.body;
  //validation
  //trim คือ  ตัดช่องว่าง หน้า-หลัง ออก

  //ท่าแรก
  // if (
  //   !identity.trim() ||
  //   !firstName.trim() ||
  //   !lastName.trim() ||
  //   !password.trim() ||
  //   !confirmPassword.trim()
  // ) {
  //   return next(createHttpError[400]("กรุณากรอกข้อมูลให้ครบถ้วน"));

  //  ถ้าใช้ท่านี้ไม่ต้องใส่ next ใน parameter
  // return res.json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  // }

  //ท่านี้ใช้ zod npm i zod
  const rs = registerSchema.parse(req.body);
  console.log(rs);

  //check password match แร่สามารถไปทำใน shema.js ได้
  // if (confirmPassword !== password) {
  //   return next(createHttpError[400]("รหัสผ่านไม่ตรงกัน"));
  // }
  //check Idenetity is email or mobile
  const identityKey = identityKeyUtil(identity);
  if (!identityKey) {
    return next(createHttpError[400]("รูปแบบอีเมลหรือเบอร์โทรศัพท์ไม่ถูกต้อง"));
  }
  //find user if already have registered
  const haveUser = await prisma.user.findUnique({
    where: { [identityKey]: identity },
  });
  if (haveUser) {
    return next(createHttpError[409]("มีผู้ใช้ในระบบแล้ว"));
  }

  const newUser = {
    [identityKey]: identity,
    password: await bcrypt.hash(password, 10),
    firstName: firstName,
    lastName: lastName,
  };
  const result = await prisma.user.create({ data: newUser });

  res.json({
    msg: "Register successfully",
    result: result,
    // mesg: `identityKey = ${identityKey}`,
  });
};

export const login = async (req, res, next) => {
  //   throw new Error("This is my way");
  //   if (req.body.password === "a1234") {
  //     return next(createHttpError[400]("Bad Password"));
  //   }
  const { identity, password } = req.body;
  const user = loginSchema.parse(req.body);
  const identityKey = identityKeyUtil(identity);
  if (!identityKey) {
    return next(createHttpError[400]("รูปแบบอีเมลหรือเบอร์โทรศัพท์ไม่ถูกต้อง"));
  }

  const foundUser = await prisma.user.findUnique({
    where: { [identityKey]: identity },
  });
  if (!foundUser) {
    return next(createHttpError[401]("ไม่พบผู้ใช้ในระบบ"));
  }
  let pwOk = await bcrypt.compare(password, foundUser.password);
  if (!pwOk) {
    return next(createHttpError[401]("รหัสผ่านไม่ถูกต้อง"));
  }
  res.json({
    mesg: "Login Successfully",
    body: req.body,
  });
};

export const getMe = (req, res) => {
  res.json({
    msg: "GetMe Controller",
  });
};
