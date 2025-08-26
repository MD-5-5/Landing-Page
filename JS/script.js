
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


const cursorCircle = document.querySelector("#minicircle");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let smoothness = 0.11;
let xscale = 1, yscale = 1;

window.addEventListener("mousemove", function (event) {
    targetX = event.clientX;
    targetY = event.clientY;
});

function followTheCursor() {
    currentX += (targetX - currentX) * smoothness;
    currentY += (targetY - currentY) * smoothness;

    cursorCircle.style.transform = `translate(${currentX}px, ${currentY}px) scale(${xscale}, ${yscale})`;

    requestAnimationFrame(followTheCursor);
}



function firstpage() {
    const tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        duration: 2.5,
        opacity: 0,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: 0.2
        })
        .from("#herofooter", {
            y: '-10',
            duration: 1.5,
            opacity: 0,
            ease: Expo.easeInOut,
            delay: -1
        });
}


function circlesqueezing() {
    let xprev = 0, yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        const xdiff = dets.clientX - xprev;
        const ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.8, 1.2, 1 + xdiff * 0.01);
        yscale = gsap.utils.clamp(0.8, 1.2, 1 + ydiff * 0.01);

        clearTimeout(cursorCircle.resetTimeout);
        cursorCircle.resetTimeout = setTimeout(() => {
            xscale = 1;
            yscale = 1;
        }, 100);
    });
}

document.querySelectorAll(".elem").forEach(function (elem) {
    let rotate = 0;
    let diff = 0;

    elem.addEventListener("mouseleave", function () {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        const difference = dets.clientY - elem.getBoundingClientRect().top;
        diff = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: difference,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diff * 0.5)
        });
    });
});


const marqueeTrack = document.querySelector(".marquee-inner");
const halfWidth = marqueeTrack.scrollWidth / 2;

const marqueeAnimation = gsap.to(marqueeTrack, {
    x: `-=${halfWidth}`,
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
        x: (value) => {
            let x = parseFloat(value);
            return (x % -halfWidth) + "px";
        }
    }
});

marqueeTrack.addEventListener("mouseenter", () => marqueeAnimation.pause());
marqueeTrack.addEventListener("mouseleave", () => marqueeAnimation.resume());


function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("time").textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();



document.querySelectorAll("#second .elem h1").forEach(h1 => {
    h1.addEventListener("mouseenter", () => {
        gsap.to(h1, {
            x: 12,
            opacity: 0.6,
            duration: 0.4,
            ease: "power3.out"
        });
    });

    h1.addEventListener("mouseleave", () => {
        gsap.to(h1, {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out"
        });
    });
});

followTheCursor();
firstpage();
circlesqueezing();
