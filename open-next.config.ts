import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
    default: {
        override: {
            wrapper: "cloudflare",
            converter: "edge",
            incrementalCache: "dummy",
            tagCache: "dummy",
            queue: "dummy",
        },
    },
    middleware: {
        external: true,
    },
};

export default config;
