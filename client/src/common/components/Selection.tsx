type Props = {
    id: string;
    handleInput: (e: React.FormEvent<HTMLSelectElement>) => void;
    width: number;


}

const Selection: React.FC<Props> = ({ id, handleInput, width }) => {

    const classNameString = `w-${width} h-10 min-h-fit rounded-sm border-2 border-neutral-200 p-1`
    return (
        <select

            id={id}
            onChange={handleInput}
            defaultValue={'DEFAULT'}
            className={classNameString}
        >
            <option value="DEFAULT" disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>

        </select>
    )
}

export default Selection
