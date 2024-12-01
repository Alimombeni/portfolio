import Splide from "@splidejs/splide";
import { gsap } from "gsap";
import { reviews } from './reviewData';
import { faqdata }  from './faqData';
import projectData from "./projectData";





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

// project section
const projectEl = document.querySelector('.projects');
const skillEl =
projectData.map((project) =>{
    const projectTemplates = `
    
    <div class="project">
        <div class="project__header">
            <span>${project.number}</span>
            <span>${project.time}</span>
        </div>
        <div class="project__infos">
            <h1 class="project__infos--name">
                ${project.name}<span>${project.level}</span></h1>
        </div>
        <div class="project__img">
            <img class="project__img--inner" src="${project.img}" alt="project images">
            <div class="project__links">
                <a href="${project.gitlink}" target="_blank">
                    <button class="collButton">
                        <span>Github</span>
                    </button>
                </a>
                <a href=${project.vercellink}  class="coolCircleEyeButton" target="_blank">
                    <svg class="textcircle" viewBox="0 0 500 500">
                        <defs>
                            <path
                                    id="textcircle"
                                    d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                            />
                        </defs>
                        <text>
                            <textPath
                                    xlink:href="#textcircle"
                                    aria-label=".Click to see the live version."
                                    textLength="900"
                            >
                                .Click to see the live version.
                            </textPath>
                        </text>
                    </svg>
                    <svg
                            aria-hidden="true"
                            class="eye"
                            viewBox="0 0 70 70"
                            xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                                class="eye__outer"
                                d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z"
                        />
                        <path
                                class="eye__lashes-up"
                                d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192"
                        />
                        <path
                                class="eye__lashes-down"
                                d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z"
                        />
                        <circle class="eye__iris" cx="35" cy="35.31" r="5.221" />
                        <circle class="eye__inner" cx="35" cy="35.31" r="10.041" />
                    </svg>
                </a>
<!------------------------------>


 <div class="project__tags">  
       <!--  skills tags-->         
                <a href="#" class="coolFunnyLink">
                    <span>${project.skill}</span>
                    
                    <svg width="100%" height="9" viewBox="0 0 101 9">
                        <path
                                d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294"
                                pathLength="1"
                                fill="none"
                                stroke="#fff"
                        />
                    </svg>
                    <p><span>About Project:</span>${project.description}</p>
                </a>
                </div>
        </div>
    </div>

            </div>
    </div>
    `
    projectEl.innerHTML += projectTemplates;
    // --------------------------------------------------------------------------->>>>>>>>>>>>>>>





})



// slider section
var splide = new Splide( '.splide', {
    type   : 'loop',
    perPage: 3,
    perMove: 3,
});
splide.mount();







