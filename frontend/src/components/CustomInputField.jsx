import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function CustomInputField({
  id,
  icon: Icon,
  labelText,
  type = "text",
  placeholder = "",
  register,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-medium text-gray-700">
        {labelText}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`h-10 w-full rounded-md border text-sm outline-none ${Icon ? "pl-10" : ""} `}
          {...register}
        />
      </div>
    </div>
  );
}

export default CustomInputField;
