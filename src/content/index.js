import sStorage from '../ext/sstorage'

const module = (() => {
  function addBoxStyles () {
    const css = `
      .tm-box {
        font-family: Segoe UI;
        line-height: 18px;
        position: fixed;
        z-index: 9999;
        top: 20px;
        right: 20px;
        box-sizing: border-box;
        width: 550px;
        min-height: 114px;
        padding: 15px;
        opacity: .5;
        text-align: left;
        transition: opacity .5s ease-out;
        cursor: move;
        user-select: none;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
      }
      .tm-box:hover {
        opacity: 1;
      }
      .tm-box--hidden {
        visibility: hidden;
        opacity: 0;
      }
      .tm-box__content {
        font-size: 14px;
        color: #1C1C1C;
      }
      .tm-box__title {
        font-size: 12px;
        margin-top: 8px;
        color: #464646;
      }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(css.trim()))

    document.head.appendChild(style)
  }

  function appendBox () {
    addBoxStyles()
    const box = document.createElement('div')
    box.className = 'tm-box tm-box--hidden'
    const content = document.createElement('div')
    content.className = 'tm-box__content'
    const title = document.createElement('div')
    title.className = 'tm-box__title'

    box.appendChild(content)
    box.appendChild(title)
    document.body.appendChild(box)

    return box
  }

  return {
    box: null,
    bound: null,
    x: 0,
    y: 0,
    getBoxPosition (boxOffset, e) {
      const { clientX: x, clientY: y } = e
      const { x: boxOffsetX, y: boxOffsetY } = boxOffset
      return {
        'x': x - boxOffsetX + 'px',
        'y': y - boxOffsetY + 'px'
      }
    },
    getBoxOffset (e) {
      const y = e.clientY - e.currentTarget.offsetTop
      const x = e.clientX - e.currentTarget.offsetLeft
      return { x, y }
    },
    moveBox () {
      this.box.addEventListener('mousedown', (e) => {
        const boxOffset = this.getBoxOffset(e)
        this.bound = (e) => {
          const { x, y } = this.getBoxPosition.call(e.currentTarget, boxOffset, e)
          e.currentTarget.style.right = ''
          e.currentTarget.style.left = x
          e.currentTarget.style.top = y
          this.x = x
          this.y = y
        }
        this.box.addEventListener('mousemove', this.bound)
      })
    },
    stopBox () {
      this.box.addEventListener('mouseup', (e) => {
        sStorage.set('tmBoxCoor', { x: this.x, y: this.y })
        this.box.removeEventListener('mousemove', this.bound)
      })
    },
    putDefaultPlace () {
      this.box.addEventListener('dblclick', (e) => {
        this.box.style.left = ''
        this.box.style.right = '20px'
        this.box.style.top = '20px'
        sStorage.remove('tmBoxCoor')
      })
    },
    putOnChangedPlace () {
      const coor = sStorage.get('tmBoxCoor')
      if (coor) {
        this.box.style.left = coor.x
        this.box.style.top = coor.y
      }
    },
    init () {
      // console.log('content init')
      if (parent !== self) {
        return
      }
      this.box = appendBox()
      this.putOnChangedPlace()
      this.moveBox()
      this.stopBox()
      this.putDefaultPlace()
    }
  }
})()

module.init()
