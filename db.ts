import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

export class ApplicationDB extends pulumi.ComponentResource {
    public dbInstance: gcp.sql.DatabaseInstance

    constructor(name: string, opts: pulumi.ComponentResourceOptions) {
        super("pkg:index:ApplicationDB", name, {}, opts);

        this.dbInstance = new gcp.sql.DatabaseInstance("main", {
            databaseVersion: "POSTGRES_15",
            region: "us-central1",
            settings: {
                tier: "db-f1-micro",
            },
        }, { parent: this, aliases: ["urn:pulumi:dev::base::gcp:sql/databaseInstance:DatabaseInstance::main"] });
    }
}
