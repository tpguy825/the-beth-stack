/**
 * @type {import('prettier').Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
const config = {
	tabWidth: 4,
	useTabs: true,
	printWidth: 115,
	arrowParens: "always",
	bracketSameLine: true,
	bracketSpacing: true,
	singleQuote: false,
	endOfLine: "crlf",
	trailingComma: "all",
	semi: true,
	plugins: ["@ianvs/prettier-plugin-sort-imports"],
};

export default config;
