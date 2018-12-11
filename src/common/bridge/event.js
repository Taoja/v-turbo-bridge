const Evt = {
  on: function (evt, fn) {
    document.addEventListener(evt, fn, false)
  },
  off: function (evt, fn) {
    document.addEventListener(evt, fn, false)
  }
}

export default Evt