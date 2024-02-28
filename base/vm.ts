import * as gcp from "@pulumi/gcp";

const computeEngineService = new gcp.projects.Service("compute-engine", {
    disableDependentServices: true,
    service: "compute.googleapis.com",
});

export const myInstance = new gcp.compute.Instance("my-instance", {
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
