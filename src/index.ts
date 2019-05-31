/* eslint-disable @typescript-eslint/no-use-before-define */
import './style/style.css'
import Scene from './js/scene/Scene'

const scene = new Scene()
scene.init()
scene.start()

const objectSelect = document.getElementById('objectSelect')
const updateBtn = document.getElementById('update-btn')
objectSelect.addEventListener('change', () => {
  changeObject()
})
updateBtn.addEventListener('click', () => {
  updateObject()
})

function changeObject(): void {
  const inputValue = (document.getElementById('objectSelect') as HTMLTextAreaElement).value
  scene.changeObject(parseInt(inputValue, 10))
}

function updateObject(): void {
  const inputValue = (document.getElementById('objectSelect') as HTMLTextAreaElement).value
  scene.updateObject(parseInt(inputValue, 10))
}
