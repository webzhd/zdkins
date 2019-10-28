function restart() {
    setTimeout(() => {
        getList()
        restart()
    }, 5000)
}

restart()


let listData =[]

function getList() {
    fetch('/list', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()).then(res => {
        renderTable(res)
        listData = res
    })
}

getList()



const tbody = document.getElementById('list')

function renderTable(list) {
    tbody.innerHTML =  list.map((l, index) => {
            return `<tr>
                <td>${index}</td>
                <td>${l.name}</td>
                <td><a target="_blank" href="http://10.28.1.173:${l.port}">http://10.28.1.173:${l.port}</a></td>
                <td><span style="color: ${l.start ? '#5cb85c': '#d9534f'}">${l.start ? '已开启': '已关闭'}</span></td>
                <td>
                    <button type="button" class="btn btn-success" ${l.start ? 'disabled': ''} id="start_${index}">启动</button>

                    <button type="button" class="btn btn-danger" ${!l.start ? 'disabled': ''} id="close_${index}">关闭</button>
                    
                    <button type="button" class="btn btn-success" ${l.start ? 'disabled': ''} id="update_${index}">更新</button>
                </td>
                </tr>
            `
        }).join('')
}

tbody.addEventListener('click', buttonClickHandle)

function buttonClickHandle(e) {
    const target = e.target

    console.log(target.tagName)

    if('BUTTON' === target.tagName) {
        const id = target.id
        const arr = id.split('_')
        const state = arr[0]
        const index = arr[1]
        console.log(state, index)
        if(state === 'start') {
            if(listData[index].start){
                console.log('已开启')
                return
            }
        }
        if(state === 'close') {
            if(!listData[index].start){
                console.log('已关闭')
                return
            }
        }

        fetch('/command', {
            method: "POST",
            body: JSON.stringify({state, index}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json() ).then(res => {
            if(res === 1){
                getList()
                if(state === 'start'){
                    setTimeout(() => {
                        alert('在启动的路上了，等一分钟就行了')
                    }, 1000)
                }else if(state === 'update'){
                    alert('已更新')
                }
                
            }
        })
    }
}