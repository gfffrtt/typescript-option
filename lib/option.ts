export type Some<T> = { type: "some"; data: T };
export type None = "none";
export type Option<T> = {
  option: () => Some<T> | None;
  unwrap: () => None | T;
  unwrap_or: (fallback: T) => T;
  unwrap_or_else: (fn: () => T) => T;
  run: (...fns: ((input: T) => void)[]) => Option<T>;
  transform: (...fns: ((input: T) => Option<T>)[]) => Option<T>;
  map: <U>(fn: (input: T) => Option<U>) => Option<U>;
  map_or: <U>(fn: (input: T) => Option<U>, fallback: U) => U;
  map_or_else: <U>(fn: (input: T) => Option<U>, fallback: () => U) => U;
};
const NONE: None = "none";
const SOME = <T>(data: T): Some<T> => ({ type: "some", data });

export const none = <T>(data: T | None): data is None => data === "none";
export const some = <T>(data: Some<T> | None): data is Some<T> =>
  typeof data === "object" && data.type === "some";
export const wrap = <T>(
  data: T | Some<T> | None | undefined | null
): Option<T> => {
  const option = !!data ? SOME(data as T) : NONE;

  return {
    option: () => option,
    run: (...fns) => {
      fns.forEach((fn) => (some(option) ? fn(option.data) : NONE));
      return wrap(option);
    },
    transform: (...fns) =>
      fns.reduce((maybe, transform) => {
        const data = maybe.option();
        if (some(data)) return transform(data.data);
        return maybe;
      }, wrap(option)),
    unwrap: () => (some(option) ? option.data : NONE),
    unwrap_or: (fallback) => (some(option) ? option.data : fallback),
    unwrap_or_else: (fn) => (some(option) ? option.data : fn()),
    map: <U>(fn: (input: T) => Option<U>) =>
      wrap(some(option) ? fn(option.data).option() : NONE),
    map_or: <U>(fn: (input: T) => Option<U>, fallback: U) => {
      if (!some(option)) return fallback;
      const maybe = fn(option.data).option();
      return some(maybe) ? maybe.data : fallback;
    },
    map_or_else: <U>(fn: (input: T) => Option<U>, fallback: () => U) => {
      if (!some(option)) return fallback();
      const maybe = fn(option.data).option();
      return some(maybe) ? maybe.data : fallback();
    },
  };
};
