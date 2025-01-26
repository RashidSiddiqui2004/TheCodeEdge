import React from "react";

interface TextDisplayProps {
    id?: string;
    value: string;
    className?: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ id, value, className }) => {
    return (
        <div
            id={id}
            className={`bg-gray-900 text-white rounded-lg px-4 py-2 shadow-sm ${className}`}
        >
            {value}
        </div>
    );
};

export default TextDisplay;
