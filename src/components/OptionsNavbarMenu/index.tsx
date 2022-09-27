import { useNavigate } from "react-router-dom"
import { OptionsNavbarMenuProps } from "./types"

export default function OptionsNavbarMenu(props: OptionsNavbarMenuProps) {

    const navigate = useNavigate()

    return (
            <li onClick={() => navigate(`${props.navigateTo}`)} className={`flex px-5 py-3 justify-start items-center  text-principais-secondary hover:bg-button-hover cursor-pointer text-base ${props.ativa && 'border-l-4'}`}>{props.title}</li>       
    )
}