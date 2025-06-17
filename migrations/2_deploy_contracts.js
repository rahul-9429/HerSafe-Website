const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
var hersafe=artifacts.require ("hersafe");
module.exports = function(deployer) {
      deployer.deploy(hersafe);
}

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(hersafe);
};
