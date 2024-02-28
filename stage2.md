Stage 2:

1. Refactoring: move code into separate vm.ts, k8s.ts & db.ts files.
2. You need to create a DB and postgres schemas (defined in config):

- create custom component ApplicationDB in db.ts
  https://www.pulumi.com/docs/concepts/resources/components/#component-resources
with the next args:
```
export interface ApplicationDBArgs {
    databaseVersion: string;
    postgresPassword: string;
    schemas: string[];
}
```

3. Create gcp.sql.Database, gcp.sql.User (in postgres instance)
4. Create postgres provider using 
```
npm i @pulumi/postgresql
```

https://www.pulumi.com/registry/packages/postgresql/api-docs/provider/

5. Create schemas in DB from config

https://www.pulumi.com/registry/packages/postgresql/api-docs/schema/