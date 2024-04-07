const colors = require("colors/safe");

function logger(value) {
  return {
    info: (...arr) => {
      console.log(colors.bgGreen(`${value}:`), ...arr);
    },
    warn: (...arr) => {
      console.warn(colors.bgYellow(`${value}:`), ...arr);
    },
    error: (...arr) => {
      console.error(colors.bgRed(`${value}:`), ...arr);
    },
  };
}

module.exports = logger;
