import { v4 as uuid } from 'uuid';
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";

export const navList = [
    {
        id: uuid(),
        name: 'Home',
        symbol: <FaHome />
    },
    {
        id: uuid(),
        name: 'Library',
        symbol: <FaMusic />
    },
    {
        id: uuid(),
        name: 'Explore',
        symbol: <FaCompass />
    }
]