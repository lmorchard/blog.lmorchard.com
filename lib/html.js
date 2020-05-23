const escapeHtml = require("escape-html");

const html = (strings, ...values) => () =>
  strings
    .reduce((result, string, i) => result + string + htmlValue(values[i]), "")
    .trim();

const htmlValue = (value) => {
  if (!value) {
    return "";
  } else if (typeof value === "function") {
    return value();
  } else if (Array.isArray(value)) {
    return value.map(htmlValue).join("");
  } else if (typeof value === "object") {
    return htmlValue(JSON.stringify(value, null, "  "));
  }
  return escapeHtml(value);
};

const unescaped = raw => () => raw;

const urlencode = raw => () => escapeHtml(encodeURIComponent(raw));

module.exports = {
  html,
  unescaped,
  urlencode,
};
