import { ApplicationDB } from "./db";
import { myCluster, kubeconfig } from "./k8s";
import { myInstance } from "./vm";
import * as pulumi from "@pulumi/pulumi";

interface DBConfig {
    databaseVersion: string;
    postgresPassword: string;
    schemas: string[];
}

const config = new pulumi.Config();
const dbConfig = config.requireObject<DBConfig>("dbConfig")

const appDB = new ApplicationDB("my-db", {
    databaseVersion: "POSTGRES_15",
    postgresPassword: dbConfig.postgresPassword,
    schemas: [
        "foo",
        "bar",
    ],
}, {})

export const dbPublicIP = appDB.dbInstance.publicIpAddress;
export const k8sConfig = kubeconfig;
export const instanceName = myInstance.name;
