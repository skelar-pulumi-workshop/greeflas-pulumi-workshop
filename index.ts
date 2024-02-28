import { ApplicationDB } from "./db";
import { myCluster } from "./k8s";
import { myInstance } from "./vm";

const appDB = new ApplicationDB("my-db", {})

export const dbPublicIP = appDB.dbInstance.publicIpAddress;
export const clusterName = myCluster.name;
export const instanceName = myInstance.name;
