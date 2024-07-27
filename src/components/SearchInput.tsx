import { ChangeEventHandler } from "react";

interface SearchInputProps {
    value: string;
    onChange: ChangeEventHandler;
}

export default function SearchInput(props: SearchInputProps){
    return(
        <div className="relative w-[250px] max-w-xs mb-4">
            <input
                type="text"
                placeholder="Busque o Nome do Herói"
                value={props.value}
                onChange={props.onChange}
                className="w-full py-3 px-4 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                maxLength={24}
            />
            <svg
                className="absolute top-[30px] right-3 transition-all transform -translate-y-1/2 text-gray-500"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12.907 11.265a6.5 6.5 0 1 0-1.002 1.002 6.5 6.5 0 0 0 1.002-1.002zM11 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" />
            </svg>
        </div>
    )
}