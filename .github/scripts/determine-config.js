const MAIN_DOMAIN = "aye-bucko.pl";

module.exports = ({ context }) => {
  const [branchName] = context.split("/").reverse();

  const frontendHost =
    branchName === "master" ? `${branchName}.${MAIN_DOMAIN}` : MAIN_DOMAIN;
  const backendHost =
    branchName === "master" ? `${branchName}.${MAIN_DOMAIN}` : MAIN_DOMAIN;
  const backendAddress = `ws://${backendHost}`;

  return { branchName, frontendHost, backendHost, backendAddress };
};
