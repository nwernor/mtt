const player = document.querySelector('.player'),
    playBtn = document.querySelector('.play'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    audio = document.querySelector('.audio'),
    progressContainer = document.querySelector('.progress__container'),
    progress = document.querySelector('.progress'),
    title = document.querySelector('.song'),
    image = document.querySelector('.image'),
    imgg = document.querySelector('.imgg'),
    imgSrc = document.querySelector('.img__src')

const songs = ['2 GOLDEN DAWN 7','Babys On Fire','Cookie Thumper']

let songIndex = 0

function loadSong(song) {
    title.innerHTML = song
    audio.src = `${song}.mp3`
    imgg.src = `cover${songIndex + 1}.jpg`

}
loadSong(songs[songIndex])

function playSong(){
    //preparation();
    player.classList.add('play')
    audio.play()
}

function pauseSong(){
    player.classList.remove('play')
    audio.pause()
}
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying){
        pauseSong()
    } else{
        playSong()
    }
})

function nextSong() {
    songIndex++

    if(songIndex > songs.length -1){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

function prevSong() {
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length-1
    }

    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)

function updateProgress(e) {
    //console.log(e)
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration)*100
    progress.style.width = `${progressPercent}%`
}

audio.addEventListener('timeupdate', updateProgress)

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    console.log((clickX / width ) * duration)
    audio.currentTime = (clickX / width ) * duration
    console.log(audio.currentTime)
}

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)





// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');
// canvas.width = 380;
// canvas.height = 100;
// class bar {
//     constructor(x, y, width, height, color){
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.color = color;
//     }
//     updateProgress(micInput){
//         this.x = micInput;
//         this.x++;

//     }
//     draw(context){
//         context.fillStyle = this.color
//         context.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
//     const bar1 = new BarProp(10, 10, 10, 200, 'blue');
//     function animate (){
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         bar1.update();
//         bar1.draw(ctx)
//         requestAnimationFrame(animate);

//     }
//     animate()

// const columnsGap = 2
// const columnCount = 256 // Кол-во колонок: 1024, 512, 256, 128, 64

// const canvas = document.getElementById('myCanvas')
// const ctx = canvas.getContext('2d')

// let audioCtx = new(window.AudioContext || window.webkitAudioContext)();
// let source = audioCtx.createMediaElementSource(audio);
// let analyser = audioCtx.createAnalyser();
// analyser.fftSize = columnCount;
// source.connect(analyser); // Подключаем анализатор к элементу audio
// analyser.connect(audioCtx.destination); // Без этой строки нет звука, но анализатор работает.
// let frequencyData = new Uint8Array(analyser.frequencyBinCount);


// window.addEventListener('resize', resizeCanvas, false)

// function resizeCanvas() {
//     canvas.width = 80
//     canvas.height = 300
// }
// resizeCanvas()

// // Рисует колонку
// function drawColumn(x, width, height) {
//     const gradient = ctx.createLinearGradient(0, canvas.height - height / 2, 0, canvas.height);
//     gradient.addColorStop(1, "rgba(255,255,255,1)");
//     gradient.addColorStop(0.9, "rgba(255,150,0,1)");
//     gradient.addColorStop(0, "rgba(255,0,0,0)");
//     ctx.fillStyle = gradient;
//     ctx.fillRect(x, canvas.height - height / 2, width, height)
// }

// function render() {

//     analyser.getByteFrequencyData(frequencyData); // Записываем в массив данные уровней частот 

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const columnWidth = (canvas.width / frequencyData.length) - columnsGap + (columnsGap / frequencyData.length) // Ширина колонки
//     const heightScale = canvas.height / 100; // Масштабный коэффициент

//     let xPos = 0

//     for (let i = 0; i < frequencyData.length; i++) {
//         let columnHeight = frequencyData[i] * heightScale

//         drawColumn(xPos, columnWidth, columnHeight / 2)

//         xPos += columnWidth + columnsGap
//     }

//     window.requestAnimationFrame(render)
// }
var audioVisualization =document.getElementById("audioVisualization")
var context;
var analyser;
var src;
var array;
var audioVisualizationLine;
logo = document.getElementById("logo".style);
function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(!audio.pause){
        window.requestAnimationFrame(loop);
    }
    
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array)

    for (var i = 0; i < 32; i++) {
        height = array[i+32];
        audioVisualizationLine[i].style.minHeight = height + 'px';
        audioVisualizationLine[i].style.opacity = 0.005*height;

    }
}
audio.addEventListener('playing', function(){
    if(!context){

        for (var i = 0; i < 32; i++) {
            var div = document.createElement('div');
            div.classList.add('audioVisualization-line');
            audioVisualization.append(div);
        }

        audioVisualizationLine = document.getElementById('audioVisualization-line');
        preparation();
    }
    loop();
});