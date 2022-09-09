const KEY = '0560f4f8ab6f5ede5d6824bbb1fe7557'
const DEFAULT = '--'
const input = document.querySelector('.search-input');
const title = document.querySelector('.content__title');
const des = document.querySelector('.content__des');
const img = document.querySelector('img');
const temp = document.querySelector('.content__temp');
const contaier = document.querySelector('.container');
input.addEventListener('change',(e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${KEY}&lang=vi&units=metric`)
    .then(async res => {
        const data = await res.json();
        title.innerHTML = data.name || DEFAULT;
        des.innerHTML = data.weather[0].description || DEFAULT;
        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        temp.innerHTML = Number(data.main.temp).toFixed(0) || DEFAULT;
        
    })
})

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.lang = 'vi-VN';
// recognition.interimResults = true;
// recognition.maxAlternatives = 1;

const handlerVoice = (e) =>{
    // console.log(e);
    const text = e.toLowerCase(); 
    if(text.includes('')){
        // const locaition = text.split('tại')[1].trim();
        // console.log(locaition);
        input.value = text;
        input.dispatchEvent(new Event('change'));
        return
    }
    if(text.includes('thay đổi màu')){
        const color = text.split('màu')[1].trim();
        console.log(color);
        contaier.style.backgroundColor = color;
        return;
    }
    if(text.includes('màu nền mặc định')){
        contaier.style.backgroundColor = ''
    }

}
const micro = document.querySelector('.micro');
micro.addEventListener('click',(e) => {
    e.preventDefault();
    recognition.start();

})

recognition.continuous = false;
recognition.error = (e) => {
    console.log(e.error);
}



recognition.onresult = (e) => {
    // console.log(e);
    const result = e.results[0][0].transcript;
    handlerVoice(result)
}