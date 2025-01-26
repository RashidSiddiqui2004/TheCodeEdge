import React from "react";
import Link from "next/link";

interface TextDisplayProps {
    id?: string;
    value: string; // value to be rendered
    className?: string; // additional css classes (if user needs to customize the textDisplay component)
    isLink?: boolean; // Determines if the component renders as a Link 
}

const TextDisplay: React.FC<TextDisplayProps> = ({
    id,
    value, // Default value if none is provided
    className = "",
    isLink = true, // Default is true 
}) => {
    const sharedClasses = `bg-gray-900 text-white rounded-lg px-4 py-2 shadow-sm ${className}`;

    return (isLink && value != "") ? (
        <Link href={value} id={id} className={sharedClasses} target="_blank">
            {value}
        </Link>
    ) : (
        <div id={id} className={sharedClasses}>
            {value}
        </div>
    );
};

export default TextDisplay;
