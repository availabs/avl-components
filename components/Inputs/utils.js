const DATE_REGEX = /^\d{4}-[01][0-9]-[0-3][0-9]$/,
  NUMBER_REGEX = /^(-(?=[1-9]|(0[.]0*[1-9]+)))?\d*[.]?\d+/;

const PARENS_REGEX = /^([\[\(])(-?\d+),(-?\d+)([\)\]])$/,
  COMPARATORS = [">", ">=", "<", "<="];

const testNumber = (num, verify) => {
  verify = verify.replace(/\s/g, "");

  const match = PARENS_REGEX.exec(verify);
  if (match) {
    let verified = true;

    const [, open, min, max, close] = match;
    if (open === "(") {
      verified = verified && (+num > min)
    }
    else if (open === "[") {
      
    }
  }
  console.log("MATCH:", match)
}

export const verifyValue = (value, type, verify = null) => {
  switch (type) {
    case "number": {
console.log("NUMBER VERIFY:", verify)
      // Boolean(verify) && testNumber(value, verify);
      return NUMBER_REGEX.test(value);
    }
    case "date": {
      const regex = ((typeof verify === "string") ? new RegExp(verify) : DATE_REGEX);
      return regex.test(value);
    }
    default: {
      const regex = ((typeof verify === "string") ? new RegExp(verify) : false);
      return !regex || regex.test(value);
    }
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
