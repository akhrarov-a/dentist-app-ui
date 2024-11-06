/**
 * Filter out falsy values from an object
 */
export const filterOutFalsyValuesFromObject = (object: object) =>
  Object.fromEntries(Object.entries(object).filter(([_, value]) => !!value));
