export default function (variableName: string, defaultValue = "") {
  const val = import.meta.env[variableName];
  return val === undefined ? defaultValue : val;
}
