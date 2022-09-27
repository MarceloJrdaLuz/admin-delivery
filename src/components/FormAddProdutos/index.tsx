import * as yup from 'yup'
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../Input";
import InputError from "../InputError";
import Botao from "../Botao/Botao";
import { CadastroProdutos } from '../../entities/types';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';


export default function FormCadastrarProdutos() {

    const navigate = useNavigate()

    const esquemaValidacao = yup.object({
        codeProduct: yup.string().required(),
        priceProduct: yup.string().required(),
        productCategory: yup.string(),
        productName: yup.string()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            codeProduct: '',
            priceProduct: '',
            productCategory: '',
            productName: ''
        }, resolver: yupResolver(esquemaValidacao)
    })


    async function onSubmit(data: CadastroProdutos) {
        const { codeProduct, priceProduct, productName, productCategory} = data
        await api.post('products', {
            code: codeProduct,
            price: Number(priceProduct),
            category: productCategory,
            productName: productName
        })
        toast.success('Produto cadastrado com sucesso!')
        navigate(`/cadastrar-produtos`)
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
            <h2 className='flex flex-1 p-8 text-principais-primary justify-center items-center text-xl font-bold'>Cadastrar novo produto</h2>
            <form className="flex flex-col justify-center items-center w-11/12 m-auto mt-5" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="flex flex-col w-full">
                    <Input tipo="text" placeholder="Código do Produto" registro={{
                        ...register('codeProduct',
                            { required: "Campo obrigatório" })
                    }}
                        invalido={errors?.codeProduct?.message ? 'invalido' : ''} />
                    {errors?.codeProduct?.type && <InputError type={errors.codeProduct.type} field='codeProduct' />}

                    <Input tipo="text" placeholder="Preço do produto" registro={{
                        ...register('priceProduct',
                            { required: "Campo obrigatório" })
                    }}
                        invalido={errors?.priceProduct?.message ? 'invalido' : ''} />
                    {errors?.priceProduct?.type && <InputError type={errors.priceProduct.type} field='priceProduct' />}


                    <Input tipo="text" placeholder="Categoria" registro={{
                        ...register('productCategory',
                            { required: "Campo obrigatório" })
                    }}
                        invalido={errors?.productCategory?.message ? 'invalido' : ''} />
                    {errors?.productCategory?.type && <InputError type={errors.productCategory.type} field='productCategory' />}

                    <Input tipo="text" placeholder="Nome do produto" registro={{
                        ...register('productName',
                            { required: "Campo obrigatório" })
                    }}
                        invalido={errors?.productName?.message ? 'invalido' : ''} />
                    {errors?.productName?.type && <InputError type={errors.productName.type} field='productName' />}
                </div>
                    <div className='p-5'>
                        <Botao color="bg-button-primary" hoverColor="bg-button-hover" title="Cadastrar Produto" type="submit" />
                    </div>
            </form>
        </>
    )
}