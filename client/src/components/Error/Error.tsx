type Props = {
    error: any;
    resetErrorBoundary: (...args: any[]) => void;
}

const Error: React.FC<Props> = ({ error, resetErrorBoundary }) => {


    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className=" text-lg">{error.message}</h1>
            <button className="bg-green-400 border-0 p-2 mt-5 rounded-md" onClick={resetErrorBoundary}>Reload Page</button>
        </div>
    )
}

export default Error
