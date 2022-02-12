//Essential Functions
var body = document.getElementsByTagName("body")[0]
//Background Resizing 
body.onresize = function () {
    resizeBackground();
}

function resizeBackground() {
    width = window.innerWidth
    height = window.innerHeight

    body.style.backgroundSize = `${width}px ${height}px`;

}



//sidebar functions

let sidebar = {
    sideBar: document.querySelector(".sidenavContainer"),
    mainScreen: document.querySelector(".mainPart"),

    mediaScreen_width: window.innerWidth,
    open: function () {
        if (this.mediaScreen_width > 800) {
            this.sideBar.style.width = ' 25%'
            this.mainScreen.style.width = "75%"

        } else if (this.mediaScreen_width <= 800) {
            this.sideBar.style.width = ' 100%'
            this.mainScreen.style.width = "0%"

            append_closeBtn();
        }



    },
    close: function () {
        if (this.mediaScreen_width > 800) {
            this.sideBar.style.width = ' 0%'
            this.mainScreen.style.width = "100%"

        } else if (this.mediaScreen_width <= 800) {
            this.sideBar.style.width = ' 0%'
            this.mainScreen.style.width = "100%"


        }

    }
}

//Sidenav Bar Trigger Object
const sidenavTrigger = {
    menuToggle: document.querySelector(".toggle"),
    active: function () {
        if (this.menuToggle.className.includes("sn-open") === true) {
            this.open();
        } else if (this.menuToggle.className.includes("sn-close") === true) {
            this.close();
        }
    },
    open: function () {
        if (this.menuToggle.className.includes("active") === false) {
            this.menuToggle.classList.add("active")
        }
        sidebar.open();
        this.menuToggle.classList.replace('sn-open', 'sn-close');
        document.querySelector(".menuBar").style.top = '50%'
    },
    close: function () {
        if (this.menuToggle.className.includes("active") === true) {
            this.menuToggle.classList.remove("active")
        }
        this.menuToggle.classList.replace('sn-close', 'sn-open');
        document.querySelector(".menuBar").style.top = '0%'
        sidebar.close();
    },

}



//Number Taking
function takeNumber() {
    return {
        digitContainers: document.querySelectorAll(".digit"),
        number_pad: document.querySelectorAll(".number_pallete"),
        take: function () {
            this.digitContainer_userSelection();
        },
        digitContainer_userSelection: function () {
            for (let i = 0; i < this.digitContainers.length; i++) {
                this.digitContainers[i].onclick = () => {
                    this.digitContainers[i].classList.add("selected");
                    this.takeValueFromController(this.digitContainers[i]);
                    sidenavTrigger.open();
                }
            }
        },

        takeValueFromController: function (selectedElement) {
            for (let j = 0; j < this.number_pad.length; j++) {
                this.number_pad[j].onclick = () => {
                    selectedElement.innerHTML = j;
                    selectedElement.classList.remove("selected")
                }

            }
        },

    }
}
// Timer Scripts;
let time = {
    min: [0, 0],
    sec: [0, 0]
};

function countdown() {
    return {
        min_0: document.getElementById("min_zero"),
        min_1: document.getElementById("min_one"),
        sec_0: document.getElementById("sec_zero"),
        sec_1: document.getElementById("sec_one"),

        start: function () {

            this.distrubuter()
        },

        distrubuter: function () {
            time.min[0] = Number(this.min_0.innerHTML);
            time.min[1] = Number(this.min_1.innerHTML);
            time.sec[0] = Number(this.sec_0.innerHTML);
            time.sec[1] = Number(this.sec_1.innerHTML);
            this.fixTimeLimit();
        },
        fixTimeLimit: function () {
            if (time.sec[0] >= 6) {

                time.min[1] += 1;
                this.show(this.min_1, time.min[1]);
                time.sec[0] -= 6;
                this.show(this.sec_0, time.sec[0])
            }
            this.start_count();
        },
        start_count: function () {


            let counter = setInterval(() => {

                time.sec[1]--;
                this.show(this.sec_1, time.sec[1]);


                if (time.sec[1] < 0) { //after 9s

                    time.sec[1] = 9;
                    this.show(this.sec_1, time.sec[1]);

                    time.sec[0]--;
                    this.show(this.sec_0, time.sec[0]);

                    if (time.sec[0] < 0) { //after 60 seconds
                        time.sec[0] = 5;
                        this.show(this.sec_0, time.sec[0]);

                        time.min[1]--;
                        this.show(this.min_1, time.min[1]);


                        if (time.min[1] < 0) {
                            time.min[1] = 9;
                            this.show(this.min_1, time.min[1]);

                            time.min[0]--;
                            this.show(this.min_0, time.min[0])
                        }
                        if ((time.min[0] < 0)) {
                            this.clear();
                            clearInterval(counter);
                            document.getElementById("signal_sfx").play()
                        }

                    }
                }
                document.querySelector(".timer-pausebtn").onclick = () => {
                    clearInterval(counter);
                }
                document.querySelector(".timer-resetbtn").onclick = () => {
                    this.clear();
                    clearInterval(counter);
                }
            }, 1000);


        },

        show: function (element, value) {
            element.innerHTML = value;
        },
        clear: function () {
            this.show(this.min_0, 0);
            this.show(this.min_1, 0);
            this.show(this.sec_0, 0);
            this.show(this.sec_1, 0);
        },

    }
}





//Tour Manager

Window.prototype.defaultPos = 50;

class Tour {
    constructor() {
        this.elem = document.querySelector("div.tour-container");
        this.head = document.querySelector("div.tour-container div.guide-container h3");
        this.para = document.querySelector("div.tour-container div.guide-container p");


        class Styler {
            constructor() {
                this.changePos = this.changePos;
                this.show = this.show
            }
            changePos(top, left) {
                tour.elem.style.top = `${top}%`;
                tour.elem.style.left = `${left}%`
            }
            show() {
                let tutorialCompleted = sessionStorage.getItem("isTutorialFinished");
                location.href = "#secondSection"
                if (tutorialCompleted != "true") {
                    tour.elem.classList.add("active");
                    tour.elem.style.opacity = '1';

                    this.changePos(40, defaultPos);
                    tour.head.innerHTML = "Let's Take A Tour";
                    tour.para.innerHTML = "Through this journey you will understand how to use this countdown timer"
                    tour.head.classList.remove("finish");
                    tour.para.classList.remove("finish");
                    let buttons = document.querySelectorAll("button.tour-btn");
                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].setAttribute("Class", "tour-btn");
                        if (i === 0) {
                            buttons[0].classList.add("btn-skip")
                        } else if (i === 1) {
                            buttons[1].classList.add("btn-start");
                            buttons[1].innerHTML = "Start"
                        } else if (i === 2) {
                            buttons[2].classList.add("btn-skip", "btn-neverShow")
                        }

                    }

                    document.querySelector("div.tour-container .btn-skip").style.cssText = "Display:flex";
                    document.querySelector("div.tour-container .btn-neverShow").style.cssText = "Display:flex"

                    rollBackChanges(JSON.parse(sessionStorage.getItem("Primary Targets")))
                }

                return {
                    force: function () {
                        sessionStorage.removeItem("isTutorialFinished")
                        tour.style.show();
                    }
                }

            }
        }


        

        this.style = new Styler();
    }
    start() {
        document.querySelector("div.tour-container .btn-skip").style.cssText = "Display:none";
        document.querySelector("div.tour-container .btn-neverShow").style.cssText = "Display:none"

        this.style.changePos(62, 76);
        this.head.innerHTML = "Select A Unit";
        this.para.innerHTML = "Select a unit to set it's value.Just click on a unit and see effect"
    }
    toMenu() {
        this.style.changePos(19, 78);
        this.head.innerHTML = "Open The Num Pad";
        this.para.innerHTML = "wao!!, Now Click on this menubar to open the slide"
    }
    toNum() {
        sidenavTrigger.open()
        this.style.changePos(16, 87);
        this.head.innerHTML = "Select A Number";
        this.para.innerHTML = "Choose a number to set the value of your selected unit. "
    }
    toStart() {
        sidenavTrigger.close();
        this.style.changePos(63, 15);
        this.head.innerHTML = "Time To Start";
        this.para.innerHTML = "Finally, you can now start countdown. Click on start button and ENJOY !! "
    }
    toPause() {
        this.style.changePos(63, 30);
        this.head.innerHTML = "Take A Break";
        this.para.innerHTML = "If you need to pause the timer... just click on it";


    }
    toReset() {
        this.style.changePos(63, 43);
        this.head.innerHTML = "Feel Fresh & new";
        this.para.innerHTML = "Need Reset ??? Click Here";
    }
    toFinish() {
        this.style.changePos(40, defaultPos);
        this.head.innerHTML = "Coming Soon";
        this.para.innerHTML = "Our New Web Apps Are coming soon. Stay With Us";

        this.head.classList.add("finish");
        this.para.classList.add("finish")
    }
    finish(dontShow) {
        this.elem.style.opacity = 0;
        setTimeout(() => {
            this.elem.classList.remove("active")
        }, 1000);

        if (dontShow) {
            sessionStorage.setItem("isTutorialFinished", true);
        }

    }

}


const tour = new Tour();
