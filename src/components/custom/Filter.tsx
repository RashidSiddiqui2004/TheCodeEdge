import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"

export interface FilterProps {
    title: string
    options: string[]
    selectedOptions: string[]
    updateSelectedOptions: (newOptions: string[]) => void
}

const Filter: React.FC<FilterProps> = ({ title, options, selectedOptions, updateSelectedOptions }) => {

    const handleCheckboxChange = (option: string) => {
        if (selectedOptions.includes(option)) {
            updateSelectedOptions(selectedOptions.filter((item) => item !== option))
        } else {
            updateSelectedOptions([...selectedOptions, option])
        }
    }

    return (
        <div className="space-y-2 border-2 border-slate-700 shadow-lg shadow-gray-900 flex flex-col justify-center text-center items-left 
            px-8 py-5 rounded-lg w-full">
            <h3 className="font-semibold text-2xl">{title}</h3>
            {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                        id={option}
                        checked={selectedOptions.includes(option)}
                        onCheckedChange={() => handleCheckboxChange(option)}
                        className=" border-white bg-white"
                    />
                    <label
                        htmlFor={option}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed
                            peer-disabled:opacity-70"
                    >
                        {option}
                    </label> 
                </div>
            ))}
        </div>
    )
}

export default Filter

