import { url } from "inspector";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Carrinho, ResponseAuth } from "../entities/types";
import api from "../services/api";

type AuthContextTypes = {
    admin: boolean
    authenticated: boolean
    user: UserType | undefined
    login: (email: string, senha: string) => Promise<any>
    logout: () => void
    cadastro: (nome: string, email: string, senha: string)=> Promise<any>
    resetPassword: (email: string | undefined, token: string | undefined, newPassword: string) => Promise<any>
    esqueciMinhaSenha: (email: string) => Promise<any>
    loading: boolean
    erroCadastro: boolean
    setErroCadastro: Dispatch<SetStateAction<boolean>>
    btnDisabled: boolean
    setBtnDisabled: Dispatch<SetStateAction<boolean>>
    carrinhoGlobal?: Array<Carrinho>
    atualizarCarrinho?: (newValues: Carrinho) => void
}

type AuthContextProviderProps = {
    children: ReactNode
}

type UserType = {
    id: string
    email: string
    token: string
    password?: string
    newPassword?: string
    permissions: string
}

export const AuthContext = createContext({} as AuthContextTypes)

export function AuthProvider(props: AuthContextProviderProps) {

    const navigate = useNavigate()
    const [urlPath] = useState(window.location.pathname)
    const [user, setUser] = useState<UserType | undefined>()
    const [admin, setAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [erroCadastro, setErroCadastro] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [carrinhoGlobal, setCarrinhoGlobal] = useState<Carrinho[]>([])

    useEffect(() => {
        const usuarioRecuperado = localStorage.getItem('user')
        if (usuarioRecuperado) {
            setUser(JSON.parse(usuarioRecuperado))
            if(JSON.parse(usuarioRecuperado).permissions === 'ADMIN'){
                setAdmin(true)
                navigate(`${urlPath}`)
            }
        }
        setLoading(false)
    }, [])

    function atualizarCarrinho(newValues: Carrinho){
        setCarrinhoGlobal([...carrinhoGlobal, newValues])
    }

    async function login(email: string, senha: string){
        await api.post<ResponseAuth>("/authenticated", {
            email: email,
            password: senha
        }).then(res => {
            const usuarioLogado = {
                id: res.data.user._id,
                email: res.data.user.email,
                permissions: res.data.user.permissions,
                token: res.data.token
            }
            if(usuarioLogado.token){
                setUser(usuarioLogado)
                localStorage.setItem('user', JSON.stringify(usuarioLogado))
                localStorage.setItem('token', JSON.stringify(usuarioLogado.token))
                toast.success('Usuário Autenticado!')
                navigate('/')    
            }
            if(usuarioLogado.permissions === "ADMIN"){
                setAdmin(true)
            }
        }).catch(res => {
            const {response:{data:{error}}} = res
            if(error === 'Invalid password'){
                toast.error('Senha não confere!')
            }
            if(error === 'User not found'){
                toast.error('Usuário inválido!')
            }
            setBtnDisabled(false)
        })
    }

    function logout() {
        setUser(undefined)
        localStorage.removeItem('user')
        setAdmin(false)
        navigate('/')
    }

    async function cadastro(nome: string, email: string, senha: string){
        await api.post<ResponseAuth>('auth/register', {
            name: nome,
            email,
            password: senha,
        }).then(res => {
            const usuarioLogado = {
                id: res.data.user._id,
                email: res.data.user.email,
                permissions: res.data.user.permissions,
                token: res.data.token,
            }
            if(usuarioLogado.token){
                toast.success('Cadastro efetuado com sucesso!')
                setUser(usuarioLogado)
                localStorage.setItem('user', JSON.stringify(usuarioLogado))
                navigate('/dashboard')
                setBtnDisabled(false)    
            }
        }).catch(res => {
            if(res.response.data.error === 'User already exists'){
                toast.error('Usuário já existe!')
                setErroCadastro(true)
            }
        })
    }

    async function resetPassword(email: string | undefined, token: string | undefined, password: string){
        api.post('/reset_password', {
            email, 
            token,
            password
        })
        .then(res => {
            setBtnDisabled(false)
            toast.success('Senha atualizada com sucesso!')
            navigate('/login')   
        })
        .catch(res => {
            setBtnDisabled(false)
            toast.error('Houve algum erro ao atualizar a senha! Tente novamente.')
            navigate('/esqueci-minha-senha')
        })
    }

    async function esqueciMinhaSenha (email: string){
        api.post('/forgot_password', {
            email
        })
        .then(res => {
            setBtnDisabled(false)
            toast.success('E-mail enviado com sucesso!')
            navigate('/')
        }).catch(res => {
            setBtnDisabled(false)
            toast.error('Usuário ainda não cadastrado! Se desejar faça seu cadastro.')
            navigate('/cadastro')
        })
    }

    return (
        <AuthContext.Provider value={{
            authenticated: !!user, admin: !!admin, user, loading, login, logout, cadastro, erroCadastro, setErroCadastro, resetPassword, esqueciMinhaSenha, btnDisabled, setBtnDisabled, carrinhoGlobal, atualizarCarrinho
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}