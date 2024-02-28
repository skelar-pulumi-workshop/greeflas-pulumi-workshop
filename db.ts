import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

export interface ApplicationDBArgs {
    databaseVersion: string;
    postgresPassword: string;
    schemas: string[];
}

export class ApplicationDB extends pulumi.ComponentResource {
    public dbInstance: gcp.sql.DatabaseInstance

    constructor(name: string, args: ApplicationDBArgs, opts: pulumi.ComponentResourceOptions) {
        super("pkg:index:ApplicationDB", name, {}, opts);

        const parentOpts = { parent: this, ...opts };

        this.dbInstance = new gcp.sql.DatabaseInstance("main", {
            databaseVersion: args.databaseVersion,
            region: "us-central1",
            settings: {
                tier: "db-f1-micro",
            },
        }, { aliases: ["urn:pulumi:dev::base::gcp:sql/databaseInstance:DatabaseInstance::main"], ...parentOpts });

        const database = new gcp.sql.Database("app", {
            name: "app",
            instance: this.dbInstance.name,
        }, parentOpts);

        const postgresUser = new gcp.sql.User("postgres", {
            name: "postgres",
            instance: this.dbInstance.name,
            password: args.postgresPassword,
        }, parentOpts)
    }
}
