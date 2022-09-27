import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PaginaTelaCadastro from "../Cadastro";
import PaginaEsqueciSenha from "../EsqueciSenha";
import PaginaLogin from "../Login";
import PaginaNovaSenha from "../NovaSenha";
import PaginaAddProdutos from "../PaginaAddProdutos";
import PaginaAdmin from "../PaginaAdmin";
import PaginaCadastrarBairros from "../PaginaCadastrarBairros";

export default function AppRoutes() {
    const { admin } = useContext(AuthContext)

    function PrivateRouteAdmin({ children }: { children: JSX.Element }) {
        if (!admin) {
            return <Navigate to={'/login'} />
        }
        return children
    }

    return (
            <Routes>
                <Route path='/'
                    element={
                        <PrivateRouteAdmin>
                            <PaginaAdmin />
                        </PrivateRouteAdmin>
                    } />
                <Route path='/login' element={<PaginaLogin />} />
                <Route path='/cadastro' element={<PaginaTelaCadastro />} />
                <Route path='/cadastrar-produtos'
                    element={
                        <PrivateRouteAdmin>
                            <PaginaAddProdutos />
                        </PrivateRouteAdmin>
                    } />
                <Route path='/cadastrar-bairros'
                    element={
                        <PrivateRouteAdmin>
                            <PaginaCadastrarBairros />
                        </PrivateRouteAdmin>
                    } />
                <Route path='/nova-senha/:token/:email' element={<PaginaNovaSenha />} />
                <Route path='/esqueci-minha-senha' element={<PaginaEsqueciSenha />} />
            </Routes>
    );
}