/**
 * Filter out falsy values from an object
 */
const filterOutFalsyValuesFromObject = (object: object) =>
  Object.fromEntries(Object.entries(object).filter(([_, value]) => !!value));

export { filterOutFalsyValuesFromObject };
