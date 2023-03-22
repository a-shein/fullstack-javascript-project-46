function makeJson(diffs, params, replacer) {
  return JSON.stringify(diffs, params, replacer);
}

export default makeJson;
