import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["app/**/*.tsx","components/**/*.tsx"],
  generates: {
    "./__generated__frontend__types/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  }
};

export default config;