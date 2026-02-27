import { useState, type JSX } from "react";



interface CounterProps {
    initialValue: number;
    children?: JSX.Element;
}

export const Counter = ({ initialValue = 0, children }: CounterProps) => {


    const [count, setCount] = useState(initialValue);

    return (
        <>

            {children}
            <h1 className="text-4xl">Counter</h1>
            <h3 className="text-xl">Value: {count}</h3>
            <button className="bg-blue-500 p-2 mr-2 rounded" onClick={() => setCount(count + 1)}>Incrementar</button>
            <button className="bg-blue-500 p-2 mr-2 rounded" onClick={() => setCount(count - 1)}>Decrementar</button>
        </>
    )
}