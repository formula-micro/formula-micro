import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: [
        {
            "https://cms.formula.nu/graphql/": {
                headers: {
                    Authorization: "Bearer KUzicFZBjbbSYjUpjds1ss4EpuFkoXwE",
                }
            }
        }
    ],
    documents: ["**/*.graphql"],
    generates: {
        "./graphql/generated/schema.json": {
            plugins: [
                "introspection"
            ]
        },
        "./graphql/generated/graphql.ts": {
            plugins: [
                "urql-introspection",
                "typescript",
                "typescript-operations",
                "typescript-vue-urql"
            ],
        },
    },
};

export default config;