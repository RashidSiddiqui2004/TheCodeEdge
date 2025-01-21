import type React from "react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
    keyword: string
    updateKeyword: (keyword: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword, updateKeyword }) => {
    return (
        <div>
            <Input
                type="search"
                placeholder="Search Editorials by keywords..."
                value={keyword}
                onChange={(e) => updateKeyword(e.target.value)}
            />
        </div>
    )
}

export default SearchBar

