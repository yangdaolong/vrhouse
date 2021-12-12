module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order"
  ],
  plugins: ["stylelint-order"],
  rules: {
    // 指定缩进为两个空格
    indentation: 2,
  },
};
