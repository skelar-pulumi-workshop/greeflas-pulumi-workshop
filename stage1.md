Stage 1:

1. Auth in gcloud
```
gcloud auth login
gcloud auth application-default login
```

2. Create google bucket for pulumi state https://console.cloud.google.com/storage/browser
3. Pulumi login
```
pulumi login gs://<bucket-name>
```
4. Create gcp project (set correct gcp project name)

```
pulumi new gcp-typescript --name base --force
```

5. Try to create default resource
```
pulumi up
```

6. Remove default bucket resource from index.ts & add:
- CloudSQL: https://www.pulumi.com/registry/packages/gcp/api-docs/sql/databaseinstance/
- K8S: https://www.pulumi.com/registry/packages/kubernetes/how-to-guides/gke/
- Compute instance: https://www.pulumi.com/registry/packages/gcp/api-docs/compute/instance/

Get kubernetes engineVersion param from stack config:
https://www.pulumi.com/docs/concepts/config/

6. Try to create new resources
```
pulumi up
```
