type Props = {

    title: string;
}

const Header: React.FC<Props> = ({ title }) => {
    return (
        <div className=' pt-5'>
            <h1 className="text-center text-5xl text-green-400">{title}</h1>
        </div>
    )
}

export default Header
