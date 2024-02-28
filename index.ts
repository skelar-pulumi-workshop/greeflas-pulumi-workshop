import { db } from "./db";
import { myCluster } from "./k8s";
import { myInstance } from "./vm";

export const dbPublicIP = db.publicIpAddress;
export const clusterName = myCluster.name;
export const instanceName = myInstance.name;
