// import MultipleSelect from "./MultipleSelect.tsx";
import MultipleSelect from "./MultipleSelect.js";
import SimpleSelect from "./SimpleSelect.js";
import SimpleSelectTotal from "./SimpleSelectTotal.js";

const Select = {
  Simple: SimpleSelect,
  Multiple: MultipleSelect,
  Total: SimpleSelectTotal,
};
export default Select;
