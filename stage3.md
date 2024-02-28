Stage 3:

1. Write unit test db_test.ts
   https://www.pulumi.com/docs/using-pulumi/testing/unit/

2. Add next section to package.json:
```
"scripts": {
   "test": "mocha -r ts-node/register **/*_test.ts"
},
```
3. Run tests:
```
npm run test
```

4. Add pulumi policy
https://www.pulumi.com/docs/using-pulumi/crossguard/configuration/
https://github.com/pulumi/examples/tree/master/policy-packs/gcp-ts

5. Test policy
```
pulumi up --policy-pack ./policies
```