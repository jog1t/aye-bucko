module.exports = async ({ context, github }) => {

  return github.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: `This pull request is being automatically deployed.
    
:white_check_mark: [Preview](https://${process.env.FRONTEND_HOST})
    
:mag: [Monitor](https://${process.env.BACKEND_HOST}/monitor)
    `,
  });
};
