import { keys } from "ts-transformer-keys";
import { structure } from "../interfaces";

export function generate<T extends object>(): structure {
  const typeKeys = keys<T>();

  return typeKeys.reduce((result, key) => {
    return result;
  }, {} as structure);
}
