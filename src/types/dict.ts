export default interface Dict<T> {
  [key: string | symbol | number]: T;
}
