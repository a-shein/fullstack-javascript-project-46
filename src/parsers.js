import yaml from 'js-yaml';

function fileParser(fileContent, fileExtension) {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      return false;
  }
}
export default fileParser;
