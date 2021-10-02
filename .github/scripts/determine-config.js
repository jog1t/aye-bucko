const MAIN_DOMAIN = "aye-bucko.jogit.pl";
const MAIN_BE_DOMAIN = "src.aye-bucko.jogit.pl";

module.exports = ({ context }) => {
  const [branchName] = (process.env.GITHUB_HEAD_REF || context.payload.ref)
    .split("/")
    .reverse();

  const frontendHost =
    branchName === "master" ? MAIN_DOMAIN : `${branchName}.${MAIN_DOMAIN}`;
  const backendHost =
    branchName === "master"
      ? MAIN_BE_DOMAIN
      : `srv.${branchName}.${MAIN_DOMAIN}`;
  const backendAddress = `wss://${backendHost}`;

  return { branchName, frontendHost, backendHost, backendAddress };
};
