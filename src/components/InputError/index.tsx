import errors from '../../utils/errors.json'
import { InputErrorsProps } from './types'

export default function InputError({ type, field }: InputErrorsProps) {
    //@ts-expect-error
    return <span className="text-red-500 ">{errors[field][type]}</span>
}