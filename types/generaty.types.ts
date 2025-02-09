export type GenerateBooleanType<T extends string> = {
  [Key in T]: boolean;
};

export type GenerateType<T, K extends keyof T> = {
  [key in K]: key extends K ? T[key] : never;
};
