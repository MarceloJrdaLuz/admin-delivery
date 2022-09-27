import {atom} from 'jotai'

// Estados relacionados ao carrinho de compras

export const carrinho = atom(1)

export const addCarrinho = atom(null, (get, set) => {
    set(carrinho, get(carrinho) +1)
})
export const decCarrinho = atom(null, (get, set) => {
    set(carrinho, get(carrinho) -1)
})
export const zerarCarrinho = atom(null, (get, set) => {
    set(carrinho, 1)
})

// Estados categoria ativa

export const categoriaEscolhida = atom('Todos')

export const setCategoriaEscolhida = atom(null, (get, set, newValue: string)=>{
    set(categoriaEscolhida, newValue)
})

export const mostrarOpcoesCarrinho = atom('')

export const setMostrarOpcoesCarrinho = atom(null, (get, set, value: string)=>{
    set(mostrarOpcoesCarrinho, value)
})

export const valorTotalPedido = atom(0)

export const valorFrete = atom(0)
