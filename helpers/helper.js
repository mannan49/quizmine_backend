module.exports = {
  cleanText: function (text) {
    // Implement the text cleaning logic and return the cleaned text
    // For example:
    // return text.trim();
  },

  isBodyPresent: function (data) {
    if (!data || Object.keys(data).length === 0) {
      return "Content cannot be empty";
    } else {
      return null;
    }
  },
};
