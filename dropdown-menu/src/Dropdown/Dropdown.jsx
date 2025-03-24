import { useState, useEffect, useRef } from "react";
import "./Dropdown.css";

const Dropdown = ({ dropdownItems }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        function handler(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) { 
                setDropdownOpen(false);
            }
        }
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        }; 
    }, []);

    return (
        <div className="container"> 
            <div className="dropdown" ref={dropdownRef}>
                <h1>Dropdown</h1>
                <button 
                    className="toggleDropdown"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <span>{selectedItem ? selectedItem.label : "Select an item"}</span>
                    <span>{dropdownOpen ? "▲" : "▼"}</span>
                </button>
                <div className={`options ${dropdownOpen ? "active" : ""}`}>
                    {dropdownItems.map((options) => (
                        <button 
                            key={options.id} 
                            className={selectedItem?.id === options.id ? "selected" : ""}
                            onClick={() => {
                                setSelectedItem(options);
                                setDropdownOpen(false);
                            }}
                        >
                            {options.label}
                        </button> 
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;