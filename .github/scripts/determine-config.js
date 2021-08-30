const MAIN_DOMAIN = "aye-bucko.pl";
const MAIN_BE_DOMAIN = "src.aye-bucko.pl";

module.exports = ({ context }) => {
  const [branchName] = context.ref.split("/").reverse();

  const frontendHost =
    branchName === "master" ? MAIN_DOMAIN : `${branchName}.${MAIN_DOMAIN}`;
  const backendHost =
    branchName === "master"
      ? MAIN_BE_DOMAIN
      : `srv.${branchName}.${MAIN_DOMAIN}`;
  const backendAddress = `ws://${backendHost}`;

  return { branchName, frontendHost, backendHost, backendAddress };
};
