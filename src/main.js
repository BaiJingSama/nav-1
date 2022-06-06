const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const storageKey = localStorage.getItem('key')
const storageKeyObject = JSON.parse(storageKey) //把字符串重新变成对象
const hashMap = storageKeyObject || [{
    logo: 'A',
    logoType: 'text',
    url: 'https://www.acfun.cn'
}, {
    logo: 'B',
    logoType: 'image',
    url: 'https://bilibili.com'
}, {
    logo: 'M',
    logoType: 'text',
    url: 'https://developer.mozilla.org/zh-CN/'
}, {
    logo: 'W',
    logoType: 'text',
    url: 'https://www.w3school.com.cn/jsref/index.asp'
}, {
    logo: 'C',
    logoType: 'text',
    url: 'https://www.csdn.net/'
}, {
    logo: 'G',
    logoType: 'text',
    url: 'https://google.com'
}, {
    logo: 'Z',
    logoType: 'text',
    url: 'https://www.zhihu.com/'
}, {
    logo: 'J',
    logoType: 'text',
    url: 'https://juejin.cn/'
}, {
    logo: 'I',
    logoType: 'text',
    url: 'https://www.iciba.com/'
}, {
    logo: 'G',
    logoType: 'text',
    url: 'https://github.com/'
}] // 把页面的内容存在一个数组内 然后把数组存在本地存储里

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/ 开头的内容
        .replace('developer.mozilla.org', 'MDN官网')
        .replace('com.cn', 'com')
} //字符串删除替换API

const render = () => {
    $siteList.find('li:not(.last)').remove() //不找最后一个li
    hashMap.forEach((node, index) => {

        const $li = $(`<li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Close"></use>
              </svg>
            </div>
          </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url, '_self') //代替a标签 打开地址，且不打开新窗口
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            if (confirm("确定要删除这个标签吗？")) {
                hashMap.splice(index, 1)
                const string = JSON.stringify(hashMap) //把当前hashMap再转化成字符串
                localStorage.removeItem('key', string) //先删除
                localStorage.setItem('key', string) //再保存一次
                render() //重新渲染
            } else {
                return;
            }

        })

    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥?')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url).toUpperCase()[0], // 把新添加的网址简化后的第一个字母加大写变成logo
        logoType: 'text',
        url: url
    })
    const string = JSON.stringify(hashMap)
    localStorage.setItem('key', string) // 改进一下 每次用户点击都保存一次
    render()

})

// window.onbeforeunload = () => { // 关闭页面的API
//     const string = JSON.stringify(hashMap) //把数组转化为字符串
//     localStorage.setItem('key', string) //在本地的存储里面 设置一个key 它的值是string
// }

$(document).on('keypress', (e) => {
    // const key = e.key;
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url, '_self')
        }
    }

})
const $input = $(".input")
$input.on('keypress', (e) => {
    e.stopPropagation()
})