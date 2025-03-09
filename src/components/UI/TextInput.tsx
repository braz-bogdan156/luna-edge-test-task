import { CustomInputProps } from "../../types";

const TextInput: React.FC<CustomInputProps> = ({ label, name, register, required, pattern, error }) => {
  return (
    <div className="mt-4">
      <label className="block text-lg font-medium text-gray-700">{label}</label>
      <input
        className={`w-full border-2 rounded-md p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name, { required, pattern })}
        placeholder={label}
      />
      <p className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
        {error?.type === "pattern" ? "Only A-z characters, 2-12 length" : "This field is required"}
      </p>
    </div>
  );
};

export default TextInput;