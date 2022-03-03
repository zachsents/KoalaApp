import { useState } from "react"

export default function useStateList(initalValue = [], uniqueKey) {
    const [state, setState] = useState(initalValue)
    return [
        state,
        setState,
        (newItem, addToFront) => {
            setState(prev => {
                if(uniqueKey && prev.map(item => item[uniqueKey]).includes(newItem[uniqueKey]))
                    return prev
                else
                    return addToFront ? [newItem, ...prev] : [...prev, newItem]
            })
        }
    ]
}