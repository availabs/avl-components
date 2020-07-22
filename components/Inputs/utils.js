const DATE_REGEX = /^\d{4}-[01][0-9]-[0-3][0-9]$/,
  NUMBER_REGEX = /^(-(?=[1-9]|(0[.]0*[1-9]+)))?\d*[.]?\d+/;

const PARENS_REGEX = /^([[(])(-?\d+),(-?\d+)([)]])$/,
  COMPARE_REGEX = /^([><]=?)(\d+)$/;

const processArgs = (num, op, val) => {
  switch (op) {
    case ">":
      return num > val;
    case ">=":
      return num >= val;
    case "<":
      return num < val;
    case "<=":
      return num <= val;
    default:
      return true;
  }
}

const testNumber = (num, verify) => {
  if (!verify) return true;

  verify = verify.replace(/\s/g, "");

  const args = [];

  const hasParens = PARENS_REGEX.exec(verify);
  if (hasParens) {
    const [, open, min, max, close] = hasParens;
    if (open === "(") {
      args.push(">", +min);
    }
    else if (open === "[") {
      args.push(">=", +min);
    }
    if (close === ")") {
      args.push("<", +max);
    }
    else if (close === "]") {
      args.push("<=", +max);
    }
  }
  const hasCompare = COMPARE_REGEX.exec(verify);
  if (hasCompare) {
    const [, op, value] = hasCompare;
    args.push(op, +value);
  }

  let verified = true;
  for (let i = 0; i < args.length; i += 2) {
    verified = verified && processArgs(+num, ...args.slice(i, i + 2));
  }
  return verified;
}

export const verifyValue = (value, type, verify = null) => {
  switch (type) {
    case "number": {
console.log("NUMBER VERIFY:", verify)
      return NUMBER_REGEX.test(value) && testNumber(value, verify);
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
