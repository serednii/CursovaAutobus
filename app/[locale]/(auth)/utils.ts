import { ICreateUser } from "@/types/next-auth";

export const createUser = async (data: ICreateUser) => {
  // console.log("creayeuser----------------------------", data);
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error; // Повторне кидання помилки
  }
};
