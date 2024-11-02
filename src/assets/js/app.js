import {gsap} from "gsap";
const barEl = document.querySelector('.loading__bar--inner');
const numberEl = document.querySelector('.loading__counter--number');
const objectEl = document.querySelector('.loading__object');

let c = 0;
let barInterval = setInterval(() => {
    numberEl.innerText = c + '%';
    barEl.style.width = c + '%';
    c++;
    if (c === 101) {
        numberEl.style.color = '#6cff8d';

        setTimeout(()=>{
        objectEl.style.display = 'block';
        gsap.to('.loading__object' , {
            duration:100,
            rotation : '360deg',
            ease:'expo',
        })
        },100)
        clearInterval(barInterval)
        gsap.to('.loading__bar', {
            duration: 0.3,
            opacity: 0,

        });
        gsap.to('.loading__text , .loading__counter', {
            duration: 0.3,
            opacity: 0,
        });
        gsap.to('.loading__box', {
            duration: 1,
            height: '500px',
            borderRadius: '50%',
            borderColor: '#6cff8d',
        });
        gsap.to('.loading__box', {
            delay:2,
            border:'none',
        })

        gsap.to('.loading' , {
            duration:2,
            delay : 2,
            zIndex:1,
            background:'transparent',
            opacity:0.5,

        })

    }
}, 20);


