const inputText = document.querySelector('.input-text-box')
const button = document.querySelector('.translateButton')
const resultText = document.querySelector('.result-text-box')
var fromSelection
var toSelection

const ddlselect = (selection) => {
    if (selection == 'from-select') {
        const fromS = document.querySelector('.from-select')
        fromSelection = String(fromS.value)
    }
    else if (selection == 'to-select') {
        const toS = document.querySelector('.to-select')
        toSelection = String(toS.value)
    }
}

let translatedSentence

const handleClick = () => {
    const inputSentence = inputText.value
    getTranslation(inputSentence)
}

button.addEventListener('click', handleClick)

inputText.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        handleClick()
    }
})

const getTranslation = (inputSentence) => {
    console.log('input is ' + inputSentence + ' translating from ' + fromSelection + ' to ' + toSelection)
    fetch(`http://localhost:8000/translate?sentence=${inputSentence}&from=${fromSelection}&to=${toSelection}`)
        .then(response => response.json())
        .then(json => {
            translatedSentence = json
            resultText.value = translatedSentence
        })
        .catch(err => console.log(err))
}