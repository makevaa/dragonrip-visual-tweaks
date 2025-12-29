// ==UserScript==
// @name         Dragonrip Visual Tweaks
// @namespace    http://tampermonkey.net/
// @version      1.0.22
// @description  Visual CSS tweaks for Dragonrip.com
// @author       paxu
// @match         *://*.dragonrip.com/*
// @icon         https://i.imgur.com/Vn0ku7D.png
// @grant        none
// @license      GPLv3 
// ==/UserScript==


(() => {
    'use strict';

    const settings = {
        sessionId: '567fbb9ef99a13ffa5889f95fbb4c362', // PHPSESSID cookie value, needed for some fetch requests
        removeGameLogo: true, // Remove the large Dragonrip.com logo
        clearGameLogoHtml: true, // Remove all elements from game logo area, eg. <br> tags
        usernameToShow: 'paxu', // Username to show in infobox
        removeGameFooter: true, // Remove the vanilla footer from the end of page

        fancyBars: true, // Hp, stam, xp bar styling
        animateXpBar: false,

        customBarText: true, // Change HP, stam and xp bar labels to shorter ones
        barLabels: { health: 'HP', stamina: 'ST', experience: 'XP' },

        serverTime: {
            label: "Server time:",
            keepRunning: true,  // Keep updating clock time (updates every second)
            seconds: false, // Include seconds in the time
            hours24: true,  // Toggle between 12h/24h time format
            fancyBox: false, // Additional styling for the time box element
        },

        // Create big extra box on the right side of game area
        createExtraBox: true,
        extraBoxContents: {
            "Clan": {
                "Members":     {icon:'/game/images/bossimages/zolton.png', url:'/game/clan.php?go=5'},
                "Log":         {icon:'/game/images/itema/scroll2.png', url:'/game/clanlog.php'},
                "Vault":       {icon:'/game/images/blacksm/bank.png', url:'/game/cvault.php'},
                "Resources":   {icon:'/game/images/blacksm/bar.png', url:'/game/clan.php?go=9'},
                "Buildings":   {icon:'/game/images/clanbuu/dark/3.png', url:'/game/clanbuu.php'},
                "Clan Bosses": {icon:'/game/images/bossimages/earth.png', url:'/game/clan.php?go=10'},
                "Clan Games":  {icon:'/game/images/tool/axe/5.png', url:'/game/clang.php'},
                "Clan Temple": {icon:'/game/images/ruins/relsh.png', url:'/game/clant.php'},
                "Clan Wars":   {icon:'/game/images/itema/sossoso.png', url:'/game/clanw.php'},
            },
            "Market": {
                "Resources": {icon:'/game/images/icons/res.png', url:'/game/market.php?go=2'},
                "Combat gear": {icon:'/game/images/icons/armor.png', url:'/game/market.php?go=1'},
                "My listings": {icon:'/game/images/icons/market.png', url:'/game/mymark.php'},
                "My requests": {icon:'/game/images/icons/market.png', url:'/game/myrequ.php'},
            },
            "Misc": {
                "Players": {icon:'/game/images/icons/res.png', url:'https://chazu.arkku.net/dragonrip/player-index/'},
            }

        },

        chatStyling: true, // Add custom styling to chat

        // Create custom context menu for inventory items
        invContextMenu: {
            enable: true,
            isOpen: false,
        },

        eventAlerts: true,
        keepCheckingEventAlerts: true,
    }
    

    const mainCss = `
        *, :after, :before {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }



        body, html {
            background:#262626 url('https://i.imgur.com/gnerbEH.jpeg')!important;
            background-image: url('https://i.imgur.com/gnerbEH.jpeg')!important;
            background-size:auto!important;
            background-repeat:repeat!important;
        }

                
        /* HP, Stamina, XP bars */
        .healthbar {
            border-radius:0px!important;
            border:none!important;
            padding:0px!important;
            --shadow-color: rgba(255, 255, 255, 0.5);
            xbox-shadow: 0px 0px 2px var(--shadow-color)!important;
            xfilter: drop-shadow(0px 0px 1px var(--shadow-color));
            xbackground-color: black;
            display:flex;
            align-items:center!important;
            justify-content:start;
            xbox-shadow: inset 0px 0px 5px rgba(255, 255, 255, 0.2);
        }
        /* Filled interior of bar */
        .healthbar2 {
            border-radius:0px!important;
            border:none!important;
            padding:0px!important;
            height:100%!important;
        }
        /* Bar text label */
       .player > .bar > .healthbar > .healthbar2 > .tekstasHealthbar {

            color:black!important;
            border:none!important;
            padding:0px!important;
            display:flex;
            align-items:center;
            justify-content:start;
            position:absolute;
            height:100%;
        }

       
        td > a:hover,
        td > a:hover div,
        .leftsidemdfk > a:hover div {
            outline: 1px solid grey!important;
        }

        /* inv. equipemnt etc tabs on right side of screen */
        #pirki > tbody > tr > td {
            xcursor:pointer;
        }
        #pirki > tbody > tr > td:hover {
            xbackground-color: #0099ff!important;
        }

        /* Change empty vial graphic to more visible icon */
        div[style="background-image:url(/game/images/itemaa/weavialwat.png);"] {
            background-image:url(https://i.imgur.com/mgV2Iyb.png)!important;
            background-repeat:no-repeat;
            background-position:center;
            background-size:contain;
        }

        /* Custom main bar percent value, value and symbol */
        .player > .bar > .healthbar > .healthbar2 > .tekstasHealthbar > .bar-percent {
            xcolor: grey!important;
            display:inline-flex;
            align-items:center;
            justify-content:start;
            margin-left:5px;
            xborder-radius:100%;
            xoutline:2px solid grey;
            height:100%;
            xaspect-ratio:1/1;
            xbackground-color:rgba(0, 0, 0, 0.5);
        }
        /* Custom main bar percent symbol only*/
        .player > .bar > .healthbar > .healthbar2 > .tekstasHealthbar > .bar-percent > .symbol {
            display:inline-block;
            margin-left:2px;
        }

        div.player {
            height: 68px;
            display: flex;
            justify-content: start;
            align-items: start;
            padding: 5px 5px 5px 0px;!important;
        }

        div.player > div.picture {
            display:flex;
            justify-content: center;
            align-items: center;
            margin:0px!important;
            margin-left: 0px!important;
            padding-left: 0px!important;
            width: 15%!important;
            min-width: 60px;
            aspect-ratio: 1/1;
            height: 100%!important;
        }

        div.player > div.picture > a {
            display: flex;
            justify-content: center;
            align-items: center;
            aspect-ratio: 1/1;
            xwidth: 100%;
            height: 100%;

        }
       
        div.player > div.picture > a > div.kovsd {
            display:flex;
            flex-direction:column;
            justify-content: end;
            background-size: cover!important;
            background-repeat: no-repeat;
            outline: 4px double rgba(255, 255, 255, 0.35)!important;
            xborder-radius:100% 100% 0% 0%!important;
            xborder-radius:0% 0% 100% 100%!important;
            border-radius: 100%;
            aspect-ratio: 1/1;
            width: 90%!important;
            height: 90%!important;
            max-height: 90%!important;
            min-height: 90%!important;
            overflow:hidden!important;
            box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.8), 0px 0px 5px 5px rgba(0, 0, 0, 0.5), 5px 5px 5px 0px rgba(0, 0, 0, 0.5);
        }

        div.player > div.picture > a > div.kovsd:hover {
            filter: brightness(1.1);
   
        }

        div.player > div.picture > a > div.kovsd:active {
            filter: brightness(0.9);
        }

        div.player > div.picture > a > div.kovsd > span.amoutina {
            display:flex;
            align-items:center;
            justify-content: center;

            width:100%!important;
            height:30%;
            margin-top: 0px!important;
            xborder-top: 4px double grey;

            font-family: consolas,monospace;
            xborder-radius: 0px 4px!important;
            font-size: 0.8em;
           
            color:rgb(111, 111, 255)!important;
            color: #f5e9d8!important;
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5), 0px 0px 3px rgba(0, 0, 0, 0.5), 2px 2px 0px rgba(55, 5, 5, 0.99), 0px 0px 8px orange, 0px 0px 3px rgb(255, 255, 255);
            background-color: rgba(0, 0, 0, 0.8);
        }

 

        /* The sword icon next to player level */
        div.player > div.picture > a > div.kovsd > span.amoutina > b > img {
            filter: drop-shadow(0px 0px 3px white);
            display: none;
        }

        div.player > div.bar {
            padding-top:0px!important;
            xpadding:0px!important;
        }

        div.logo {
            height:68px;
            display:flex;
            align-items:center;
            justify-content:center;
        }

        div.logo > br {
            height:0px!important;
        }

        div.logo > img {
            height:80%;
        }
    `;

    const removeGameLogoCss = `
        body > div.logo > img {
            display:none;
        }	
    `;
    
    const removeGameFooterCss = `
        body > .footer {
            display:none;
        }	
    `;


    const fancyBarsCss = `
        
        /* Bar container */
        .player > .bar {
            xborder:1px solid lime;
            xoutline: 2px solid lime !important;
            width:85%;
        }


        /* Bars */
        .player > .bar > .healthbar {
            --border-color: rgba(40, 41, 44, 1);
            background-color: #1a1a1a;
            background-color:rgba(0,0,0,0.2);
            padding:0px!important;
            background-color:black;
            position:relative;
            border:2px solid grey;

            outline: 5px ridge var(--border-color)!important;

            box-shadow: inset 0px 0px 5px 5px rgba(255, 0, 0, 0.9)
            xborder:none!important;
            width:100%!important;
            
        }

        .player > .bar > .healthbar:nth-child(1), 
        .player > .bar > .healthbar:nth-child(3)  {
            width:100%;
        }

        .player > .bar > .healthbar:after{
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            width: calc(100% - 0px);
            height: 50%;
            background: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.1));
        }

        /* Filled, colored bar */
        .player > .bar > .healthbar > .healthbar2 {
            position:absolute;
            xwidth:100%!important;
            background-position: 0% 0%;
            background-repeat: repeat;
            
        }

        /* Health bar, colored inner bar */
        .player > .bar > .healthbar:nth-child(1) > .healthbar2 {
            border-right:2px solid rgba(173, 55, 55, 0.9)!important;
        }
            
        /* Stamina bar, colored inner bar */
        .player > .bar > .healthbar:nth-child(3) > .healthbar2 {
            border-right:2px solid rgba(78, 113, 255, 0.9)!important;
        }

        /* XP bar, colored inner bar */
        .player > .bar > .healthbar:nth-child(5) > .healthbar2 {
            xanimation: xpBarSlide 80s linear infinite;
            background-image: url('https://i.imgur.com/VeK3PfN.jpeg');
            border-right:2px solid rgba(152, 78, 255, 0.9)!important;
            position:absolute;
        }

        /* Bar text */
        .player > .bar > .healthbar > .healthbar2 > .tekstasHealthbar {
            position:absolute;
            color: #ffffff!important;
          
            padding-top:1px!important;
            font-family:consolas,monospace;
            font-size:1.1em;
            text-shadow: 
                -1px 0px 0px black,
                1px 0px 0px black,
                0px -1px 0px black,
                0px 1px 0px black
            ;
            z-index:1;
            xborder:1px solid lime!important;
            width: 100% !important;
            min-width: 500px !important;
        } 

        .player > .bar > .healthbar > .healthbar2:after{
            content: '';
            position: absolute;
            width:100%;
            height:100%;
            background-color: rgb(0, 55, 103);
            opacity:0.9;
            filter:saturate(5);

                  
        }

        .player > .bar > .healthbar:nth-child(1) > .healthbar2:after{
            background-color: rgba(21, 0, 0, 1);
        }

        .player > .bar > .healthbar:nth-child(3) > .healthbar2:after{
            background-color: rgb(0, 21, 42);
        }

        .player > .bar > .healthbar:nth-child(5) > .healthbar2:after{
            background-color: rgb(18, 0, 46);
        }

    `;

    const animatedXpBarCss = `
        .player > .bar > .healthbar:nth-child(5) > .healthbar2 {
            animation: xpBarSlide 80s linear infinite;

            @keyframes xpBarSlide { 
            0% {
                background-position: 0% 0%;
            }
            100% {
                background-position: 0% -300px; /*  */
                xbackground-position: -500px 0%; 
            }
        }
    `;

    const infoAreaCss = `
        body > div.logo {
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            padding: 2px 5px 2px 10px;
        }

        body > div.logo > .info {
            xborder: 1px solid lime;
            border-right: 4px double rgba(68, 68, 68, 1);
            width: 50%;
            text-align: left;
            xpadding: 5px;
            font-size: 0.8em;
            font-family: consolas,monospace;
            color: grey;
        }	

        
        body > div.logo > .info > .item {
            xborder: 1px solid red;
            display: flex;
            align-items: center;
            justify-content: start;
        }

        body > div.logo > .info > .item > .left {
            xdisplay: flex;
            width: 50%;
            text-align: right;
            margin-right: 5px;
        }

        body > div.logo > .info > .item.server-name > .name {
            xcolor: #de6c09;
            xcolor: #7a3c05;
            xcolor: #6633ff;
        }

        body > div.logo > .info > .item.game-title > .title {
            xcolor: #de6c09;
            xcolor: #7a3c05;
            xcolor: #6633ff;
        }

        body > div.logo > .info > .item.user > .name {
            color: #6633ff;
            color: rgb(111, 111, 255);
            color: #167676;
        } 

        body > div.logo > .info > .item.address {
            xborder: 1px solid grey;
            text-wrap: no-wrap;
            width: 100%;
            height: 20px;
            xwhite-space: nowrap;
            overflow: hidden;
        }

        body > div.logo > .events {
            xborder: 1px solid cyan;
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            font-size: 0.8em;
            font-family: consolas, monospace;
            padding: 5px;
        }

        body > div.logo > .events > .no-events {
            color: grey;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        body > div.logo > .events > .no-events:hover {
            background-color: rgba(0, 255, 255, 0.2);
        }

        body > div.logo > .events > .no-events:active {
            background-color: rgba(0, 255, 255, 0.1);
        }

        body > div.logo > .events > .no-events.hidden {
            display: none;
        }

        body > div.logo > .events > .item {
            xborder: 1px solid grey;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: start;
            width: 100%;
            height: 30%;
            xpadding: 0px 5px 0px 5px;
        }

        body > div.logo > .events > .item.hidden {
            display: none;
    }

        body > div.logo > .events > .item > .image {
            height: 100%;
            aspect-ratio: 1/1;
            margin-right: 5px;
        }

        body > div.logo > .events > .item > .label {
            text-align: left;
            color: grey;
        }

        body > div.logo > .events > .item > .label > a:hover {
            background-color: rgba(255, 0, 0, 0.2);
        }

        body > div.logo > .events > .item > .image  {
            border-radius: 2px;
            border: 1px solid #2e2e2eff;
        }

        body > div.logo > .events > .item > .label > a.red {
            color: #ff4444;
        }

        body > div.logo > .events > .item > .label > a.cyan {
            color: #00cae9;
        }


    `;

    const serverTimeMainCss = `
        .dragonrip-server-time-cont > * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            user-select: none;
        }

        .dragonrip-server-time-cont {
            display: flex;
            flex-direction: row;
            background-repeat: repeat;
            background-size: contain;
            xfont-family: consolas,monospace;
            xcolor: grey;
        }

        .dragonrip-server-time-cont > .label {
            xmargin-right:10px;
        }

        .dragonrip-server-time-cont > .time {
            color: #de6c09;
            xcolor: #6633ff;
            xcolor: #7a3c05;
        }

        body > .logo {
            position:relative;
        }
    `;

    const serverTimeFancyBoxCss = `    
        .dragonrip-server-time-cont {
            border:2px solid rgba(255,255,255,0.15);
            box-shadow:0px 0px 5px 5px rgba(0, 0, 0, 0.8);
            background-image: url('https://i.imgur.com/vjJ8ugC.jpeg');
            background-size:cover;
        }
    `;

    const extraBoxCss = `    
        .extra-box {
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 2px;
            box-shadow:5px 5px 5px 0px rgba(0, 0, 0, 0.8);
            background: url('/img/mc/center.jpg');
            background-position: center center;
            background-repeat: repeat;

            xbackground-image: url('https://i.imgur.com/vjJ8ugC.jpeg');
            xbackground-position: center;
            xbackground-repeat: no-repeat;
            xbackground-size: cover;

            min-height:100vh;
            xoverflow-y: scroll;
            scrollbar-width: thin;
            position:absolute;
            top:0;
            right:0;
            margin: 5px 20px 0px 20px;
            padding: 10px 5px 10px 5px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;

            /* border simple https://i.imgur.com/c7Oeu0F.png'  */
            /* border ornamental https://i.imgur.com/j7xNFLn.png  */
            border-image-source: url('https://i.imgur.com/c7Oeu0F.png');
            border-image-slice: 150;
            border-image-width: 40px;
            border-image-outset: 0;
            border-image-repeat: repeat;
            box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.6), inset 0px 0px 10px 10px rgba(0, 0, 0, 0.8);
            xbox-shadow: inset 0px 0px 10px 10px rgba(0, 0, 0, 0.8);
        }

        .extra-box > .box {
            xborder: 1px solid grey;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            xmargin-bottom: 0px;
            xpadding: 5px 5px 5px 5px;

            xbackground-color: rgba(21, 21, 21, 1);
            xbackground-image: url('https://i.imgur.com/vjJ8ugC.jpeg');
            background-size:contain;
        }

        .extra-box > .box > .top {
            xborder: 1px solid lime;
            color: grey;
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 25px;
            margin-bottom: 5px;
            padding-left: 10%;
            xborder-bottom: 4px double rgba(68, 68, 68, 1);

           
            xtext-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5), 0px 0px 3px rgba(0, 0, 0, 0.5), 2px 2px 0px rgba(55, 5, 5, 0.99), 0px 0px 8px orange, 0px 0px 3px rgb(255, 255, 255);

            xbackground: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 90%);
        }

        .extra-box > .box > .top > .title {
            xborder: 1px solid grey;
            font-size: 1.1em;
            font-family: Georgia, serif;
            color: #f5e9d8;
        }

        .extra-box > .box > .top > .button {
            xborder: 1px solid grey;
            aspect-ratio: 1/1;
            height: 100%;
            margin-right: 10%;
            pointer-events: auto;
            user-select: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url('https://i.imgur.com/wQPBolf.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            text-align: center;
            font-size: 1em;
            font-family: Georgia, serif;
            text-transform: uppercase;
            color: #ffffff;
            text-shadow: 0px 0px 10px orange, 0px 0px 5px rgb(160, 160, 160);
            filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.9));
        }

        .extra-box > .box > .top > .button:hover {
               filter: brightness(0.9);
   
        }

        .extra-box > .box > .top > .button:active {
               background-image: url('  https://i.imgur.com/Rq1EfYg.png');
   
        }

       

        .extra-box > .box > .separator-line {
            xborder: 1px solid lime;
            width: 100%;
            height: 4px;
            background-color: rgba(44, 44, 44, 1);
            margin-top: 10px;
            margin-bottom: 5px;
            box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.7);
            border-top: 1px solid rgba(88, 88, 88, 1);
            border-bottom: 1px solid rgba(21, 21, 21, 1);
        }

        .extra-box > .box > .list {
            border: 1ps solid lime;
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            overflow: hidden;
        }

        .extra-box > .box > .list.hidden {
            height: 0px;
        }

        .extra-box > .box > .list > .item {
            xborder: 1px solid rgba(255, 255, 255, 0.25);
            border: 4px double rgba(41, 41, 41, 1);
            border-left: none;
            display: flex;
            align-items: center;
            justify-content: start;
            width: 100%;
            height: 35px;
            background-color: rgba(0, 0, 0, 0.5);
            xmargin-bottom: 5px;
            xmargin-top: -5px;
            box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.8), 0px 0px 5px 5px rgba(0, 0, 0, 0.5);

            border-radius: 30px 10px 10px 30px;
            xborder-radius: 50px;

            xbackground: #000000;
            xbackground: linear-gradient(90deg,rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%);

 
        }

        .extra-box > .box > .list > .item > * {
            pointer-events: none;
        }

        .extra-box > .box > .list > .item:hover {
            filter: brightness(1.4);
        } 

        .extra-box > .box > .item:active {
            filter: brightness(1.0);
        } 

        
        .extra-box > .box > .list > .item > .image-cont {
            xborder: 1px solid grey;
            height: 120%;
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            justify-content: center;
   
            margin: 0px 5px 0px 0px;
            background-color: rgba(21, 21, 21, 1);

            border: 4px double rgba(255, 255, 255, 0.35);
            border: 4px double rgba(41, 41, 41, 1);
            xbox-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.8);
      
            border-radius: 100%;
            overflow: hidden;

        }

        .extra-box > .box > .list > .item > .image-cont > .image {
            xborder: 2px double grey;
            xborder: 1px solid lime;
            width: 100%;
            aspect-ratio: 1/1;
            xheight: 100%;
            box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.8);
      
            xfilter: sepia(1) hue-rotate(105deg);
            filter: saturate(0.75);

        }

        .extra-box > .box > .list > .item > .label {
            xborder: 1px solid lime;
            text-align: left;

            font-family: consolas, monospace;

            font-size: 0.9em;
            font-family: Georgia, serif;
            color: rgba(152, 152, 152, 1);
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5), 0px 0px 3px rgba(0, 0, 0, 0.5);
            xcolor: #f5e9d8;
            
            xtext-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5), 0px 0px 3px rgba(0, 0, 0, 0.5), 2px 2px 0px rgba(55, 5, 5, 0.99), 0px 0px 8px orange, 0px 0px 3px rgb(255, 255, 255);
        }
    `;


    const chatCss = `    

        /* Chat tab buttons */
        .chatting > .chatenemy > input[type="button"] {
           -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            xborder: 1px solid lime !important;
            cursor: pointer;
            font-family:  consolas, monospace !important;
            xcolor: white !important;
            xfont-size: 1.1em !important;
            xfont-weight: 800;
     
            width: 10% !important;
            border-radius: 2px !important;
            margin-right: 5px !important;
            background-color: rgba(0, 0, 0, 0.4) !important;
            outline: 1px solid grey !important;
            
            text-shadow:
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black
            ;

            box-shadow: 
                inset 0px 0px 3px 1px rgba(0, 0, 0, 0.0), 
                3px 3px 3px 0px rgba(0, 0, 0, 0.5)
            ;
        }

        .chatting > .chatenemy > input[type="button"]:hover {
            background-color: rgba(20, 20, 20, 1) !important;
            outline: 1px solid grey !important;
        } 

        /* Selected chat tab */
        .chatting > .chatenemy > input[type="button"].active {
            outline: 1px solid #fea528ff !important;
            color: lime !important;
            background-color: rgba(0, 0, 0, 0.5) !important;

            color: #ffd748 !important;
            text-shadow: 
                0 0 1vw #FA1C16, 
                0 0 3vw #FA1C16, 
                0 0 10vw #FA1C16, 
                0 0 10vw #FA1C16, 
                0 0 .4vw #FED128
            ;

            box-shadow: 
                0px 0px 3px 0px rgba(255, 183, 0, 0.5)
            ;

            
        }
    `;

    const invContextMenuCss = `
        /* The area where inventory items are shown */
        .burbul > .leftsidemdfk {
            xpointer-events: none;
        }

        /* the link element is the small item amount number element */
        .burbul > .leftsidemdfk > a {
            xpointer-events: none;
        }

        .burbul > .leftsidemdfk > a > div > span.amouti {
            pointer-events: none;
        }

        .inv-context-menu {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box; 
            position: absolute;
            z-index: 1000;
            background-color: rgba(21, 21, 21, 0.95);
            border: 1px solid grey;
            box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.8);
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            sfont-family: consolas, monospace;
            user-select: none;
            padding: 5px 0px 5px 0px;
        }

        .inv-context-menu * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .inv-context-menu > .top {
            width: 100%;
            height: 30px;
            xborder-bottom: 2px solid grey;  
            display: flex;
            align-items: center;
            justify-content: start;
            padding: 5px;

        }

        .inv-context-menu > .top > .item-image {
            width: 24px;
            height: 24px;
            margin-right: 3px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .inv-context-menu > .top > .item-name {
            xborder: 1px solid grey;
            display: flex;
            align-items: center;
            xtext-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5), 0px 0px 3px rgba(0, 0, 0, 0.5), 2px 2px 0px rgba(55, 5, 5, 0.99), 0px 0px 8px orange, 0px 0px 3px rgb(255, 255, 255);
            font-size: 0.9em;
            color: #e6e6e6ff;
            font-family: Georgia, serif;
        }

        .inv-context-menu > .top > .amount-owned {
            xborder: 1px solid grey;
            xmin-width: 30px;
            display: flex;
            align-items: center;
            justify-content: start;
            margin: 0px 0px 0px 10px;
            xtext-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5), 0px 0px 3px rgba(0, 0, 0, 0.5), 2px 2px 0px rgba(55, 5, 5, 0.99), 0px 0px 8px orange, 0px 0px 3px rgb(255, 255, 255);
            font-size: 0.8em;
            color: #b0b0b0ff;
            xfont-family: Georgia, serif;
        }

        .inv-context-menu > .menu-items {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            font-family: consolas, monospace;
        }

        .inv-context-menu > .menu-items > .menu-item {
            width: 100%;
            padding: 0px 5px 5px 5px;
            xborder-bottom: 1px solid grey;
            font-size: 0.8em;
            color: white;
            xcursor: pointer;
            display: flex;
            align-items: center;
            justify-content: start;
        }

        .inv-context-menu > .menu-items > .menu-item > .amount-input {
            width: 60px !important;
            height: 30px;
            padding: 5px;
            margin-left: 5px;
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 0px;
            border: 1px solid grey;
        }

        .inv-context-menu > .menu-items > .menu-item > .button {
            width: 100px !important;
            padding: 5px;
            margin-right: 5px;
            background-color: rgba(0, 0, 0, 0.8);
            border: 1px solid grey;
            cursor: pointer;
        }



        .inv-context-menu > .menu-items > .menu-item > .button:hover {
            background-color: rgba(100, 100, 100, 0.2);
        }

        .inv-context-menu > .menu-items > .menu-item > .button:active {
            background-color: rgba(150, 150, 150, 0.4);
        }

        .custom-float-text {
            position: absolute;
            z-index: 1001;
            background-color: rgba(0, 0, 0, 0.8);   
            color: white;
            padding: 3px 5px 3px 5px;
            border-radius: 3px;
            xbox-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.8);
            xfont-family: consolas, monospace;
            font-family: Georgia, serif;
            font-size: 1em;
            user-select: none;
            
            transition: opacity 2s, transform 2s;
            transition-timing-function: linear;
          
            
        }
    
           
    `;



    const log = str => {
        console.log(`[Dragonrip Visual Tweaks]: ${str}`);
    }

    const getTime = () => {
        let options = {
            timeZone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }

        if (settings.serverTime.seconds) { options.second = 'numeric'; }
        if (settings.serverTime.hours24) { options.hour12 = false; }
        
        const currentLocalDate  = new Date (Date.now());
        let time = new Intl.DateTimeFormat([], options).format(currentLocalDate);
        time = `${time}`;
        return time;
    }

    
    const createClock = () => {
        const elem = document.createElement('div');
        elem.classList.add('item');
        elem.classList.add('dragonrip-server-time-cont');
   
        // Create text label
        const label = document.createElement('div');
        label.classList.add('left');
        label.classList.add('label');
        label.innerHTML = settings.serverTime.label;

        // Create time
        const time = document.createElement('div');
        time.classList.add('time');
     
        elem.append(label);
        elem.append(time);

        return elem;
    }

    const updateClock = () => {
        const elem = document.querySelector('body > .logo > .info > .dragonrip-server-time-cont > .time');
        elem.innerText = getTime();
    }

    
    const createGameTitle = () => {
        const elem = document.createElement('div');
        elem.classList.add('item');
        elem.classList.add('game-title');

        const gameTitle = document.createElement('div');
        //gameTitle.classList.add('left');
        gameTitle.classList.add('title');
        gameTitle.innerText = 'DragonRip MMORPG';
      
        elem.append(gameTitle);
        return elem;
    }

    const createServerName = () => {
        const elem = document.createElement('div');
        elem.classList.add('item');
        elem.classList.add('server-name');

        //const label = document.createElement('div');
        //label.classList.add('label');
        //label.classList.add('left');
        //label.innerText = 'Server:';

        const name = document.createElement('div');
        name.classList.add('name');
        name.innerHTML = `Main server`;

        //elem.append(label);
        elem.append(name);
        return elem;
    }

    const createUsernameLabel = () => {
        const elem = document.createElement('div');
        elem.classList.add('item');
        elem.classList.add('user');

        const label = document.createElement('div');
        label.classList.add('label');
        label.classList.add('left');
        label.innerText = 'User:';

        const user = document.createElement('div');
        user.classList.add('name');
        //user.innerText = settings.usernameToShow;
        user.innerText = `${settings.usernameToShow}`;


        elem.append(label);
        elem.append(user);
        return elem;
    }



    const clearGameLogoHtml = () => {
        const targetElem = document.querySelector('body > div.logo');
        targetElem.innerHTML = '';
    }

    
    const insertLogoAreaInfo = () => {
        const targetElem = document.querySelector('body > div.logo');

        const infoArea = document.createElement('div');
        infoArea.classList.add('info');

        const addressElem = document.createElement('span');
        addressElem.classList.add('item');
        addressElem.classList.add('address');
        let address = document.location.href;
        address = address.replace('https://dragonrip.com', '');
        addressElem.innerText = address;

   
        infoArea.append( createGameTitle() );
        infoArea.append( createServerName() );
        infoArea.append( createClock() );
 
        if (settings.serverTime.keepRunning) {
            setInterval( () => {
                updateClock();
            }, 1000);
        }

        infoArea.append(createUsernameLabel());
        //infoArea.append(addressElem);
        targetElem.append(infoArea);

        const eventsArea = document.createElement('div');
        eventsArea.classList.add('events');
        targetElem.append(eventsArea);


        if (settings.eventAlerts) {
            insertEventAlerts();
            checkEventAlerts();
        } 
       
        if (settings.keepCheckingEventAlerts) {
            setInterval( () => {
                checkEventAlerts();
            }, 10000);
        }
    }

    const insertEventAlerts = () => {
        const data = {
            hellSoon: { 
                label: 'Hell opening soon', 
                imageUrl: '/game/images/hellgate/gate.png' },
            valhallaSoon: { 
                label: 'Valhalla soon', 
                imageUrl: '/game/images/valhal/valport.png' },
            hell: { 
                label: '<a href="/game/hellgate.php" class="red">[Hell]</a> open', 
                imageUrl: '' },
            valhalla: { 
                label: '<a href="/game/valhal.php" class="cyan">[Valhalla]</a> open', 
                imageUrl: '/game/images/valhal/nidh.png' },
            ace: { 
                label: '<a href="/game/ace.php" class="red">[Ace]</a> appeared', 
                imageUrl: '' },
            blaze: { 
                label: '<a href="/game/blaze.php" class="red">[Blaze]</a> appeared', 
                imageUrl: '/game/images/bossimages/blaze.png' },
            winter: { 
                label: '<a href="/game/snowman.php" class="red">[Snowman]</a> appeared', 
                imageUrl: '/game/images/bossimages/snowman.png' },
            spring: { 
                label: '<a href="/game/spriggan.php" class="red">[Spriggan]</a> appeared', 
                imageUrl: '/game/images/bossimages/snowman.png' },
            summer: { 
                label: '<a href="/game/quartzTitan.php" class="red">[Quartz Titan]</a> appeared', 
                imageUrl: '/game/images/bossimages/snowman.png' 
            },
            halloween: { 
                label: '<a href="/game/pumpkinKing.php" class="red">[Pumpking]</a> appeared', 
                imageUrl: '/game/images/bossimages/snowman.png' },
        }

        const targetElem = document.querySelector('body > div.logo > .events');

        const events = Object.getOwnPropertyNames(data);
        
        for (const eventName of events) {
            const eventData = data[eventName];
            const eventElem = createEventAlertItem(eventName, eventData.label, eventData.imageUrl);
            targetElem.append(eventElem);
        }

        const noEventsElem = document.createElement('div');
        noEventsElem.classList.add('hidden');
        noEventsElem.classList.add('no-events');
        noEventsElem.innerText = 'No active events';

        noEventsElem.addEventListener('click', () => {
            //log('Clicked "No active events" label.');
            checkEventAlerts();
        });

        targetElem.append(noEventsElem);
    }

    const createEventAlertItem = (className, labelText, imageUrl) => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('item');
        itemElem.classList.add('hidden');
        itemElem.classList.add(className);

        const imageElem = document.createElement('img');
        imageElem.classList.add('image');
        imageElem.src = imageUrl;

        const labelElem = document.createElement('div');
        labelElem.classList.add('label');
        labelElem.innerHTML = labelText;

        itemElem.append(imageElem);
        itemElem.append(labelElem);
        return itemElem;
    }

    // Read messages from chat to check for event alerts
    const checkEventAlerts = () => {
        //log('Checking event alerts...');

        // Event messages to look for in chat
        const data = {
            hellSoon: "Gates of Hell will open in 10 minutes.",
            hell: "Gates of Hell are open! ",
            valhallaSoon: "Portal to Valhalla will open in 10 minutes.",
            valhalla: "Event: Portal to Valhalla is open!",
            valhalla: "Event: Great Battle of Ragnarok in Valhalla!",
            ace: "Event: Ace appeared in the Arctic Ruins!",
            blaze: "Event: Blaze appeared in the Ashlands!",
            winter: "Snowman appeared in the Ice Plains.",
            spring: "",
            summer: "",
            halloween: ""
        }

        // Read all messages from chat
        // If event is active, remove hidden class from alert event elem
        const chatMessages = document.querySelectorAll('.chatting > .chatinto > .mesage');

        let activeEvents = 0;

        // Check each chat message for event keywords
        for (const msgElem of chatMessages) {
            const msgParts = msgElem.querySelectorAll('span');

            for (const partElem of msgParts) {
                const msgContent = partElem.innerText;

                for (const eventName of Object.getOwnPropertyNames(data)) {
                    if (data[eventName] === "") {
                        continue;
                    }
                    if (msgContent.includes(data[eventName])) {
                        const eventElem = document.querySelector(`body > div.logo > .events > .item.${eventName}`);
                        eventElem.classList.remove('hidden');
                        activeEvents++;
                    }
                }
            }
        }

        // Show/hide "no events" message
        const noEventsElem = document.querySelector('body > div.logo > .events > .no-events');
        if (activeEvents === 0) {
            noEventsElem.classList.remove('hidden');
        } else {
            noEventsElem.classList.add('hidden');
        }
    }

    // Get current and max values from eg. "250/1500" string
    const getBarValues = str => {
        str = str.trim();
        const values = str.split('/');

        let percent = (values[0]/values[1] * 100).toFixed(0);
        if (parseInt(percent) < 10) {
            percent = `&nbsp;&nbsp;${percent}`;
        } else if (parseInt(percent) < 100) {
            percent = `&nbsp;${percent}`;
        }

        const data = {
            current: numberWithCommas(values[0]),
            max: numberWithCommas(values[1]),
            percent: percent
        }
        return data;
    }

    const getCustomBarText = (elem, originalLabel) => {
        const barData = getBarValues(elem.innerText.replace(originalLabel.toUpperCase(), ''))
        const str = `<span class='bar-percent'>${barData.percent}<span class='symbol'>%</span></span> &nbsp; ${settings.barLabels[originalLabel]} &nbsp; ${barData.current} / ${barData.max}`;
        return str;
    }

    // Change labels of hp, stam and xp bar
    const changeMainBarTexts = () => {
        const labels = {
            health: 'HP', stamina: 'ST', experience: 'XP'
        }

        const textElemHp = document.querySelector('.player > .bar > .healthbar:nth-child(1)  > .healthbar2 > .tekstasHealthbar');

        if (textElemHp.innerText.includes('HEALTH')) {
            textElemHp.innerHTML = getCustomBarText(textElemHp, 'health')
            
        }
   

        const textElemStam = document.querySelector('.player > .bar > .healthbar:nth-child(3)  > .healthbar2 > .tekstasHealthbar');
        if (textElemStam.innerText.includes('STAMINA')) {
            textElemStam.innerHTML = getCustomBarText(textElemStam, 'stamina')
        }

        const textElemXp = document.querySelector('.player > .bar > .healthbar:nth-child(5)  > .healthbar2 > .tekstasHealthbar');
        if (textElemXp.innerText.includes('EXPERIENCE')) {
            textElemXp.innerHTML = getCustomBarText(textElemXp, 'experience')
        }

    }

    // Number with commas function by Elias Zamaria
    // Source: https://stackoverflow.com/a/2901298
    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const createExtraBox = () => {
        const elem = document.createElement('div');
        elem.classList.add('extra-box');


        // Calculate box width ciewport width from footer and viewport width

        const footer = document.querySelector('body > .chatting');
        const footerW = footer.clientWidth;
  
        const viewportW = document.documentElement.clientWidth
    
        let boxW = 1-(Number(footerW)/Number(viewportW));
        boxW = Math.floor((boxW*100))
        boxW = `${boxW-3}%`
       
        
        elem.style.width = boxW;


        // Create extra box contents

        const boxNames = Object.getOwnPropertyNames(settings.extraBoxContents);

        for (const boxName of boxNames) {

            //const title = boxName;

            const boxElem = document.createElement('div');
            boxElem.classList.add('box');

            // Box top area with bos title and hide button
            const top = document.createElement('div');
            top.classList.add('top');

            const title = document.createElement('div');
            title.classList.add('title');
            title.innerText = boxName;
            top.append(title);

            // Create button to hide/view link list
            const hideButton = document.createElement('div');
            hideButton.classList.add('button');
            hideButton.classList.add('hide');
            hideButton.setAttribute('data-target', boxName);
            hideButton.innerText = '△';

            hideButton.addEventListener("click", (e) => {
                const listName = hideButton.getAttribute('data-target');
                const listElem = boxElem.querySelector(`.list.${listName}`);
                listElem.classList.toggle('hidden');

            });

            top.append(hideButton);

            boxElem.append(top);

            const linkItems = Object.getOwnPropertyNames(settings.extraBoxContents[boxName]);

            const list = document.createElement('div');
            list.classList.add('list');
            list.classList.add(boxName);

            if (linkItems.length === 0) {
                continue;
            }

            for (const linkName of linkItems) {

                const linkElem = document.createElement('a');
                linkElem.classList.add('item');
                linkElem.setAttribute('href', settings.extraBoxContents[boxName][linkName].url);

                const imageCont =  document.createElement('div');
                imageCont.classList.add('image-cont');

                const image = document.createElement('img');
                image.classList.add('image');

                image.src = settings.extraBoxContents[boxName][linkName].icon;
                imageCont.append(image);
                linkElem.append(imageCont);

                const label =  document.createElement('div');
                label.classList.add('label');
                label.innerText = linkName;
                linkElem.append(label);

                list.append(linkElem);
            }

            boxElem.append(list);

            // Insert a separator line between link boxes
            const separator = document.createElement('div');
            separator.classList.add('separator-line');
            boxElem.append(separator);

            elem.append(boxElem);
        }



        const target = document.querySelector('body');
        target.append(elem);
    }

    const setChatStyles = () => {
        setCustomCss(chatCss);
        // Remove random whitepsaces from between some chat tabs (bug in vanilla game?)
        const chatTabContainer = document.querySelector('.chatting > .chatenemy');

        if (chatTabContainer === null) { return; }

        const childNodes = chatTabContainer.childNodes;
        for (const node of childNodes) {
            //log(node)
            if (node.nodeName === '#text') {
                node.remove();
            }
        }
    }


    // Right-click item in inventory --> opens small context menu with item name,
    // and options to send whole stack to bank or ruins bank.
    const invContextMenu = () => {
        const invArea = document.querySelector('.burbul > .leftsidemdfk');
        if (invArea === null) {
            setTimeout( () => {
                invContextMenu();
            }, 1000);
            return;
        }
        
        log("Adding inv area contextmenu listener...");
        invArea.addEventListener('contextmenu', e => {
            e.preventDefault();

            if (settings.invContextMenu.isOpen) {
                const previousMenu = document.querySelector('.inv-context-menu');
                if (previousMenu !== null) {
                    previousMenu.remove();
                }
                settings.invContextMenu.isOpen = false;
            }

            const target = e.target;
            let linkElem = null; // linkElem is the item tile in inventory

            if (target.classList.contains('blockex')) {
                linkElem = target.parentNode;
            } else if (target.nodeName == 'a' || target.nodeName == 'A') {
                linkElem = target;
            }

            if (linkElem === null) { return; }

            // Check if item has amount span
            let itemAmount = 1;
            if (linkElem.querySelector('span.amouti') !== null) {
                itemAmount = linkElem.querySelector('span.amouti').innerText;
            };

            const item = {
                name: linkElem.getAttribute('title'),
                id: linkElem.getAttribute('href').split('ko=')[1],
                image: linkElem.querySelector('div').style.backgroundImage.slice(5, -2),
                amount: itemAmount,
            }

            // Create context menu element
            const menuElem = document.createElement('div');
            menuElem.classList.add('inv-context-menu');

            // Menu top area with item image, anme etc.
            const top = document.createElement('div');
            top.classList.add('top');

            const itemImage = document.createElement('div');
            itemImage.classList.add('item-image');
            itemImage.style.backgroundImage = `url('${item.image}')`;
         
            const amountOwned = document.createElement('div');
            amountOwned.classList.add('amount-owned');
            amountOwned.innerText = `x ${item.amount}`;
    
            const itemName = document.createElement('div');
            itemName.classList.add('item-name');
            itemName.innerText = `${item.name}`;

            top.append(itemImage);
            top.append(itemName);
            top.append(amountOwned);

            // Menu items area
            const menuItems = document.createElement('div');
            menuItems.classList.add('menu-items');

            // Create context menu rows
            const bankItem = document.createElement('div');
            const consumeItem = document.createElement('div');
            bankItem.classList.add('menu-item');
            consumeItem.classList.add('menu-item');

            const createActionButton = text => {
                const button = document.createElement('div');
                button.classList.add('button');
                button.innerText = text;
                return button;
            }

            // Add to bank button
            const buttonAddToBank = createActionButton('Add to Bank');
            const buttonConsume = createActionButton('Consume');
    
            bankItem.append(buttonAddToBank);
            consumeItem.append(buttonConsume);
      
            const createAmountInput = (defaultValue) => {
                const input = document.createElement('input');
                input.classList.add('amount-input');
                input.setAttribute('type', 'number');
                input.setAttribute('min', '1');
                input.setAttribute('max', item.amount);
                input.setAttribute('value', defaultValue);
                return input;
            }


            // Amount inputs
            bankItem.append('Amount:');
            const bankAmount = createAmountInput(item.amount);
            bankItem.append(bankAmount);

            consumeItem.append('Amount:');
            const consumeAmount = createAmountInput(1);
            consumeItem.append(consumeAmount);

            log("Adding context menu bank button click listener...");
            buttonAddToBank.addEventListener('click', () => {
                const amountToSend = bankAmount.value;
                //log(`Adding ${amountToSend} of ${item.name} to Bank...`);
                sendToBank(item, amountToSend, mouse,  menuElem, linkElem);
            });
       
            log("Adding context menu consume button click listener...");
            buttonConsume.addEventListener('click', () => {
                const amountToConsume = consumeAmount.value;
                //log(`Consuming ${amountToConsume} of ${item.name}...`);
                consume(item, amountToSend, mouse,  menuElem, linkElem);
            });

            menuItems.append(bankItem);
            menuItems.append(consumeItem);

            menuElem.append(top);
            menuElem.append(menuItems);


            // Position menu at mouse position
            const mouse = { x: e.pageX, y: e.pageY };
            menuElem.style.left = `${mouse.x-60}px`;
            menuElem.style.top = `${mouse.y-3}px`;   

            document.body.append(menuElem);
            settings.invContextMenu.isOpen = true;

            // Remove menu when right-clicking on the menu
            log("Adding context menu right-click listener...");
            menuElem.addEventListener('contextmenu', e => {
                e.preventDefault();
                menuElem.remove();
                settings.invContextMenu.isOpen = false;
            }, { once: true });

            // Remove menu when mouse leaves the menu
            log("Adding context menu mouseleave listener...");
            menuElem.addEventListener('mouseleave', e => {
                e.preventDefault();
                menuElem.remove();
                settings.invContextMenu.isOpen = false;
            }, { once: true });

            // Remove  menu when clicking elsewhere,
            // don't close menu if clicking inside the menu
            log("Adding document click listener to close context menu...");
            document.addEventListener('click', e => {
                if (document.contains(menuElem) && !menuElem.contains(e.target)) {
                    menuElem.remove();
                    settings.invContextMenu.isOpen = false;
                }
            }, { once: true });



            // POST url to deposit item to bank
            // with item amount in form data amount: "224" 
            // request cookies PHPSESSID	"567fbb9ef99a13ffa5889f95fbb4c362"
            // toolbar cookie e9c8092265e0016efff70fa80f043938
            // 	https://dragonrip.com/game/itemuse.php?go=2&ko=843

            // same thing for Ruins bank:
            // https://dragonrip.com/game/ruinsb.php?go=1&ko=229
            
        });
    }



    // Send item to bank function, used in inv context menu
    const sendToBank = async (item, amountToSend, mouseCoords, menuElem, linkElem) => {
        // Note: it seems making a GET request with no body (no payload)
        // results in the game putting 1 item to the bank

        const url = `https://dragonrip.com/game/itemuse.php?go=2&ko=${item.id}`;

        await fetch(url, {
            method: "POST",
            body: `amount=${amountToSend}`,
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              "Cookie": `PHPSESSID=${settings.sessionId}`,
            }
        })
        .then((res) => {
          return res.text();
        })
        .then((html) => {
            const str = html;
            if (str.indexOf("Not enough space in Bank!") > -1) {
                log("No space in bank.");
                floatText("NO BANK SPACE", "red", mouseCoords);
            } else if (str.indexOf("Added to your bank.") > -1) {
                floatText(`Added ${amountToSend} ${item.name} to Bank`, "lime", mouseCoords);

                // Remove item from inventory if all items added
                if (item.amount - amountToSend <= 0) {
                    menuElem.remove();
                    settings.invContextMenu.isOpen = false;
                    linkElem.remove();
                } else {
                    // Update item amount in inventory
                    const newAmount = item.amount - amountToSend;
                    linkElem.querySelector('span.amouti').innerText = newAmount;
                    menuElem.remove();
                }
            } else if (str.indexOf("You Don't Have THIS item!") > -1) {
                floatText("You don't Have this item", "orange", mouseCoords);
            } else if (str.indexOf("Incorrect amount!") > -1) {
                floatText("Incorrect amount!", "orange", mouseCoords);
            }
        });
    }

    // Consume item (eat, drink, etc.)
    const consume = async (item, amountToConsume, mouseCoords, menuElem, linkElem) => {
        // https://dragonrip.com/game/eat.php?ko=399   // eat fish
        // https://dragonrip.com/game/eat.php?ko=164   // eat meat
        // https://dragonrip.com/game/drink.php?ko=479 // drink potion
        // https://dragonrip.com/game/bmfood.php?go=1 // eat bm food ( eg. volcanic peppers, GET)

        // to-do_ tähän jäin. Tehdään item type mappi, missä esim. kaikki kalat ja lihat, joiden tyyppi esim. "food". Potioneilla tyyppi potion.
        // Tyypin mukaan context menussa näytetään eri rivejä, esim. kalalla ja lihalla "Eat", potionilla "Drink", bm-ruualla "use" tai jotain.
        // Defaulttina kaikille näytetään "Add to bank"
        // Kaloja ja lihoja ei kuitenkaan ole ihan niin paljoa, potioneitakaan ei.

        const url = `https://dragonrip.com/game/itemuse.php?go=2&ko=${item.id}`;

        await fetch(url, {
            method: "POST",
            body: `amount=${amountToSend}`,
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              "Cookie": `PHPSESSID=${settings.sessionId}`,
            }
        })
        .then((res) => {
          return res.text();
        })
        .then((html) => {
            const str = html;
            if (str.indexOf("Not enough space in Bank!") > -1) {
                log("No space in bank.");
                floatText("NO BANK SPACE", "red", mouseCoords);
            } else if (str.indexOf("Added to your bank.") > -1) {
                floatText(`Added ${amountToSend} ${item.name} to Bank`, "lime", mouseCoords);

                // Remove item from inventory if all items added
                if (item.amount - amountToSend <= 0) {
                    menuElem.remove();
                    settings.invContextMenu.isOpen = false;
                    linkElem.remove();
                } else {
                    // Update item amount in inventory
                    const newAmount = item.amount - amountToSend;
                    linkElem.querySelector('span.amouti').innerText = newAmount;
                    menuElem.remove();
                }
            } else if (str.indexOf("You Don't Have THIS item!") > -1) {
                floatText("You don't Have this item", "orange", mouseCoords);
            } else if (str.indexOf("Incorrect amount!") > -1) {
                floatText("Incorrect amount!", "orange", mouseCoords);
            }
        });
    }


    // Floating text at mouse (from context menu actions)
    const floatText = (str, color, pos) => {
        const elem = document.createElement('div');
        elem.classList.add('custom-float-text');
        elem.innerText = str;
        elem.style.color = color;

        document.body.append(elem);
        const elemW = elem.offsetWidth;
        // Position text at mouse position
        elem.style.left = `${pos.x-elemW/2}px`;
        elem.style.top = `${pos.y-30}px`;

        elem.style.transform = 'translateY(-100px)';
        elem.style.opacity = '0';     
        setTimeout( () => {
           
        }, 10);

        setTimeout( () => {
            elem.remove();
        }, 2010);
    }

    
    const setStatBarObservers = () => {
        const textElemHp = document.querySelector('.player > .bar > .healthbar:nth-child(1)  > .healthbar2 > .tekstasHealthbar');
        const textElemStam = document.querySelector('.player > .bar > .healthbar:nth-child(3)  > .healthbar2 > .tekstasHealthbar');
        const textElemXp = document.querySelector('.player > .bar > .healthbar:nth-child(5)  > .healthbar2 > .tekstasHealthbar');
          //const targetNode = document.querySelector('.chat-message-list > div');

        const config = { attributes: false, childList: false, subtree: false, characterData: true };

        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'CharacterData') {
                    log('stats bar text changed');
                    changeMainBarTexts();
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(textElemHp, config);
        observer.observe(textElemStam, config);
        observer.observe(textElemXp, config);
        log('stat bar observers set')
    }


    const setCustomCss = str => {
        const styleElem = document.createElement("style");
        styleElem.textContent = str;
        document.body.appendChild(styleElem);
    }


    // Wait for game UI to load, then insert elements
    const waitForUI = () => {
        const checkElem = setInterval( () => {
            if (document.querySelector('ul.navbar') !== null) {

                clearInterval(checkElem); 

                if (settings.fancyBars) { 
                    setCustomCss(fancyBarsCss); 
                    if (settings.animateXpBar) { setCustomCss(animatedXpBarCss); }
                } 

                if (settings.clearGameLogoHtml) { clearGameLogoHtml(); }
               
                
                insertLogoAreaInfo();
                updateClock();
                

                if (settings.chatStyling) {
                    setChatStyles();
                }

                // Change bar texts, even in combat when bars refresh
                if (settings.customBarText) {
                    changeMainBarTexts();
                    //setStatBarObservers();
                    

                    setInterval( () => {
                        changeMainBarTexts();
                    }, 25); //25
                }

                // Add extra box to the right of UI
                if (settings.createExtraBox) {
                    setCustomCss(extraBoxCss);
                    createExtraBox();
                }

                if (true) {
                    setCustomCss(invContextMenuCss);
                    invContextMenu();
                }
            }
        }, 5);
    }


    const setObserver = () => {
        //const targetNode = document.querySelector('.chat-message-list > div');
        const targetNode = document.querySelector('.burbul > .leftsidemdfk');
        const config = { attributes: false, childList: true, subtree: false };

        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    //log('A child node has been added or removed (log replacer).');
                    const nodes = mutation.addedNodes;
              
                    
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
        log(`${logStamp}: set observer for chat .chat-message-list'`);
    }


    const init = () => {
        setCustomCss(mainCss);
        setCustomCss(infoAreaCss); 
        setCustomCss(serverTimeMainCss);
        
        if (settings.serverTime.fancyBox) { setCustomCss(serverTimeFancyBoxCss); } 
        if (settings.removeGameLogo) { setCustomCss(removeGameLogoCss); } 
        if (settings.removeGameFooter) { setCustomCss(removeGameFooterCss); } 

        waitForUI();
        log('Script loaded.');
    }


    init();
})();
