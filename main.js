const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)


const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 100,
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 50}); 

const check = document.querySelector("input[name=checkbox]");
const check2 = document.querySelector("input[name=checkbox2]");
const switch2 = document.querySelector('.switch2');
const switch3 = document.querySelector('.switch');

check.addEventListener('change', (event) => {
    if (event.target.checked) {
        switch2.style.backgroundColor = '#FF7F11';
        body.style.backgroundColor = '#FFFDD0';
        header.style.backgroundColor = '#FFFDD0';
        root.style.setProperty('--first-color', '#FF7F11');
    } else {
        switch2.style.backgroundColor = '#4169E1';
        switch3.style.backgroundColor = '#4169E1';
        body.style.backgroundColor = '#D1E3DD';
        header.style.backgroundColor = '#D1E3DD';
        root.style.setProperty('--first-color', '#4169E1');
    }
});

check2.addEventListener('change', (event) => {
    if (event.target.checked) {
        switch2.style.backgroundColor = '#5B7553';
        switch3.style.backgroundColor = '#5B7553';
        body.style.backgroundColor = '#F4FDFF';
        header.style.backgroundColor = '#F4FDFF';
        root.style.setProperty('--first-color', '#5B7553');
    } else {
        switch2.style.backgroundColor = '#FF7F11';
        switch3.style.backgroundColor = '#FF7F11';
        body.style.backgroundColor = '#FFFDD0';
        header.style.backgroundColor = '#FFFDD0';
        root.style.setProperty('--first-color', '#FF7F11');
    }
});

const body = document.querySelector('body');
const header = document.querySelector('.l-header');
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
const firstColor = rootStyles.getPropertyValue('--first-color').trim();
const secondColor = rootStyles.getPropertyValue('--second-color').trim();
