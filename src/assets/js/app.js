import '../styles/base.scss';
const barEl = document.querySelector('.loading__bar--inner');
const numberEl = document.querySelector('.loading__counter--number');
let c = 0;
let barInterval = setInterval(()=>{
    numberEl.innerText = c + '%';
    barEl.style.width = c + '%';
    c++;
 if (c === 101){
     numberEl.style.color = '#6cff8d';
     clearInterval(barInterval)
 }
},20 );