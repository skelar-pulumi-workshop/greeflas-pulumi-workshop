import {cluster} from "./k8s";
import { ApplicationDB } from "./db";
import { vmInstance } from "./vm";
import * as pulumi from "@pulumi/pulumi";

interface DBConfig {
    databaseVersion: string;
    postgresPassword: string;
    schemas: string[];
}

// https://www.pulumi.com/docs/concepts/config/#structured-configuration
let config = new pulumi.Config();
let dbConfig = config.requireObject<DBConfig>("dbConfig");

export const db = new ApplicationDB("my-db", {
    schemas: dbConfig.schemas,
    postgresPassword: dbConfig.postgresPassword,
    databaseVersion: dbConfig.databaseVersion,
});

export const clusterName = cluster.name;
export const dbIP = db.publicIpAddress;
export const vmName = vmInstance.name;
