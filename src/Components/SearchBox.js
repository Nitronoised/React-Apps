import { useState } from "react"
import { GiMagnifyingGlass } from "react-icons/gi"

function SearchBox({ handleInput }) {
    const [input, setInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        handleInput(input);
        setInput('');
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="search-box">
            <input onChange={(e) => setInput(e.target.value)}
                type="text" value={input} placeholder="Enter keywords.." />
            <GiMagnifyingGlass className="search-icon" />
        </form>
    )
}
export default SearchBox;