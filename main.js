window.jQuery = function () {}
window.jQuery.ajax = function (options) {
    let url
    if (arguments.length === 1) {
        url = options.url
    }else if(arguments.length === 2) {
        url = arguments[0]
        options = arguments[1]
    }

    let method = options.method
    let headers = options.headers
    let body = options.body
    let failFn = options.failFn
   
    
    let request = new XMLHttpRequest()
    request.open(method,url)
    for(let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () =>{
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                sucessFn.call(undefined,request.responseText)
            }else if(request.status >= 400){
                failFn.call(undefined,request)
            }
        }
    }
    request.send(body)
}
window.jQuery.ajax({
    url: 'http://example.com',
    method:'get',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
    },
    successFn: (result)=>{
        console.log(result);  
    },
    failFn: (request) => {
        console.log(request);     
    }
})