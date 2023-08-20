import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./Schema.ts",
  generates: {
    "./__defined__server__types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#DataSourceContext",
        mappers: {
          Movie: "./models#MovieModel",
          Show:"./models#ShowModel",
          Season:"./models#SeasonModel",
          Episode:"./models#EpisodeModel"
        },
      },
    },
  },
};

export default config