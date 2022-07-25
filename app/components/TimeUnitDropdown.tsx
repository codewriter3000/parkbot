import { Select, Option } from "@material-tailwind/react";
 
export default function TimeUnitDropdown() {
  return (
    <div className="w-72">
      <Select label="Select time unit">
        <Option>Minutes</Option>
        <Option>Hours</Option>
        <Option>Days</Option>
        <Option>Weeks</Option>
      </Select>
    </div>
  );
}