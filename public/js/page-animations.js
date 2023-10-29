function setupMarqueeSlideLeftAnimation({ id }) {
    const scrollingText = document.getElementById(id);
    const words = gsap.utils.toArray(scrollingText.children);
    horizontalLoop(words, { paused: false, speed: 1, repeat: -1 });
    gsap.set(scrollingText, { yPercent: 100 });
    gsap.to(scrollingText, {
        yPercent: 0,
        delay: 0.6,
        opacity: 1,
        duration: 0.6,
        ease: "power.out",
    });
}

function setupBigTitleSlideUpAnimation(id) {
    gsap.registerPlugin(ScrollTrigger);

    const elementSelector = "#" + id;
    gsap.set(elementSelector, { yPercent: 100 });
    gsap.to(elementSelector, {
        scrollTrigger: {
            trigger: elementSelector,
            start: "-100% 75%",
            id: id,
            toggleActions: "play pause resume none",
        },
        yPercent: 0,
        duration: 0.5,
        ease: "ease-out",
    });
}

function setupProjectSlideDownAnimation(id) {
    const project = document.querySelector("#" + id);
    // if (!project) {
    //     return;
    // }
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(project, {
        scrollTrigger: {
            trigger: project,
            scrub: true,
            start: "top 25%",
            toggleActions: "play pause resume none",
        },
        yPercent: 150,
        opacity: 0,
        scale: 0.8,
    });
}

function setupParallaxMove(id, startAt) {
    const parent = document.querySelector(`#${id}`);
    // if (!parent) {
    //     return;
    // }
    const element = parent.firstChild;
    // gsap.registerPlugin(ScrollTrigger);
    // gsap.set(element, { y: 0 });
    // gsap.to(element, {
    //     scrollTrigger: {
    //         trigger: element,
    //         id: id,
    //         scrub: true,
    //         start: "bottom 96%",
    //         end: "100% top",
    //         toggleActions: "play pause resume none",
    //     },
    //     y: 1000,
    // });
    document.addEventListener("scroll", () => {
        const { top, height } = element.getBoundingClientRect();
        const percentageMoved = Math.min((-top / height) * (startAt / 100), 1);
        const percentageToMove = Math.max(0, lerp(0, 60, percentageMoved));
        element.style.transform = `translate(0px, ${percentageToMove}%)`;
    });
}
