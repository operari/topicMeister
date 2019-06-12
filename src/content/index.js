function cloudStyles () {
  const css = `
    .tm-cloud {
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
      cursor: pointer;
      user-select: none;
      border-radius: 5px;
      background-color: #ffffff;
      box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    }
    .tm-cloud--hidden {
      display: none;
    }
    .tm-cloud__content {
      font-size: 14px;
      color: #1C1C1C;
    }
    .tm-cloud__title {
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

(function (cb) {
  const cloud = document.createElement('div')
  cloud.className = 'tm-cloud tm-cloud--hidden'
  const content = document.createElement('div')
  content.className = 'tm-cloud__content'
  const title = document.createElement('div')
  title.className = 'tm-cloud__title'

  cloud.appendChild(content)
  cloud.appendChild(title)
  document.body.appendChild(cloud)

  cb()
})(cloudStyles)
