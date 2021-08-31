export const isDev = () => process.env.NODE_ENV === "development";

export const getRandomInt = (a: number, b: number) => {
  const min = Math.ceil(a);
  const max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export * from "./network";
