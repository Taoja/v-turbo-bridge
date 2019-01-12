import Qs from 'qs'

const Native = {
  /**
   * 打开新窗口
   * @argument {String} url 新窗口链接
   * @argument {Object} data 新窗口传参
   * @argument {Object} options
   * {
   *  showTitleBar: Boolean //是否显示原生头
   *  transparentTitle: Boolean //原生头是否透明
   *  paramsSync: true //是否同步带参，true为通过url拼接同步带参，false为bridge异步传参
   * }
   * @return {Promise}
   * {
   *  code: Number //200成功
   * }
   */
  pushWindow: function (url, data, options) {
    let _options = {
      showTitleBar: true,
      transparentTitle: false,
      paramsSync: true
    }
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('pushWindow',{
        data: {
          url: url,
          params: data
        },
        options: Object.assign(_options, options)
      }, function (ret) {
        ret.code == 200 ? resolve( ret ) : reject( ret );
      })
    })
  },
  /**
   * 获取页面传参
   * @argument {Boolean} paramsSync 传参方式，对应pushWindow的传参方式
   * @return {Object | Promise}
   * {
   *  code: Number //0成功
   *  params: Object 参数对象
   * }
   */
  getParams: function (paramsSync = true) {
    if (paramsSync) {
      return {
        params: Qs.parse(window.location.search.replace('?', ''))
      }
    } else {
      return new Promise(function (resolve, reject) {
        TurboJSBridge.call('getPageParams', {
          data: {},
          options: {}
        }, function (ret) {
            ret.code == 200 ? resolve( ret ) : reject( ret );
        })
      })
    }
  },
  /**
   * 关闭窗口
   * @argument {String | Number | Array} key 返回目标
   * @argument {Object} data 给返回页面传递的参数
   * @argument {Object} options 暂时无用
   * @return {Promise}
   * {
   *  code: Number 0成功
   * }
   */
  closeWindow: function (key, data, options) {
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('closeWindow', {
        data: {
          key: key,
          params: data
        },
        options: options
      }, function (ret) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  },
  /**
   * rpc接口请求
   * @param {String} action 接口名
   * @param {Object} data 传参
   * @return {Promise} 
   * {
   *  code: 200成功
   *  msg: 失败信息
   *  header: {
   *    timestamp: 网关时间戳
   *    params: 上送的参数
   *    mock: 是否是mock数据
   *  }
   *  body: 返回的json
   * }
   */
  rpc: function (action, data) {
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('rpc', {
        data: {
          action,
          params: data
        },
        options: {
          timeout: 60000
        }
      }, function (ret) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  },
  /**
   * 对话框
   * @param {Object} data 传入参数
   * {
   *  title: 标题,
   *  msg: 正文,
   *  cancelBtnTitle: 取消按钮文案,
   *  confirmBtnTitle: 确认按钮文案
   * }
   * @param {Object} options 控制参数
   * {
   *  confirm: true, 是否显示确认按钮
   *  cancel: true, 是否显示取消按钮
   *  maskClick: true 是否点击背景关闭
   * }
   */
  dialog: function (data, options) {
    var _options = {
      confirm: true,
      cancel: true,
      maskClick: true
    }
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('dialog', {
        data: data,
        options: Object.assign(_options, options)
      }, function (ret) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  },
  /**
   * 提示框
   * @param {Object} data 传入参数
   * {
   *  msg: 提示文案,
   *  icon: 提示图标,
   *  duration: 持续时间
   * }
   */
  toast: function (data) {
    var _data = {
      duration: 2000
    }
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('toast', {
        data: Object.assign(_data, data),
        options: {}
      }, function (ret) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  },
  /**
   * 显示loading
   * @param {Object} options 控制参数
   * {
   *  maskClick: true 是否可以点击背景关闭loading
   * }
   */
  showLoading: function (options) {
    var _options = {
      maskClick: true
    }
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('showLoading', {
        data: {},
        options: Object.assign(_options, options)
      }, function (ret) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  },
  /**
   * 隐藏loading
   */
  hideLoading: function () {
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('hideLoading', {
        data: {},
        options: {}
      }, function (ret) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  },
  /**
   * 显示原生头
   */
  showNavBar: function () {
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('showNavBar', {
        data: {},
        options: {}
      }, function (ret) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  },
  /**
   * 隐藏原生头
   */
  hideNavBar: function () {
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('hideNavBar', {
        data: {},
        options: {}
      }, function (ret) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  },
  /**
   * 上送埋点
   */
  callTrack: function (opt) {
    return new Promise(function (resolve, reject) {
      TurboJSBridge.call('track', {
        data: opt
      }, function (res) {
        ret.code == 200 ? resolve(ret) : reject(ret)
      })
    })
  }
}
export default Native