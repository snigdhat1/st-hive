import { useState } from "react";
import "./MultiSelect.css";

const MultiSelect = ({ multiSelectItems }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false); 

    const dropDownOpen = (id) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(item => item !== id) 
                : [...prevSelected, id] 
        );
    };
    console.log(multiSelectItems)
    console.log("Dropdown open:", isOpen);
    return (
        <div className="multi-select-container">
            <h1>Multi Select</h1>
            <div className="multi-select-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedItems.length > 0
                        ? multiSelectItems
                            .filter(item => selectedItems.includes(item.id))
                            .map(item => item.title)
                            .join(", ") 
                        : "Select an option"}
                </span>
                <span className="multi-select-caret">{isOpen ? "▲" : "▼"}</span>
            </div>

            {/* Dropdown options list */}
            {isOpen && (
                <ul className={`multi-select-options ${isOpen ? "open" : ""}`}>
                    {multiSelectItems.map((item) => {
                        const isSelected = selectedItems.includes(item.id);
                        return (
                            <li
                                key={item.id}
                                className="multi-select-option"
                                onClick={() => dropDownOpen(item.id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    className="multi-select-checkbox"
                                    readOnly
                                />
                                <span>{item.title}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default MultiSelect;