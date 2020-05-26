const passthrough = (strings, ...values) =>
  strings.reduce(
    (result, string, idx) =>
      result
        + string
        // There might not be a value at this idx, 
        // if the template ends in a literal string
        + (values[idx] ? values[idx] : ""),
    ""
  );
const msg = "test";
const str = passthrough`
  Hello world, this is a ${msg} of a tagged template.
`;
console.log(str);
// Hello world, this is a test of a tagged template.
