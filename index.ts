import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

let config = new pulumi.Config();

const main = new gcp.sql.DatabaseInstance("main", {
    databaseVersion: "POSTGRES_15",
    region: "us-central1",
    settings: {
        tier: "db-f1-micro",
    },
});

const containerService = new gcp.projects.Service("container", {
    disableDependentServices: true,
    service: "container.googleapis.com",
});

const engineVersion = config.require("k8sVersion");

const myCluster = new gcp.container.Cluster("my-cluster", {
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
    },
}, { dependsOn: [containerService] });

const computeEngineService = new gcp.projects.Service("compute-engine", {
    disableDependentServices: true,
    service: "compute.googleapis.com",
});

const myInstance = new gcp.compute.Instance("my-instance", {
    machineType: "n2-standard-2",
    zone: "us-central1-a",
    bootDisk: {
        initializeParams: {
            image: "debian-cloud/debian-11",
        },
    },
    networkInterfaces: [{
        network: "default",
    }],
}, { dependsOn: [computeEngineService] });

export const instanceName = myInstance.name
