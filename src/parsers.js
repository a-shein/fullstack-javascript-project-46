import yaml from 'js-yaml';

function fileParser(fileByteContent, fileExtension) {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileByteContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileByteContent);
    default:
      return false;
  }
}
export default fileParser;
