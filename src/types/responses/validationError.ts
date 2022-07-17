import Dict from "../dict";

export default interface ValidationError {
  message: string;
  errors: Dict<string[]>;
}
