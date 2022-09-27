import { useSetAtom } from "jotai";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { valorFrete } from "../atoms/atoms";
import { Carrinho, Endereco, Produto } from "../entities/types";
import { useFetch } from "../hooks/useFetch";

type CartContextTypes = {
    carrinhoGlobal?: Array<Carrinho>
    atualizarCarrinho: (newValues: Carrinho) => void
    deletarItem: (itemDeletar: string) => void
    somarCarrinho: () => number
    finalizarCompra: () => void
    enderecoEntrega?: Endereco
    retirar?: boolean
    valorFrete?: number
    opcaoDeEntrega: (retirar: boolean, enderecoEntrega?: Endereco) => void
    bairros?: Array<String>
    setBairros?: Dispatch<SetStateAction<never[]>>
}

type CartContextProviderProps = {
    children: ReactNode
}



export const CartContext = createContext({} as CartContextTypes)

export function CartProvider(props: CartContextProviderProps) {

    const navigate = useNavigate()
    const [retirar, setRetirar] = useState(false)
    const [carrinhoGlobal, setCarrinhoGlobal] = useState<Carrinho[]>([])
    const [enderecoEntrega, setEnderecoEntrega] = useState<Endereco>()
    const { data } = useFetch<Produto[]>(`/products-menu/Todos`)
    const atomSetValorFrete = useSetAtom(valorFrete)
    const [bairros, setBairros] = useState([])

    useEffect(() => {
        const carrinhoRecuperado = localStorage.getItem('carrinho')
        if (carrinhoRecuperado) {
            setCarrinhoGlobal(JSON.parse(carrinhoRecuperado))
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinhoGlobal))
    }, [carrinhoGlobal])

    function atualizarCarrinho(newValues: Carrinho) {
        const carrinhoCopia = [...carrinhoGlobal]
        if (carrinhoGlobal.length < 1) {
            setCarrinhoGlobal([newValues])
            toast.success('Item adicionado ao sacola!')
        }
        if (carrinhoGlobal.length >= 1) {
            const novosValores = newValues
            const filtrado = carrinhoCopia.filter(function (item) {
                return item.code !== novosValores.code
            })
            if (filtrado.length === carrinhoCopia.length) {
                toast.success('Item adicionado ao sacola!', {
                    autoClose: 2000,
                })
            } else {
                toast.success('Sacola atualizado!', {
                    autoClose: 2000
                })
            }
            filtrado.push(newValues)
            setCarrinhoGlobal(filtrado)
            navigate('/carrinho')
        }
        navigate('/')
    }

    function deletarItem(itemDeletar: string) {
        const carrinhoCopia = [...carrinhoGlobal]
        const valorADeletar = itemDeletar
        const filtrado = carrinhoCopia.filter(function (item) {
            return item.nome !== valorADeletar
        })
        setCarrinhoGlobal(filtrado)
    }

    function somarCarrinho() {
        const carrinhoCopia = [...carrinhoGlobal]
        const carrinhoServidor: Array<Carrinho> = []
        let totalCarrinho = 0
        carrinhoCopia.forEach(item => {
            data?.forEach(i => {
                if (i.code === item.code) {
                    totalCarrinho += item.quantidade! * i.price
                    carrinhoServidor.push({
                        code: item.code,
                        nome: item.nome,
                        quantidade: item.quantidade,
                        total: item.total,
                        valor: item.valor
                    })
                }
            })
        })
        console.log(carrinhoServidor)
        return totalCarrinho
    }

    function finalizarCompra() {
        const carrinhoCopia = [...carrinhoGlobal]
        const carrinhoServidor: Array<Carrinho> = []
        let totalCarrinho = 0
        carrinhoCopia.forEach(itemLocal => {
            data?.forEach(itemServidor => {
                if (itemServidor.code === itemLocal.code) {
                    totalCarrinho += itemLocal.quantidade! * itemServidor.price
                    carrinhoServidor.push({
                        code: itemServidor.code,
                        nome: itemServidor.productName,
                        quantidade: itemLocal.quantidade,
                        total: itemLocal.quantidade! * itemServidor.price,
                        valor: itemServidor.price
                    })
                }
            })
        })
        setCarrinhoGlobal(carrinhoServidor)
        console.log(carrinhoServidor)
        return totalCarrinho.toFixed(2)
    }

    function opcaoDeEntrega(retirar: boolean, enderecoEntrega?: Endereco) {
        if (retirar === true) {
            setRetirar(true)
            atomSetValorFrete(0)
            return
        }
        atomSetValorFrete(5)
        setEnderecoEntrega(enderecoEntrega)
    }

    return (
        <CartContext.Provider value={{
            carrinhoGlobal, retirar, enderecoEntrega, atualizarCarrinho, deletarItem, somarCarrinho, finalizarCompra, opcaoDeEntrega, setBairros, bairros
        }}>
            {props.children}
        </CartContext.Provider>
    )
}