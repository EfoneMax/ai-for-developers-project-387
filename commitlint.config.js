export default {
  extends: ["@commitlint/config-conventional"],
  // release-please генерирует коммит релиза без футера Refs: правило ссылок
  // на тикет к нему не применяется.
  ignores: [(message) => message.startsWith("chore(main): release ")],
  rules: {
    "references-empty": [2, "never"],
  },
};
