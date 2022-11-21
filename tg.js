//<script>
(function () {
    //浏览器渲染后执行
    window.onload = function(){
        console.log('脚本加载')
    var htitle = document.getElementsByClassName("tl_article_header")//获取头部位置
    var h1title = document.getElementsByTagName('h1');
    var btnEle = document.createElement("button");
    var resetBtn = document.createElement('button');
    btnEle.innerText = "下载"
    resetBtn.innerText = '重置'
    htitle[0].appendChild(resetBtn);
    htitle[0].appendChild(btnEle)


    var imgList = document.getElementsByTagName("img");
    var hrefList = [];

    //获取所有的下载链接
    for(let i =0;i <imgList.length;i++)
    {
        hrefList[i] = imgList[i].src
    }
    //自增编号
    function setInterval(num) {
            var len = 3 //显示的长度，如果以0001则长度为4
            num = parseInt(num, 10) + 1//转数据类型，以十进制自增
            num = num.toString()//转为字符串
            while (num.length < len) {//当字符串长度小于设定长度时，在前面加0
                num = "0" + num
            }
            //如果字符串长度超过设定长度只做自增处理。
            return num
    }

    function pause(msec) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(resolve, msec || 1000);
        }
    );
    }
    //批量图片下载
    var j = 0;
    async function downFileAll(){
        console.log('开始下载');
        for(let i =j;i < hrefList.length;i++){
            j = i;
            var number = setInterval(i);
            var a = document.createElement('a');
            a.setAttribute('href',hrefList[i]);
            a.setAttribute('download',h1title[0].innerHTML+number);
            if(i != 0&&i % 10 ==0){
                await pause(1000)//谷歌批量下载一次十个任务
            }
            a.click();
        }
        if(++j == hrefList.length)
        {
            alert('下载完成');
        }


    }

    //重置
    function resetFun(){
        j = 0;

    }
    btnEle.onclick = downFileAll;
    resetBtn.onclick = resetFun;
    }
})();
