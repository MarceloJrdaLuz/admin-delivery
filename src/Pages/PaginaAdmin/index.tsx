import AdminTemplate from "../../components/AdminTemplate";
import SetPageTitle from "../../functions";

export default function PaginaAdmin() {

    SetPageTitle("Início")
    return (
        <main>
            <AdminTemplate/>
        </main>
    )
}