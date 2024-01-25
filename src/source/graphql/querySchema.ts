import { queries } from "./queries";

export const querySchema = (source: string) => {
  switch (source) {
    case "Planet":
      return queries();
    default:
      return undefined;
  }
};
