import './regist'
import Native from './native'
import Evt from './event'

const install = function (vue, name = '$native') {
  vue.prototype[name] = Native
  vue.mixin({
    created() {
      var activated = this.$options.activated
      Evt.on('comeBack', function (e) {
        activated && activated(e)
      })
    }
  })
}

export default install
