// ==UserScript==
// @name         Dragonrip Visual Tweaks
// @namespace    http://tampermonkey.net/
// @version      1.0.15
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
        removeGameLogo:true, // Remove the large Dragonrip.com logo
        clearGameLogoHtml:true, // Remove all elements from game area, eg. <br> tags
        addInfoBox:true, // Add info box to game logo box
        fancyBars:true, // Hp, stam, xp bar styling
        animateXpBar: false,
        usernameToShow:'paxu',
        customBarText: true, //change HP, stam and xp bar labels to shorter ones
        barLabels: { health: 'HP', stamina: 'SP', experience: 'XP' },

        serverTime: {
            label: "Server time:",
            keepRunning:true,  // Keep updating clock time (updates every second)
            seconds: false, // Include seconds in the time
            hours24: true,  // Toggle between 12h/24h time format
            fancyBox: false, // Additional styling for the time box element
        }
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
            height:68px;
        }

        div.player > div.picture {
            width: 50px!important;
            height:50px!important;
            margin-right:30px!important;
        }

        div.player > div.picture > a > div.kovsd {
            background-size:contain!important;
            width: 50px!important;
            height:50px!important;
            max-height: 50px!important;
            min-height: 50px!important;
            display:flex;
            flex-direction:column;
            justify-content: end;
        }

        div.player > div.picture > a > div.kovsd > span.amoutina {
            width:100%!important;
            margin-top: 0px!important;
            color: lime!important;
            color:rgb(111, 111, 255)!important;
            font-family:consolas,monospace;
        }

        div.player > div.bar {
            padding-top:0px!important;
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

    const fancyBarsCss = `
        
        /* Bar container */
        .player > .bar {
            xborder:1px solid lime;
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
            width:1000px!important;
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
            display:flex;
            flex-direction: column;
            justify-content:space-between;
            align-items:center;
            padding: 2px 5px 2px 10px;
        }

        body > div.logo > .info {
            xborder:1px solid lime;
            width:100%;
            height:50%;
            text-align:left;
            xpadding:5px;
            font-size:0.8em;
            font-family:consolas,monospace;
            color: grey;
            xtext-shadow: 
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black
            ;
        }	

        
        body > div.logo > .info > .item{
            display:flex;
            xborder:1px solid grey;
        }

        body > div.logo > .info > .item > .left {
            xdisplay:flex;
            width:35%;
            text-align:right;
            margin-right:10px;
        }

        body > div.logo > .info > .item.game-title > .title {
            xcolor: #de6c09;
            xcolor: #7a3c05;
            xcolor: #6633ff;
        }

        body > div.logo > .info > .item.game-title > .server {
            xcolor:#7a3c05;
            xmargin-left:10px;
            color: #6633ff;
            color:rgb(111, 111, 255);
            xcolor: #7a3c05;
            
        }

        body > div.logo > .info > .item.user > .name {
            color: #6633ff;
            color:rgb(111, 111, 255);
        } 



        body > div.logo > .info > .item.address {
            xborder:1px solid grey;
            text-wrap:no-wrap;
            width:100%;
            height:20px;
            xwhite-space: nowrap;
            overflow: hidden;
        }
    `;

    const serverTimeMainCss = `
        .dragonrip-server-time-cont > * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            user-select:none;
        }

        .dragonrip-server-time-cont {
            display:flex;
            flex-direction:row;
            background-repeat:repeat;
            background-size:contain;
            xfont-family:consolas,monospace;
            xcolor:grey;
            xtext-shadow: 
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black
            ;
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

    const smallerVanillaTopbarsCss = `
        div.player {
            height:68px;
        }
        div.player > div.picture {
            width: 50px!important;
            height:50px!important;
            margin-right:30px!important;
        }
        div.player > div.picture > a > div.kovsd {
            background-size:contain!important;
            width: 50px!important;
            height:50px!important;
            max-height: 50px!important;
            min-height: 50px!important;
            display:flex;
            flex-direction:column;
            justify-content: end;
        }

        div.player > div.picture > a > div.kovsd > span.amoutina {
            width:100%!important;
            margin-top: 0px!important;
            color: lime!important;
            color:rgb(111, 111, 255)!important;
            font-family:consolas,monospace;
        }

        div.player > div.bar {
            padding-top:0px!important;
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


    const log = console.log;

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

     const createGameTitle = () => {
        const elem = document.createElement('div');
        elem.classList.add('item');
        elem.classList.add('game-title');

        const gameTitle = document.createElement('div');
        gameTitle.classList.add('left');
        gameTitle.classList.add('title');
        gameTitle.innerText = 'www.dragonrip.com';
      

        const server = document.createElement('div');
        server.classList.add('server');
        //server.innerText = '[main server]';

        elem.append(gameTitle);
        elem.append(server);
        return elem;
     }

    const insertXpBarElems = () => {
        // Insert elems inside the colored bar part
        const bars = document.querySelectorAll('body > .player > .bar');
        const xpBar = bars[2];


        // stone.jpg https://i.imgur.com/pdfuIh9.jpeg
        // stone_fx.jpg https://i.imgur.com/s8VVf0Z.jpeg
        //const 
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

   
        infoArea.append(createGameTitle());
        infoArea.append(createClock());
 
        if (settings.serverTime.keepRunning) {
            setInterval( () => {
                updateClock();
            }, 1000);
        }

        infoArea.append(createUsernameLabel());
        infoArea.append(addressElem);
        targetElem.append(infoArea);
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
            health: 'HP', stamina: 'SP', experience: 'XP'
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
                    insertXpBarElems();
                    if (settings.animateXpBar) { setCustomCss(animatedXpBarCss); }
                } 

                if (settings.clearGameLogoHtml) { clearGameLogoHtml(); }
               
                if (settings.addInfoBox) {
                    insertLogoAreaInfo();
                    updateClock();
                }

                // Change bar texts, even in combat when bars refresh
                if (settings.customBarText) {
                    changeMainBarTexts();
                    const changeBarTexts = setInterval( () => {
                        changeMainBarTexts();
                    }, 25);
                }
            }
        }, 5);
    }


    setCustomCss(mainCss);
    setCustomCss(infoAreaCss); 
    setCustomCss(serverTimeMainCss);
    
    if (settings.serverTime.fancyBox) { 
        setCustomCss(serverTimeFancyBoxCss); 
    } 

    if (settings.removeGameLogo) { 
        setCustomCss(removeGameLogoCss); 
    } 


   

    waitForUI();

    //changeMainBarTexts();
})();
