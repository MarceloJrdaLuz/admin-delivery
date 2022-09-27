import { useEffect, useState } from "react";
import OptionsNavbarMenu from "../OptionsNavbarMenu";

export default function Navbar() {

    const [paginaAtiva, setPaginaAtiva] = useState('')

    useEffect(()=>{
        const pageTitle = document.title
        setPaginaAtiva(pageTitle)
        console.log(paginaAtiva)
    },[setPaginaAtiva, paginaAtiva])

    return (
        <nav className={`flex flex-col w-2/12 min-w-[250px] bg-principais-primary shadow-2xl`}>
            <ul className={`flex flex-col flex-1 `}>
                <li className="py-8"></li>
                <OptionsNavbarMenu title="Início" navigateTo="/" key={'Início'} ativa={paginaAtiva === 'Início' && true}/>

                <OptionsNavbarMenu title="Cadastrar Produtos" navigateTo="/cadastrar-produtos" key={'Cadastrar Produtos'} ativa={paginaAtiva === 'Cadastrar Produtos' && true}/>

                <OptionsNavbarMenu title="Cadastrar Bairros Entrega" navigateTo="/cadastrar-bairros" key={'Cadastrar Bairros Entrega'} ativa={paginaAtiva === 'Cadastrar Bairros' && true}/>

                <OptionsNavbarMenu title="Ver Cárdapio Público" navigateTo="/cardapio-publico" key={'Cardápio Público'}/>
            </ul>
        </nav>
    )
}