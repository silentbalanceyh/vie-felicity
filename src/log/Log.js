import Ajax from './Log.Ajax'
import React from './Log.React'

export default {
    sign : Ajax.sign,
    request : Ajax.request,
    response : Ajax.response,
    // React组件专用属性日志器
    control : React.control,
    container : React.container,
    components : React.components,
    form : React.form,
    stateless : React.stateless,
    hoc : React.hoc,
    reuse : React.reuse
}
