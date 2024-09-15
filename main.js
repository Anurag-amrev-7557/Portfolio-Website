const navLink = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const home = document.getElementsByClassName('home');
const footer = document.getElementsByClassName('footer');
const skills = document.getElementsByClassName('section');
const burger = document.querySelector('.burger input');
const navList = document.querySelector(".nav__list");
const check = document.querySelector("input[name=checkbox]");
const check2 = document.querySelector("input[name=checkbox2]");
const switch2 = document.querySelector('.switch2');
const switch3 = document.querySelector('.switch');
const switch1 = document.querySelector("#switch");
const logo = document.querySelector(".logo-image");
const logoContainer = document.querySelector(".logo");
const body = document.querySelector('body');
const header = document.querySelector('.l-header');
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
const firstColor = rootStyles.getPropertyValue('--first-color').trim();
const secondColor = rootStyles.getPropertyValue('--second-color').trim();
const inputs = document.querySelectorAll(".contact__input:not(.textarea)");
const backToTopButton = document.querySelector('.back-to-top');
const github = document.querySelector(".github");
const circle = document.querySelector('.circle');
const button = document.querySelectorAll(".button");
const socialicon = document.querySelectorAll(".home__social-icon");
const submit = document.querySelector(".btn");
const footerIcons = document.querySelectorAll(".footer__icon");

const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show');
        });
    }
}
showMenu('burger','nav-menu');

function circlefadeOut() {
    circle.style.backdropFilter = "blur(0px)";
}

function circlefadeIn() {
    circle.style.backdropFilter = "blur(5px)";
}

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

navLink.forEach(n => n.addEventListener("mouseover", () => {
    circle.style.backdropFilter = "blur(0px)";
}));

socialicon.forEach(icon => {
    icon.addEventListener("mouseover", circlefadeOut);
    icon.addEventListener("mouseout", circlefadeIn);
})

navLink.forEach(n => n.addEventListener("mouseout", circlefadeIn));

switch1.addEventListener("mouseover", circlefadeOut);

switch1.addEventListener("mouseout", circlefadeIn);

button.forEach(btn => {
    btn.addEventListener("mouseover", circlefadeOut);
    btn.addEventListener("mouseout", circlefadeIn); 
});

logoContainer.addEventListener("mouseover", circlefadeOut);
logoContainer.addEventListener("mouseout", circlefadeIn);
submit.addEventListener("mouseover", circlefadeOut);
submit.addEventListener("mouseout", circlefadeIn);

footerIcons.forEach(footer => {
    footer.addEventListener("mouseover", circlefadeOut);
    footer.addEventListener("mouseout", circlefadeIn);
})

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
window.addEventListener('scroll', scrollActive);




function hider(el) {
    for (let i = 0; i < el.length; i++) {
        el[i].addEventListener('click', () => {
          const navMenu = document.getElementById('nav-menu');
          burger.checked = false;
          navMenu.classList.remove('show');
        });
      }
}

hider(home);
hider(skills);
hider(footer);

if(window.innerWidth >= 480) {
    document.querySelector(".github").style.display = "flex";
    document.querySelector(".linkedin").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
    if(window.innerWidth >=1270) {
        document.querySelector(".github").style.display = "flex";
        document.querySelector(".linkedin").style.display = "flex";
    } else {
        document.querySelector(".github").style.display = "none";
        document.querySelector(".linkedin").style.display = "none";
    }
    window.addEventListener("resize", () => {
        if(window.innerWidth >= 1270) {
            circle.style.display = "block";
            document.querySelector(".github").style.display = "flex";
            document.querySelector(".linkedin").style.display = "flex";
        } else {
            circle.style.display = "none";
            document.querySelector(".github").style.display = "none";
            document.querySelector(".linkedin").style.display = "none";
        }
    });
});



const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 1000,
    delay: 100,
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input .placeholder',{interval: 50}); 



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




document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.text');
    const textLength = textElement.textContent.length;
    const scalingFactor = 1.95;
    const header = document.querySelector(".l-header");

    header.classList.add("animate__fadeInDown");
    const changeText = () => {
        textElement.textContent = "Artist";
        textElement.textContent = "Freelancer";
        textElement.textContent = "Freelancer";
    };

    if(window.innerWidth <= 480) {
        circle.style.display = "none";
        const newDuration = textLength * 0.12;
        textElement.style.maxWidth = textLength + 3.1 + "rem";
        textElement.style.setProperty('--typing-duration', `${newDuration}s`);
    }
    if(window.innerWidth >= 480) {
        const duration = textLength * 0.2; 
        textElement.style.maxWidth = textLength * scalingFactor + 3.1 + "rem";
        textElement.style.setProperty('--typing-duration', `${duration}s`);
    }
    
    textElement.style.setProperty('--typing-steps', `${textLength * 200}`);
});

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".btn");
    const Allinputs = document.querySelectorAll(".contact__input");
    const github = document.querySelector(".github");
    const linkedin = document.querySelector(".linkedin");

    github.style.top = "-5.7rem";
    github.style.right = "-5.7rem";
    linkedin.style.top = "-5.7rem";
    linkedin.style.left = "-5.7rem";

    github.addEventListener("mouseover", () => {
        document.querySelector(".github i").style.transform = "scale(1.1) rotate(100deg)";
        circlefadeOut();
    });
    github.addEventListener("mouseout", () => {
        document.querySelector(".github i").style.transform = "scale(1) rotate(100deg)";
        circlefadeIn();
    });
    linkedin.addEventListener("mouseover", () => {
        document.querySelector(".linkedin i").style.transform = "scale(1.1) rotate(180deg)";
        circlefadeOut();
    });
    linkedin.addEventListener("mouseout", () => {
        document.querySelector(".linkedin i").style.transform = "scale(1) rotate(180deg)";
        circle.style.backdropFilter = "blur(5px)";
        circlefadeIn();
    });

    Allinputs.forEach(input => {
        input.addEventListener("mouseover", circlefadeOut);
        input.addEventListener("mouseout", circlefadeIn);
    })

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



function checkScroll() {
    const github = document.querySelector(".github");
    const linkedin = document.querySelector(".linkedin");
    if(window.scrollY > 650) {
        backToTopButton.classList.remove('animate__fadeOut');
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
        backToTopButton.classList.add('animate__fadeIn');
    } else {
        backToTopButton.classList.remove('animate__fadeIn');
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
        backToTopButton.classList.add('animate__fadeOut');
    }

    if(window.scrollY >= 400) {
        github.style.top = "-10.7rem";
        github.style.right = "-10.7rem";
        linkedin.style.top = "-10.7rem";
        linkedin.style.left = "-10.7rem";
    } else if (window.scrollY === 0) {
        github.style.top = "-5.7rem";
        github.style.right = "-5.7rem";
        linkedin.style.top = "-5.7rem";
        linkedin.style.left = "-5.7rem";
    }
}

backToTopButton.addEventListener('click', () => {
    const github = document.querySelector(".github");
    const linkedin = document.querySelector(".linkedin");
    window.scrollTo({
        top: 0,
        behaviour: 'smooth'
    });
    github.style.top = "-5.7rem";
    github.style.right = "-5.7rem";
    linkedin.style.top = "-5.7rem";
    linkedin.style.left = "-5.7rem";
});

backToTopButton.addEventListener("mouseover", () => {
    circle.style.backdropFilter = "blur(0px)";
});

backToTopButton.addEventListener("mouseout", () => {
    circle.style.backdropFilter = "blur(5px)";
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



document.addEventListener('mousemove', (e) => {
    const clientX = e.clientX ;
    const clientY = e.clientY ;

    circle.style.left = `${clientX}px`;
    circle.style.top = `${clientY}px`;
});