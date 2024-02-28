Stage 3:

1. Move infra files to ./base folder

```
mkdir base
mv db.ts db_test.ts index.ts k8s.ts vm.ts Pulumi.dev.yaml Pulumi.yaml ./base
```

2. Create new project

```
mkdir app && cd app
pulumi new gcp-typescript --name app
rm -rf .gitignore ./node_modules/ package.json package-lock.json tsconfig.json
```
remove 
```
    "main": "index.ts",
```
from package.json


3. Export k8s config in base project
https://www.pulumi.com/registry/packages/kubernetes/how-to-guides/gke/#new-gke-cluster

4. Import k8s config in app project using StackReference
https://www.pulumi.com/learn/building-with-pulumi/stack-references/

5. Create k8s namespace in app project using k8s.Provider
https://www.pulumi.com/registry/packages/kubernetes/api-docs/provider/
https://www.pulumi.com/registry/packages/kubernetes/api-docs/core/v1/namespace/