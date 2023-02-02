import React from 'react' 
import * as FaICons from 'react-icons/fa'
import * as AiICons from 'react-icons/ai'
import * as IoICons from 'react-icons/io'
import * as RiICons from 'react-icons/ri'


export const SidebarData = [
    {
        title:'Overview',
        path:'overview',
        id:'0',
        icon:<AiICons.AiFillHome/>,
        iconClosed:<RiICons.RiArrowDownSFill/>,
        iconOpen:<RiICons.RiArrowUpSFill/>,
        subNav: [
            {
                title:'Users',
                path:'overview/users',
                id:'01',
                icon:<FaICons.FaUser/>
            },

            {
                title:'Listings',
                path:'overview/listings',
                id:'02',
                icon:<FaICons.FaRegListAlt/>
            },
        ]
        
    },
    {
        title:'Products',
        path:'products',
        id:'1',
        icon:<FaICons.FaShoppingCart/>,
        iconClosed:<RiICons.RiArrowDownSFill/>,
        iconOpen:<RiICons.RiArrowUpSFill/>,
        subNav: [
            {
                title:'Buy From Home',
                path:'products/buyfromome',
                id:'11',
                icon:<FaICons.FaCartArrowDown/>
            },

            {
                title:'Insurance',
                path:'products/insurance',
                id:'12',
                icon:<RiICons.RiShoppingCartFill/>
            },
            {
                title:'Financing',
                path:'products/financing',
                id:'13',
                icon:<RiICons.RiShoppingCartFill/>
            },
        ]
        
    },
    {
        title:'Reports',
        path:'reports',
        id:'2',
        icon:<IoICons.IoIosPaper/>,
        iconClosed:<RiICons.RiArrowDownSFill/>,
        iconOpen:<RiICons.RiArrowUpSFill/>,
        subNav: [
            {
                title:'Reports 1',
                path:'reports/reports1',
                id:'21',
                icon:<IoICons.IoIosPaper/>
            },

            {
                title:'Reports2',
                path:'reports/reports2',
                id:'22',
                icon:<IoICons.IoIosPaper/>
            },

            {
                title:'Reports3',
                path:'reports/reports3',
                id:'23',
                icon:<IoICons.IoIosPaper/>
            }
        ]
        
    },

    {
        title:'Team',
        path:'team',
        id:'3',
        icon:<AiICons.AiOutlineTeam/>,
        iconClosed:<RiICons.RiArrowDownSFill/>,
        iconOpen:<RiICons.RiArrowUpSFill/>,
        subNav: [
            {
                title:'Team Reports 1',
                path:'team/team_reports1',
                id:'31',
                icon:<IoICons.IoIosPaper/>
            },

            {
                title:'Team Reports2',
                path:'team/team_reports2',
                id:'32',
                icon:<IoICons.IoIosPaper/>
            },
           
        ]
        
    },

    {
        title:'Messages',
        path:'messages',
        id:'4',
        icon:<FaICons.FaEnvelopeOpenText/>,
        iconClosed:<RiICons.RiArrowDownSFill/>,
        iconOpen:<RiICons.RiArrowUpSFill/>,
        subNav: [
            {
                title:'Messages 1',
                path:'messages/messages1',
                id:'41',
                icon:<FaICons.FaEnvelopeOpenText/>
            },

            {
                title:'Messages 2',
                path:'messages/messages2',
                id:'42',
                icon:<FaICons.FaEnvelopeOpenText/>
            },
          
        ]
        
    },
    
    {
        title:'Support',
        path:'/support',
        id:'5',
        icon:<FaICons.FaQuestionCircle/>,
               
    },
    {
        title:'Miscellaenious',
        path:'',
        id:'6',
        icon:<FaICons.FaEnvelopeOpenText/>,
        iconClosed:<RiICons.RiArrowDownSFill/>,
        iconOpen:<RiICons.RiArrowUpSFill/>,
        subNav: [
            {
                title:'Categories',
                path:'miscellaenoous/categories#',
                id:'61',
                icon:<FaICons.FaEnvelopeOpenText/>
            },

            {
                title:'Others',
                path:'miscellaenoous/others',
                id:'62',
                icon:<FaICons.FaEnvelopeOpenText/>
            },
          
        ]
        
    },
    
];