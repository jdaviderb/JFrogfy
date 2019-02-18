
module.exports = function() {
  return {
    clientAllowedKeys: ['API_SERVER'],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false,
  };
};
