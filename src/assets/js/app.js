import { gsap } from "gsap";
import { reviews } from './reviewData';
import { faqdata }  from './faqData';
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
// slider section
var splide = new Splide( '.splide', {
    type   : 'loop',
    perPage: 3,
    perMove: 3,
});
splide.mount();

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


// FAQ section
const wraper = document.querySelector('.faq__wrap');
faqdata.map((faq) => {
    const faqTemplate = `
    <div class="question">
        <div class="question__wrap">
            <div class="question__status"></div>
            <h3>${faq.question}</h3>
        </div>
        <div class="question__answer">
            <p>${faq.answers}</p>
        </div>
    </div>
    `;
    wraper.innerHTML += faqTemplate;
});

// انتخاب تمام سوالات پس از ایجاد عناصر HTML
const questions = [...document.querySelectorAll('.question')];
questions.forEach((question) => {
    const qText = question.querySelector('h3');
    qText.addEventListener('click', () => {
        questions.forEach((q) => {
            if (q !== question) {
                q.classList.remove('open');
            }
        });
        question.classList.toggle('open');
    });
});





















