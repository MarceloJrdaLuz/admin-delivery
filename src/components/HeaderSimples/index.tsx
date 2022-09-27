import { HeaderSimplesProps } from "./types";

export default function HeaderSimples(props: HeaderSimplesProps) {
    return (
        <header className={`flex justify-center items-center w-screen p-7 text-principais-secondary bg-principais-primary`}>{props.titulo}</header>
    )
}