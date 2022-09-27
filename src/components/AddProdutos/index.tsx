import Navbar from "../Navbar"
import FormCadastrarProdutos from "../FormAddProdutos"
import HeaderAdminTemplate from "../Header"


export default function AddProdutos() {
    return (
        <main className={`flex w-screen h-screen`}>
            <Navbar />
            <section className="flex flex-col w-full">
                <HeaderAdminTemplate />
                <div className="flex flex-col mt-5 w-8/12 rounded-lg shadow-xl h-fit self-center">
                    <FormCadastrarProdutos />
                </div>
            </section>
        </main>
    )
}