import yaml from 'js-yaml';

function fileParser(fileContent, fileExtension) {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      return `File extension ${fileExtension} is not supported`;
  }
}
export default fileParser;
