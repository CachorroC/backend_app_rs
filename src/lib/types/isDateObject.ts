const isDateObject = (
  value: unknown 
): value is Date => {
  return value instanceof Date;
};

export default isDateObject;
