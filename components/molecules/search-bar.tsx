import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "../atoms/input"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void
}

export function SearchBar({ onSearch, className, ...props }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className={`pl-10 ${className}`}
        onChange={(e) => onSearch(e.target.value)}
        {...props}
      />
    </div>
  )
}
