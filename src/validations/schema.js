import z from "zod";

export const registerSchema = z
  .object({
    identity: z.string().min(2, "กรุณากรอกอีเมลหรือเบอร์โทรศัพท์"),
    firstName: z.string().min(2, "กรุณากรอกชื่อ"),
    lastName: z.string().min(2, "กรุณากรอกนามสกุล"),
    password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"),
    confirmPassword: z
      .string()
      .min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  identity: z.string().min(2, "กรุณากรอกอีเมลหรือเบอร์โทรศัพท์"),
  password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"),
});
