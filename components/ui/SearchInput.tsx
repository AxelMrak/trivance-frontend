import SearchIcon from "@components/icons/SearchIcon";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
  className = "",
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent bg-gray-50 placeholder-gray-400 text-gray-900 transition-all duration-300 ease-in-out"
      />
    </div>
  );
}

