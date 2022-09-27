import * as yup from 'yup'
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../Input";
import InputError from "../InputError";
import Botao from "../Botao/Botao";
import { CadastroBairros } from '../../entities/types';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';


export default function FormCadastrarBairros() {

    const navigate = useNavigate()

    const esquemaValidacao = yup.object({
        nomeBairro: yup.string().required(),
        valorEntrega: yup.string().required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nomeBairro: '',
            valorEntrega: '',
        }, resolver: yupResolver(esquemaValidacao)
    })


    async function onSubmit(data: CadastroBairros) {
        const { nomeBairro, valorEntrega } = data
        await api.post('register-delivery', {
            neighborhood: nomeBairro,
            valueDelivery: Number(valorEntrega),
        }).then(
            res => {
                toast.success('Bairro cadastrado com sucesso!')
                navigate(`/cadastrar-bairros`)
            }
        ).catch(
            res => {
                const { data: { error } } = res.response
                if (error === 'Neighborhood already registered') {
                    toast.error("Bairro já Cadastrado")
                    navigate('/cadastrar-bairros')
                }
            }
        )
    }

    function onError(error: any) {
        toast.error('Algo está errado! Confira todos os campos.', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }


    return (
        <>
            <h2 className='flex flex-1 p-8 text-principais-primary justify-center items-center text-xl font-bold'>Cadastrar Bairros de Entrega</h2>
            <form className="flex flex-col justify-center items-center w-11/12 m-auto mt-5" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="flex flex-col w-full">
                    <Input tipo="text" placeholder="Nome do Bairro" registro={{
                        ...register('nomeBairro',
                            { required: "Campo obrigatório" })
                    }}
                        invalido={errors?.nomeBairro?.message ? 'invalido' : ''} />
                    {errors?.nomeBairro?.type && <InputError type={errors.nomeBairro.type} field='nomeBairro' />}

                    <Input tipo="text" placeholder="Valor da Entrega" registro={{
                        ...register('valorEntrega',
                            { required: "Campo obrigatório" })
                    }}
                        invalido={errors?.valorEntrega?.message ? 'invalido' : ''} />
                    {errors?.valorEntrega?.type && <InputError type={errors.valorEntrega.type} field='valorEntrega' />}
                </div>
                <div className='p-5'>
                    <Botao color="bg-button-primary" hoverColor="bg-button-hover" title="Cadastrar Bairro" type="submit" />
                </div>
            </form>
        </>
    )
}