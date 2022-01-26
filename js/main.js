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
                    sidenavTrigger.open();
                    this.digitContainers[i].classList.add("selected");

                    this.takeValueFromController(this.digitContainers[i])
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
                document.querySelector(".timer-pausebtn").onclick=()=>{
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

// scroll effect

window.onscroll=()=>{

    if (document.body.scrollTop>=100 || document.documentElement.scrollTop>=100) {
       
    } // document.getElementById('heading_sec').style.position = 'fixed'
        // document.getElementById('heading_sec').style.height = '100vh'
   
}