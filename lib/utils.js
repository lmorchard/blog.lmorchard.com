export function mapFn(names, fn) {
  return names.reduce(
    (acc, name) => ({
      ...acc,
      [name]: fn(name),
    }),
    {}
  );
}

export function indexBy(items, keyFn) {
  const index = {};
  for (const item of items) {
    const key = keyFn(item);
    const keys = Array.isArray(key) ? key : [ key ];
    for (const k of keys) {
      if (k) index[k] = [...index[k] || [], item];
    }
  }
  return index;
}

// https://stackoverflow.com/a/48032528
export async function replaceAsync(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}
