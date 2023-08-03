type Props = {
    id: string;
    handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    maxLength?: number;

}

const TextInput: React.FC<Props> = ({ id, handleInput, placeholder, maxLength }) => {
    return (
        <input
            id={id}
            onChange={handleInput}
            type="text"
            className="w-96 h-10 min-h-fit rounded-sm border-2 border-neutral-200 p-1"
            placeholder={placeholder}
            maxLength={maxLength ? maxLength : 2000}
        />
    )
}

export default TextInput
