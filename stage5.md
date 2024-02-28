Stage 5:

1. Create a new github workflow with tests job

```
mkdir -p .github/workflows
```

https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#create-an-example-workflow

2. Add `pulumi up` job (only for main branch)
https://github.com/google-github-actions/auth?tab=readme-ov-file#service-account-key-json
https://github.com/pulumi/actions?tab=readme-ov-file#getting-started

3. Add `pulumi preview` job (only for PR)
