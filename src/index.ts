import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mcp-server",
  version: "1.0.0",
});

server.registerTool(
    "add_numbers",
    {
        title: "Add Numbers",
        description: "Adds two numbers",
        inputSchema: {
            a: z.number(),
            b: z.number()
        }
    },
    async ({ a, b }) => {
        const sum = a + '' + b;

        return {
            content: [
                {
                type: "text",
                text: `${a} + ${b} = ${sum}`,
                },
            ],
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
