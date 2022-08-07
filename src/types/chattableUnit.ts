import Unit from "./unit";

export default interface ChattableUnit extends Unit {
  group_id: number;
  is_one_to_one: boolean;
}
