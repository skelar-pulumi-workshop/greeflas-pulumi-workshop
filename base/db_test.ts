import * as pulumi from "@pulumi/pulumi";
import {ApplicationDB} from "./db";
import * as assert from "assert";

pulumi.runtime.setMocks({
        newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
            return {
                id: args.inputs.name + "_id",
                state: args.inputs,
            };
        },
        call: function(args: pulumi.runtime.MockCallArgs) {
            return args.inputs;
        },
    },
    "project",
    "stack",
    false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("Application DB component", function() {
    let db: typeof import("./db");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        db = await import("./db");
    })

    describe("constructor", function() {
        it("should create DB", (done) => {
            const appDB = new ApplicationDB("db", {
                databaseVersion: "TEST",
                postgresPassword: "pass",
                schemas: ["foo", "bar"],
            }, {})

            pulumi.all([appDB.dbInstance.databaseVersion]).apply(([dbVersion]) => {
                try {
                    assert.strictEqual(dbVersion, "TEST");
                    done();
                } catch (e) {
                    done(e);
                }
            })
        })
    });
});
