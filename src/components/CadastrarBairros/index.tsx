import FormCadastrarBairros from "../FormCadastrarBairros"
import Header from "../Header"
import Navbar from "../Navbar"

export default function CadastrarBairros() { 
    return (
        <main className={`flex w-screen h-screen`}>
        <Navbar />
        <section className="flex flex-col w-full">
            <Header />
            <div className="flex flex-col mt-5 w-8/12 rounded-lg shadow-xl h-fit self-center">
                <FormCadastrarBairros />
            </div>
        </section>
    </main>
    )
}