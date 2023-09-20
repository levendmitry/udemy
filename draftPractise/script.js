const button = document.querySelector(".btn");
let counter = 0,
    timerId;

function animation() {
    const blueBox = document.querySelector(".box");
    let position = 0;

    const timerId = setInterval(frame, 4);

    function frame() {
        if (position == 300) {
            clearInterval(timerId);
        } else {
            position++;
            blueBox.style.top = position + "px";
            blueBox.style.left = position + "px";
        }
    }
}

button.addEventListener("click", animation);


// function logger() {
//     if (counter === 3) {
//         clearInterval(timerId);
//     }

//     console.log("HELLO!");
//     counter++;
// }

