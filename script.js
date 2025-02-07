document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resBtn = document.querySelector("#reset-button");
    let newGameBtn = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turn0 = true;
    let count = 0;

    const winPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const resetGame = () => {
        turn0 = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.remove("show");
        msgContainer.classList.add("hide");
        msg.innerText = "";
    };

    const checkWinner = () => {
        for (let pattern of winPattern) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                    return true;
                }
            }
        }
        return false;
    };

    const gameDraw = () => {
        msg.innerText = `Game Draw.`;
        msgContainer.classList.remove("hide");
        msgContainer.classList.add("show");
        disableBoxes();
    };

    const disableBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    };

    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    };

    const showWinner = (winner) => {
        msg.innerText = "Congratulations, Winner is Player " + winner;
        msgContainer.classList.remove("hide");
        msgContainer.classList.add("show");
        disableBoxes();
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerText === "") {
                if (turn0) {
                    box.innerText = "0";
                    turn0 = false;
                } else {
                    box.innerText = "X";
                    turn0 = true;
                }
                box.disabled = true;
                count++;
                let isWinner = checkWinner();
                if (count === 9 && !isWinner) {
                    gameDraw();
                }
            }
        });
    });

    newGameBtn.addEventListener("click", resetGame);
    resBtn.addEventListener("click", resetGame);
});
