const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show');
        }) 
    }
}
showMenu('nav-toggle','nav-menu');

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
sr.reveal('.skills__data, .work__img, .contact__input .placeholder',{interval: 50}); 

const check = document.querySelector("input[name=checkbox]");
const check2 = document.querySelector("input[name=checkbox2]");
const switch2 = document.querySelector('.switch2');
const switch3 = document.querySelector('.switch');
const logo = document.querySelector(".logo-image");

check.addEventListener('change', (event) => {
    if (event.target.checked) {
        switch2.style.backgroundColor = '#FF7F11';
        body.style.backgroundColor = '#FFFDD0';
        header.style.backgroundColor = '#FFFDD0';
        root.style.setProperty('--first-color', '#FF7F11');
        logo.setAttribute("src", "logo-orange.png");
    } else {
        switch2.style.backgroundColor = '#4169E1';
        switch3.style.backgroundColor = '#4169E1';
        body.style.backgroundColor = '#D1E3DD';
        header.style.backgroundColor = '#D1E3DD';
        root.style.setProperty('--first-color', '#4169E1');
        logo.setAttribute("src", "logo-blue.png");
    }
});

check2.addEventListener('change', (event) => {
    if (event.target.checked) {
        switch2.style.backgroundColor = '#5B7553';
        switch3.style.backgroundColor = '#5B7553';
        body.style.backgroundColor = '#F4FDFF';
        header.style.backgroundColor = '#F4FDFF';
        root.style.setProperty('--first-color', '#5B7553');
        logo.setAttribute("src", "logo-green.png");
    } else {
        switch2.style.backgroundColor = '#FF7F11';
        switch3.style.backgroundColor = '#FF7F11';
        body.style.backgroundColor = '#FFFDD0';
        header.style.backgroundColor = '#FFFDD0';
        root.style.setProperty('--first-color', '#FF7F11');
        logo.setAttribute("src", "logo-orange.png");
    }
});

const body = document.querySelector('body');
const header = document.querySelector('.l-header');
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
const firstColor = rootStyles.getPropertyValue('--first-color').trim();
const secondColor = rootStyles.getPropertyValue('--second-color').trim();


document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.text');
    const textLength = textElement.textContent.length;
    
    const duration = textLength * 0.14; 
    
    textElement.style.setProperty('--typing-duration', `${duration}s`);
    textElement.style.setProperty('--typing-steps', `${textLength * 100}`);
});

document.addEventListener("DOMContentLoaded", () => {
    const submit = document.querySelector("#submit");
    const button = document.querySelector(".btn");
    const Allinputs = document.querySelectorAll(".contact__input");

    button.addEventListener("click", () => {
        for(let i=0; i<3; i++) {
            Allinputs[i].value = "";
            const placeholder = document.querySelectorAll(".placeholder");
            placeholder.forEach(ph => {
                ph.style.transform = "translateY(25%)";
                ph.style.fontSize = "0.9rem";
                ph.style.color = "rgba(0,0,0, 0.7)";
                ph.style.fontWeight = "600";
                ph.style.background = "none";
            });
        }

    });
    
});




const inputs = document.querySelectorAll(".contact__input:not(.textarea)");

inputs.forEach((input) => {
    const placeholder = input.nextElementSibling;

    input.addEventListener("keyup", () => {
        input.setAttribute("value", input.value);
    });

    input.addEventListener("focusout", () => {
        if (input.value.trim() !== "") {
            placeholder.style.transform = "translateY(-100%)";
            placeholder.style.fontSize = "0.9rem";
            placeholder.style.color = "var(--first-color)";
            placeholder.style.fontWeight = "600";
            placeholder.style.background = "linear-gradient(180deg, #D1E3DD 10%, #DAE9E4)";
        } else {
            placeholder.style.transform = "translateY(0)";
            placeholder.style.fontSize = "1rem";
            placeholder.style.color = "var(--first-color)";
            placeholder.style.fontWeight = "600";
            placeholder.style.background = "none";
        }
    });

    input.addEventListener("focusin", () => {
        if (input.value.trim() !== "") {
            placeholder.style.transform = "translateY(-100%)";
            placeholder.style.fontSize = "0.9rem";
            placeholder.style.color = "var(--first-color)";
            placeholder.style.fontWeight = "600";
            placeholder.style.background = "linear-gradient(180deg, #D1E3DD 10%, #DAE9E4)";
        }
    });
});

const backToTopButton = document.querySelector('.back-to-top');

function checkScroll() {
    if (window.scrollY > 650) {
        backToTopButton.classList.remove("animate__fadeOut"); 
        backToTopButton.style.opacity = "1";
        backToTopButton.style.visibility = "visible";
        backToTopButton.classList.add("animate__fadeIn");
    } else {
        backToTopButton.classList.remove("animate__fadeIn");
        backToTopButton.style.opacity = "o";
        backToTopButton.style.visibility = "hidden";
        backToTopButton.classList.add("animate__fadeOut");
    }
}

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

checkScroll();

window.addEventListener('scroll', checkScroll);

document.querySelector('.btn').addEventListener('click', function(event) {
    const screenWidth = window.innerWidth;
    event.preventDefault();
    if (screenWidth < 480) {
        document.querySelector('.contact__form') .submit();
    } else {
        setTimeout(function(){
            location.reload();
        }, 600);
        if (!btn.classList.contains('clicked')) {
            btn.classList.add('clicked');
        } else if (btn.classList.contains('clicked')) {
            document.querySelector('.contact__form').submit();
        }
      }
});
