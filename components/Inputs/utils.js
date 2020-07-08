const DATE_REGEX = /^\d{4}-[01][0-9]-[0-3][0-9]$/,
  NUMBER_REGEX = /^(-(?=[1-9]|(0[.]0*[1-9]+)))?\d*[.]?\d+/;

export const verifyValue = (value, type, regex = null) => {
  if (typeof regex === "string") {
    regex = new RegExp(regex);
  }
  switch (type) {
    case "number":
      return regex ? regex.test(value) : NUMBER_REGEX.test(value);
    case "date":
      return regex ? regex.test(value) : DATE_REGEX.test(value);
    default:
      return regex ? regex.test(value) : true;
  }
}

export const hasValue = value => {
  if ((value === null) || (value === undefined)) return false;
  if ((typeof value === "string") && !value.length) return false;
  if (Array.isArray(value)) return value.reduce((a, c) => a || hasValue(c), false);
  if ((typeof value === "number") && isNaN(value)) return false;
  if ((typeof value === "object")) return Object.keys(value).reduce((a, c) => a || hasValue(value[c]), false);
  return true;
}
