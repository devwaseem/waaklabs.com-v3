function lerp(a, b, t) {
    return a + (b - a) * t;
}

function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () =>
                tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap =
            config.snap === false
                ? (v) => v
                : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        populateWidths = () =>
            items.forEach((el, i) => {
                widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                xPercents[i] = snap(
                    (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) *
                        100 +
                        gsap.getProperty(el, "xPercent"),
                );
            }),
        getTotalWidth = () =>
            items[length - 1].offsetLeft +
            (xPercents[length - 1] / 100) * widths[length - 1] -
            startX +
            items[length - 1].offsetWidth *
                gsap.getProperty(items[length - 1], "scaleX") +
            (parseFloat(config.paddingRight) || 0),
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
    populateWidths();
    gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i) => xPercents[i],
    });
    gsap.set(items, { x: 0 });
    totalWidth = getTotalWidth();
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
            item,
            {
                xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                duration: distanceToLoop / pixelsPerSecond,
            },
            0,
        )
            .fromTo(
                item,
                {
                    xPercent: snap(
                        ((curX - distanceToLoop + totalWidth) / widths[i]) *
                            100,
                    ),
                },
                {
                    xPercent: xPercents[i],
                    duration:
                        (curX - distanceToLoop + totalWidth - curX) /
                        pixelsPerSecond,
                    immediateRender: false,
                },
                distanceToLoop / pixelsPerSecond,
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
            (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
            // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.updateIndex = () =>
        (curIndex = Math.round(tl.progress() * items.length));
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }
    if (config.draggable && typeof Draggable === "function") {
        let proxy = document.createElement("div"),
            wrap = gsap.utils.wrap(0, 1),
            ratio,
            startProgress,
            draggable,
            dragSnap,
            roundFactor,
            align = () =>
                tl.progress(
                    wrap(
                        startProgress +
                            (draggable.startX - draggable.x) * ratio,
                    ),
                ),
            syncIndex = () => tl.updateIndex();
        typeof InertiaPlugin === "undefined" &&
            console.warn(
                "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club",
            );
        draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode,
            type: "x",
            onPress() {
                startProgress = tl.progress();
                tl.progress(0);
                populateWidths();
                totalWidth = getTotalWidth();
                ratio = 1 / totalWidth;
                dragSnap = totalWidth / items.length;
                roundFactor = Math.pow(
                    10,
                    ((dragSnap + "").split(".")[1] || "").length,
                );
                tl.progress(startProgress);
            },
            onDrag: align,
            onThrowUpdate: align,
            inertia: true,
            snap: (value) => {
                let n =
                    Math.round(parseFloat(value) / dragSnap) *
                    dragSnap *
                    roundFactor;
                return (n - (n % 1)) / roundFactor;
            },
            onRelease: syncIndex,
            onThrowComplete: () => gsap.set(proxy, { x: 0 }) && syncIndex(),
        })[0];

        tl.draggable = draggable;
    }

    return tl;
}
