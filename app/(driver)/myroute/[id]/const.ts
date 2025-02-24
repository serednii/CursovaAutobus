// Функція для створення об'єкта з усіма значеннями `true`
// function createSelectUser<T extends Record<string, boolean>>(): T {
//   const keys = Object.keys({} as T) as (keyof T)[];
//   console.log(keys);
//   return keys.reduce((acc, key) => {
//     acc[key] = true;
//     return acc;
//   }, {} as T);
// }

// // Використання
// export const selectUser = createSelectUser<IGetUsersByIdBySelectOption>();
