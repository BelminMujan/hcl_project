import Kontakti from "../Screens/Dashboard/kontakti/Kontakti";
import MojaUsluge from "../Screens/Dashboard/mojeUsluge/mojeUsluge";
import Oglasi from "../Screens/Dashboard/oglasi/oglasi";
import PodesavanjeProfila from "../Screens/Dashboard/podesavanjeProfila/podesavanjeProfila";
import Poruke from "../Screens/Dashboard/poruke/poruke";
import PosaoDetalji from "../Screens/Dashboard/posaoDetalji/PosaoDetalji";
import PoslanePonude from "../Screens/Dashboard/poslanePonude/poslanePonude";
import Poslovi from "../Screens/Dashboard/poslovi/Poslovi";
import SacuvaniPoslovi from "../Screens/Dashboard/sacuvaniPoslovi/SacuvaniPoslovi";
import Usluge from "../Screens/Dashboard/usluge/Usluge";

export const sidebar_urls = [
    {
        label: "Podesavanje profila",
        path: "podesavanje_profila",
        element: <PodesavanjeProfila />
    },
    {
        label: "Poslovi",
        path: "jobs",
        element: <Poslovi />
    },
    {
        label: "Usluge",
        path: "usluge",
        element: <Usluge />
    },
    {
        label: "Sacuvani poslovi",
        path: "sacuvani_poslovi",
        element: <SacuvaniPoslovi />
    },
    {
        label: "Poslane ponude",
        path: "poslane_ponude",
        element: <PoslanePonude />
    },
    {
        label: "Moje usluge",
        path: "moje_ponude",
        element: <MojaUsluge />
    },
    {
        label: "Moji oglasi",
        path: "oglasi",
        element: <Oglasi />,
    },
    {
        label: "Kontakti",
        path: "kontakti",
        element: <Kontakti />
    },
    {
        label: "Poruke",
        path: "poruke",
        element: <Poruke />
    }
]

export const nonSidebarurls = [
    {
        path: "posao/:id",
        element: <PosaoDetalji />
    }
]