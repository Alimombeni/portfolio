import { gsap } from "gsap";
import { reviews } from './data';
import Splide from "@splidejs/splide";

// ---------------------------------------------
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


// reviews cards
const splide_container = document.querySelector('.splide__list');
reviews.map((review)=>{
    let template = `<div class="splide__slide">
            <div class="review">
                <i class="uil uil-comment review__icon"></i>
                <div class="review__card">
                <div class="review__topborder"></div>
                <div class="review__text">
                    <span>${review.review.substring(0,1)}</span>
                    ${review.review.substring(1 , review.review.length)}
                 </div>
                <img src=${review.imgs} alt="" class="review__img">
            <div class="review__profile">
                 <span>${review.name}</span>
                 <span>${review.position}</span>
                    </div>
                </div>
            </div>
        </div>
                `
    splide_container.innerHTML += template;
});


var splide = new Splide( '.splide', {
    type   : 'loop',
    perPage: 3,
    perMove: 3,
});

splide.mount();




//
// const tl = gsap.timeline()
// tl.to("#theText", {
//     rotate: 360, transformOrigin: "50% 50%", repeat: 1000, duration: 10, ease: "none"
// })
// GSDevTools.create({animation:tl})
//
//





















