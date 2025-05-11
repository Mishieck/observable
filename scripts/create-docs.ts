const code = Deno.readTextFileSync("./mod.test.ts");
const markdown = Deno.readTextFileSync("./README.template.md");
const markdownCodeBlockPattern = "'USAGE_CODE';";

Deno.writeTextFileSync(
  "./README.md",
  markdown.replace(markdownCodeBlockPattern, code),
);
