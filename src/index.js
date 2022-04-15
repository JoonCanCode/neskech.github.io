

async function writeText(pTag, text, timeStep, variability){

    for(let i = 0; i < text.length; i++){
         console.log('Working...')
         pTag.innerHTML = text.substring(0, i + 1) + '|'
         step = Math.random() * variability + timeStep
         await sleep(step)
    }
}

async function deleteText(pTag, timeStep, variability){
    let text = pTag.innerHTML

    for(let i = 0; i < text.length; i++){
         pTag.innerHTML = text.substring(0, text.length - i - 1) + '|'
         step = Math.random() * variability + timeStep
         await sleep(step)
    }
    pTag.innerHTML = ''
}

async function cursorBlink(pTag, timeStep){
    let i = 0
    while (true){
         if (cursorBlinking){
            let text = pTag.innerHTML
            
            if (i++ % 2 == 0)
                pTag.innerHTML = text.substring(0, text.length - 1)+ '|'
            else
                pTag.innerHTML = text.substring(0, text.length - 1) + ' '
         }

         await sleep(timeStep)
    }
}




async function TextWrapper(pTag, text, timeStep, variability){
    cursorBlinking = false
    await deleteText(pTag, timeStep, variability)
    await writeText(pTag, text, timeStep, variability)
    cursorBlinking = true
}


let cursorBlinking = true
const timeStepText = 125
const variance = 50
const timeStepBlink = 350
const tag = document.getElementById('responseText')

window.onload = () => { cursorBlink(tag, timeStepBlink) }

inputField = document.getElementById('input')
document.getElementById('form').addEventListener('submit', (e) => {
    const data = Object.fromEntries(new FormData(e.target).entries());

    text = data['Chatbot-Input'] + '...'
    TextWrapper(tag, text, timeStepText, variance)
    inputField.value = ''

    e.preventDefault()

})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
