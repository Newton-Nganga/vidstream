import { CodegenConfig } from '@graphql-codegen/cli';


const config: CodegenConfig = {
  //schema: "https://vidstream-server.onrender.com/vidstream-server/graphql",
  schema:"http://localhost:4000/vidstream-server/graphql",
  documents: ["src/pages/**/*.tsx","src/components/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  }
};

export default config;