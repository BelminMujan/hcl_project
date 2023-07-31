import Kontakti from "../Screens/Dashboard/kontakti/Kontakti";
import MojePonude from "../Screens/Dashboard/mojePonude/mojePonude";
import Oglasi from "../Screens/Dashboard/oglasi/oglasi";
import PodesavanjeProfila from "../Screens/Dashboard/podesavanjeProfila/podesavanjeProfila";
import Poruke from "../Screens/Dashboard/poruke/poruke";
import PoslanePonude from "../Screens/Dashboard/poslanePonude/poslanePonude";
import SacuvaniPoslovi from "../Screens/Dashboard/sacuvaniPoslovi/SacuvaniPoslovi";

export const sidebar_urls = [
    {
        label: "Podesavanje profila",
        path: "podesavanje_profila",
        element: <PodesavanjeProfila />
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
        label: "Moje ponude",
        path: "moje_ponude",
        element: <MojePonude />
    },
    {
        label: "Oglasi",
        path: "oglasi",
        element: <Oglasi />
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