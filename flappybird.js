let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// Tạo hình ảnh và âm thanh
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

let fly = new Audio();
let scor = new Audio();
fly.src = "sounds/sounds_fly.mp3";
scor.src = "sounds/sounds_score.mp3";

let gap = 115; // Khai báo biến gap là khoảng cách giữa ống trên và ống dưới.
let constant; // Khai báo biêến constant là khoảng cách từ ống trên đến đầu ống dưới ( Bằng chiều cao ống trên + với khoảng cách giữa 2 ống)
//Khai báo Tọa độ ban đầu của chim.
let bX = 10;
let bY = 150;
// Hàm gravity: mỗi lần rơi chim sẽ rơi xuống 1.5 pixel
let gravity = 1.5;
// Hàm score để tính điểm.
let score = 0;
// Tạo hành động bay lên của chim mỗi lần ấn phím bất kỳ.
document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 35; // Mỗi lần bấm sẽ nhảy lên 35 pixel.
    fly.play(); // phát tiếng nhạc mỗi lần nhảy lên.
}

//Tạo 1 mảng lưu lại tọa độ ban đầu của các ống nước,khi khởi động game vị trí của ống nước đầu tiên có tọa độ x bằng với chiều rộng của canvas, tọa độ y bằng 0;
let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}

// Hàm draw đề vẽ hình ảnh vào.
function draw() {
    context.drawImage(bg, 0, 0);
    for (let i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap; // Khoảng cách từ ống trên đến đầu ống dưới.
        context.drawImage(pipeNorth, pipe[i].x, pipe[i].y); // Vẽ ống trên
        context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant); // Vẽ ống dưới có chung tọa độ x với ống trên, tọa độ y bằng tọa độ y của ống trên + với  constan là khoảng cách từ ống trên đến đầu ống dưới.
        pipe[i].x--; // Để ống di chuyển.
        // Lập trình điều kiện khi ống đi được 125pixel thì vẽ thêm ống mới.
        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height // Random tọa độ y để cho ống đi lên xuống.
            });

        }
        // Điều kiện khi ống có tọa độ x = 0 tức là cho được chim qua giữa 2 ống thì tăng điểm :D
        if (pipe[i].x == 0) {
            score++;
            scor.play();
        }
        // Điều kiện thua game.
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width &&
// so sánh vị trí x của chim với ống.
            (bY <= pipe[i].y + pipeNorth.height || // Điều kiện chạm ống trên.
                bY + bird.height >= pipe[i].y + constant) || // Điều kiện chạm ống dưới

            bY + bird.height >= canvas.height - fg.height) // Điều kiện chạm đất.
            {
             window.location.reload();
        }

    }
    context.drawImage(fg, 0, canvas.height - fg.height);
    context.drawImage(bird, bX, bY);
    bY += gravity;
    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score:" + score, 10, canvas.height - 20);
    requestAnimationFrame(draw);
}

draw()
setTimeout(() => {
    document.getElementById("myaudio").play()
}, 100)

