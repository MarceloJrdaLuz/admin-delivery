interface LabelProps {
    texto: string
    readonly?: boolean
    invalido?: boolean
}

export default function Label(props: LabelProps) {
    return (
        <label className={`flex rounded-lg h-full justify-center items-center text-sm md:text-lg font-light absolute top-0 ml-2 py-2.5 sm:p-2 ${props.invalido ? 'text-red-700 ': 'text-blue-gray-500'} -z-50  duration-300 origin-0 ${props.readonly ? 'bg-white' : 'bg-white'}`}>{props.texto}</label>)
}