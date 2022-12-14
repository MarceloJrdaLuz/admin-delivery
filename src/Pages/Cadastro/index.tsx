import FormCadastro from "../../components/FormCadastro";
import SetPageTitle from "../../functions";

export default function PaginaCadastro() {
    SetPageTitle("Cadastro")

    return (
        <main className={`md:flex md:h-screen`}>
            <section className={`flex w-screen h-screen md:w-7/12 md:h-full  relative md:static`}>
                <img className='w-full h-full' src="https://source.unsplash.com/random/?fast-food" alt="Imagens Aleatórias" />
            </section>
            <section className={`flex flex-wrap w-9/12 sm:w-2/3 h-4/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center md:w-5/12 md:h-full md:static md:transform-none`}>
                <FormCadastro />
            </section>
        </main>
    )
}