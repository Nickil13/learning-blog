import {GiStack, GiCat, GiAirplaneDeparture, GiGamepad, GiCoffeeCup, GiHouse, GiHearts} from 'react-icons/gi';
import {BsCodeSlash} from 'react-icons/bs';
import { GoGraph } from 'react-icons/go';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { ImFilesEmpty } from 'react-icons/im';

export const iconData = [
    {
        id:1,
        name: 'home',
        icon: <GiHouse/>,
    },
    {
        id:2,
        name: 'all',
        icon: <GiStack/>,
    },
    {
        id:3,
        name: 'animals',
        icon: <GiCat/>,
    },
    {
        id:4,
        name: 'food',
        icon: <GiCoffeeCup/>,
    },
    {
        id:5,
        name: 'travel',
        icon: <GiAirplaneDeparture/>,
    },
    {
        id:6,
        name: 'games',
        icon: <GiGamepad/>,
    },
    {
        id:7,
        name: 'code',
        icon: <BsCodeSlash/>,
    },
    {
        id:8,
        name: 'wellness',
        icon: <GiHearts/>,
    }
]
export const tagData = [
    {
        id:1,
        name: 'none',
        description: 'none'
    },
    {
        id:2,
        name: 'animals',
        icon: <GiCat/>,
        description: 'Posts about animals, fun facts and pets.'
    },
    {
        id:3,
        name: 'food',
        icon: <GiCoffeeCup/>,
        description: 'Baking, cooking and delicious finds!'
    },
    {
        id:4,
        name: 'travel',
        icon: <GiAirplaneDeparture/>,
        description: 'Places I have travelled or would like to travel.'
    },
    {
        id:5,
        name: 'games',
        icon: <GiGamepad/>,
        description: 'Games I play and enjoy. How games are one of my inspirations for coding.'
    },
    {
        id:6,
        name: 'code',
        icon: <BsCodeSlash/>,
        description: 'Coding adventures, including my thoughts on the technologies I use and my progress as a web developer!'
    },
    {
        id:7,
        name: 'wellness',
        icon: <GiHearts/>,
        description: 'Wellness of the mind and body. Things I enjoy in life, inspirations and my journey.'
    },
    {
        id:8,
        name: 'all',
        icon: <GiStack/>,
        description: 'All the posts I\'ve made.'
    },
]

export const buttonList = [
    {name: "New Post", icon: <AiOutlineFileAdd/>, path: "/admin/new-post"},
    {name: "Drafts", icon: <ImFilesEmpty/>, path: "/admin/drafts"},
    {name: "Posts", icon: <GiStack/>, path: "/admin/posts"},
    {name: "Stats", icon: <GoGraph/>, path: "/admin/stats"}
];



