
import './js/chat'
import './js/quiz-app'
import './js/memoryGame'

/**
 * HandlerImport handling the apps imports to index html
 * event.target.tagName switches when the user click.
 */
 let count = 0
const HandlerImport = () => {
  document.querySelector('nav').addEventListener('click', event => {
    if (event.target.tagName === 'I') {
      event.target.id = event.target.parentElement.id
      console.log(event.target.parentElement.id)
    }
    switch (event.target.id) {
      case 'quiz':
        let quizApp = document.createElement('quiz-app')
        addDragAndDrop(quizApp.shadowRoot.querySelector('#quiz-app'))
        document.querySelector('#main').appendChild(quizApp)
        break
      case 'memory':
        let memoryApp = document.createElement('memory-app')
        document.querySelector('#main').appendChild(memoryApp)
        addDragAndDrop(memoryApp.shadowRoot.querySelector('#memory-app'))
        break

      case 'chat':
        let chatApp = document.createElement('chat-app')
        addDragAndDrop(chatApp.shadowRoot.querySelector('#chat-app'))
        document.querySelector('#main').appendChild(chatApp)
        break

    }
  })
}

const addDragAndDrop = (app) => {
  let pos1 ,pos2, pos3, pos4 = 0 // postion of the dragged app
  app.onmousedown = dragMouse

  function dragMouse(e) {
    app.style.ind = count++  // ind++ just to increase the index so that the window is focused
    e = e || window.event
    // mouse cursor position at startup
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag // call a function when the cursor of the mouse is move
  }

  // when the section is dragged, update position
  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    // acount the new cursor of the position mouse
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // we are elocating the element's in the new position
    app.style.top = (app.offsetTop - pos2) + 'px'
    app.style.left = (app.offsetLeft - pos1) + 'px'
  }
  function closeDragElement() { // dragMouse will stop moving when mouse is released
    document.onmouseup = null
    document.onmousemove = null
  }
}
HandlerImport()
