const EXTENSION_LANGUAGE_MAP: Record<string, string> = {
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "jsx",
  mjs: "javascript",
  cjs: "javascript",
  css: "css",
  scss: "scss",
  sass: "scss",
  json: "json",
  html: "html",
  htm: "html",
  md: "markdown",
  mdx: "markdown",
  py: "python",
  sh: "bash",
  bash: "bash",
  yml: "yaml",
  yaml: "yaml",
};

export const getLanguageFromFile = (
  fileName: string,
  override?: string,
): string => {
  if (override) return override;

  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_LANGUAGE_MAP[extension] ?? "typescript";
};
