import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const defaultInstance = new gcp.compute.Instance("example", {
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
});


const containerService = new gcp.projects.Service("container", {
    disableDependentServices: true,
    service: "container.googleapis.com",
});

const config = new pulumi.Config();
const engineVersion = config.require("k8sVersion");

export const cluster = new gcp.container.Cluster("my-cluster", {
    initialNodeCount: 2,
    minMasterVersion: engineVersion,
    nodeVersion: engineVersion,
    location: "us-central1-a",
    nodeConfig: {
        machineType: "n1-standard-1",
        oauthScopes: [
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/monitoring"
        ],
    },
}, { dependsOn: [containerService] }); // https://www.pulumi.com/docs/concepts/options/dependson/

const dbInstance = new gcp.sql.DatabaseInstance("main", {
    databaseVersion: "POSTGRES_15",
    region: "us-central1",
    settings: {
        tier: "db-f1-micro",
    },
});

export const instanceName = defaultInstance.name;
