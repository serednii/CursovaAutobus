import { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/data/users"; // Модель користувача або місце зберігання користувачів

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Додайте користувача до бази даних
    users.push({ email, password });

    res.status(201).json({ message: "User registered" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
