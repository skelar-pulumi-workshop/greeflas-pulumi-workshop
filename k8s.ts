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
}, { dependsOn: [containerService] });
