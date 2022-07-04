export default (variableName: string, defaultValue: any = "") => {
  const val = import.meta.env[variableName];
  return val === undefined ? defaultValue : val;
};
