const canvas = document.getElementById('canvas');
const faceColor = document.querySelector('#face-color');
const borderColor = document.querySelector('#border-color');
const lineColor = document.querySelector('#line-color');
const largeHandColor = document.querySelector('#large-hand-color');
const secondHandColor = document.querySelector('#second-hand-color');
const button = document.querySelector('#my-button');

function clock() {
    const now = new Date();
    const ctx = canvas.getContext('2d');
    
    // Setup Canvas
    ctx.save();     //save the default state.

    ctx.clearRect(0,0,500,500);     //Clear the Rectangle.
    ctx.translate(250,250);         //moves (0,0) to (250,250) in the middle.
    ctx.rotate(-Math.PI / 2);       //rotate the clock (-90deg), now tells the right time.

    // Set default Styles--
    ctx.strokeStyle = lineColor.value;
    ctx.fillStyle = faceColor.value;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round'           //will make the end of line rounded.

    // Draw Circle face/border--
    ctx.save();         //will save everything above-
    ctx.strokeStyle = borderColor.value;   //this styles will works in this block.
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    // Draw hour marks--
    ctx.save();
    for(let i=0; i<12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);    //It will distinct the marks.
        ctx.moveTo(120,0);    //These works little differently because of translate and rotate.
        ctx.lineTo(135,0);
        ctx.stroke();
    }
    ctx.restore();

    // For Minutes--
    ctx.save();
    for(let i=0; i<60; i++) {
        if(i%5 !== 0) {
            ctx.beginPath();
            ctx.moveTo(125,0);
            ctx.lineTo(130,0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // console.log(`${hr}:${min}:${sec}`);

    // Draw hour hand--
    ctx.save();
    ctx.rotate((Math.PI/6) * hr + (Math.PI/360) * min + (Math.PI/21600) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20,0);
    ctx.lineTo(100,0);
    ctx.stroke();
    ctx.restore();

    // Draw Min hand--
    ctx.save();
    ctx.rotate((Math.PI/30) * min + (Math.PI/1800) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-30,0);
    ctx.lineTo(112,0);
    ctx.stroke();
    ctx.restore();

    // Draw seconds hand--
    ctx.save();
    ctx.rotate((Math.PI / 30) * sec);
    ctx.strokeStyle = secondHandColor.value;
    ctx.fillStyle = secondHandColor.value;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-40,0);
    ctx.lineTo(120,0);
    ctx.stroke();
    ctx.arc(0, 0, 8, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.restore();  //restore the default state.

    requestAnimationFrame(clock);
}
requestAnimationFrame(clock);

// For download the image--

button.addEventListener('click' , () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'clock.png';
    link.href = dataURL;
    link.click();
})

// To store the settings in local storage--
function setChangesToStorage() {
    localStorage.setItem('face-color', faceColor.value);
    localStorage.setItem('border-color', borderColor.value);
    localStorage.setItem('line-color', lineColor.value);
    localStorage.setItem('largeHandColor', largeHandColor.value);
    localStorage.setItem('secondHandColor', secondHandColor.value);
}

// When color changes save changes to local storage--
faceColor.addEventListener('change',setChangesToStorage);
borderColor.addEventListener('change', setChangesToStorage);
lineColor.addEventListener('change', setChangesToStorage);
largeHandColor.addEventListener('change', setChangesToStorage);
secondHandColor.addEventListener('change', setChangesToStorage);


// Now to load changes from storage--
function loadChangesFromStorage() {
    faceColor.value = localStorage.getItem('face-color') || "#f4f4f4";
    borderColor.value = localStorage.getItem('border-color') || "#800000";
    lineColor.value = localStorage.getItem('line-color') || "#000000";
    largeHandColor.value = localStorage.getItem('largeHandColor') || "#800000";
    secondHandColor.value = localStorage.getItem('secondHandColor') || "#493628";
}

// Calling the Changes when the page loads--
document.addEventListener('DOMContentLoaded',loadChangesFromStorage);
