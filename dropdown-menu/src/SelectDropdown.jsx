import { useState, useEffect, useRef } from "react";
import "./SelectDropdown.css";

const SelectDropdown = ({ items, multiSelect = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedItems, setSelectedItems] = useState(multiSelect ? [] : null);

    // Effect to handle clicks outside the dropdown. If clicked outside of the dropdown, the dropdown will close.
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // Function to handle item selection
    const handleSelection = (id) => {
        if (multiSelect) {
            setSelectedItems((prevSelected) =>
                prevSelected.includes(id)
                    ? prevSelected.filter(item => item !== id)
                    : [...prevSelected, id]
            );
        } else {
            setSelectedItems(id);
            setIsOpen(false);
        }
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <span>
                    {multiSelect
                        ? selectedItems.length > 0
                            ? items
                                .filter(item => selectedItems.includes(item.id))
                                .map(item => item.title)
                                .join(", ")
                            : "Select options"
                        : selectedItems
                        ? items.find(item => item.id === selectedItems)?.title
                        : "Select an item"}
                </span>
                <span className="dropdown-caret">{isOpen ? "▲" : "▼"}</span>
            </button>
            {/* Dropdown options */}
            <ul className={`dropdown-options ${isOpen ? "open" : ""}`}>
                {items.map((item) => {
                    const isSelected = multiSelect
                        ? selectedItems.includes(item.id)
                        : selectedItems === item.id;
                    return (
                        <li
                            key={item.id}
                            className={`dropdown-option ${isSelected ? "selected" : ""}`}
                            onClick={() => handleSelection(item.id)}
                        >   
                            {/* Checkbox for multi-select dropdown */}
                            {multiSelect && (
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                    className="dropdown-checkbox"
                                />
                            )}
                            <span>{item.title}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SelectDropdown;