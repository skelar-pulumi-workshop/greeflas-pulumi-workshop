import * as gcp from "@pulumi/gcp";

export const db = new gcp.sql.DatabaseInstance("main", {
    databaseVersion: "POSTGRES_15",
    region: "us-central1",
    settings: {
        tier: "db-f1-micro",
    },
});
