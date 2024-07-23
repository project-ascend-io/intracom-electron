/**
 * Uppercase the first letter of every word within a string
 * @param {string} str
 * @returns {string} string in title case
 */
const toTitleCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

export default toTitleCase;
