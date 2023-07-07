//import React from 'react'

type Props = {

    title: string;
}

const Header = (props: Props) => {
    return (
        <div className=' pt-5'>
            <h1 className="text-center text-5xl text-green-400">{props.title}</h1>
        </div>
    )
}

export default Header
