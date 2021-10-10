const defC = {
  // Testing
};

function opt1(config) {
  return {
    ...config,
    ...defC,
  };
}

module.exports = opt1;
