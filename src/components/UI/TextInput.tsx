import {CustomInputProps} from "../../types";

const TextInput = ({ label, name, register, required, pattern, error }: CustomInputProps) => {

    return (
        <div className="mt-2">
            <label className="block font-semibold">{label}</label>
            <input
                className={`w-full border-2 rounded-lg hover:border-violet focus:border-violet outline-none p-2
                ${error ? 'border-red' : ''}`}
                {...register(name, { required, pattern: pattern})} placeholder={label}
            />
            <p className={`${error ? 'text-red' : ''}`}>
                {error?.type === 'pattern' ? 'Only A-z characters, 2-12 length' :
                    'This field is required'}
            </p>
        </div>
    );
}
export default TextInput;