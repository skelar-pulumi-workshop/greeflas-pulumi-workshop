import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

let config = new pulumi.Config();
const engineVersion = config.require("k8sVersion");

const containerService = new gcp.projects.Service("container", {
    disableDependentServices: true,
    service: "container.googleapis.com",
});

export const myCluster = new gcp.container.Cluster("my-cluster", {
    initialNodeCount: 1,
    minMasterVersion: engineVersion,
    nodeVersion: engineVersion,
    nodeConfig: {
        machineType: "n1-standard-1",
        oauthScopes: [
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/monitoring"
        ],
        diskSizeGb: 50,
    },
    deletionProtection: false,
}, { dependsOn: [containerService] });

export const kubeconfig = pulumi.
all([ myCluster.name, myCluster.endpoint, myCluster.masterAuth ]).
apply(([ name, endpoint, masterAuth ]) => {
    const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
    return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${masterAuth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      command: gke-gcloud-auth-plugin
      installHint: Install gke-gcloud-auth-plugin for use with kubectl by following
        https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
      provideClusterInfo: true
`;
});
