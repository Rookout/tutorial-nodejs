const cleanString = (str) => {
  const regex = new RegExp(/[>|<|;|`|&|/|\\]/g);
  let trimmedStr = str.replace(regex, '');
  trimmedStr = trimmedStr.trim();
  return trimmedStr;
};

module.exports = {
  cleanString,
};
