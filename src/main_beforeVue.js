import _ from 'lodash'
// import './assets/style/style.css';
import './assets/style/main.scss';
import avatar from './assets/images/picture.jpg';
import './echarts.js';
// window.addEventListener('load',()=>{
//     var element = document.createElement('div');
//     var sayHello = require('./sayHello.js').sayHello;
//     var hello = sayHello('Yoyolee!');
//     var body = document.getElementsByTagName('body')[0];
//     body.innerHTML = hello;
// })

// mini-css-extract-plugin（分离css）
function component(){
    var element = document.createElement('div');
    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['sayHello111','webpack'],' ');
    element.classList.add('hello');
    var img = new Image();
    img.src = avatar;
    element.appendChild(img);
    return element;
}
document.body.appendChild(component());

// function createImg(){
//     var img = new Image();
//     img.src = avatar;
//     return img;
// }
// document.body.appendChild(createImg());

// document.querySelector('button').addEventListener('click',()=>{
//     alert('你好呀！，赶紧去洗澡早点睡吧');
// })

// 动态导入(按需加载chunks)
function getComponent(){
    return import('lodash').then(({ default:_})=>{
        const element = document.createElement('div');
        element.innerHTML = _.join(['hello','webpack5'],' ');
        return element;
    }).catch((error)=>"An error occurred while loading the component!");
}
const button = document.createElement('button');
button.innerHTML = 'click me';
button.onclick = ()=>{
    getComponent().then((component)=>{
        document.body.appendChild(component);
    });
};
document.body.appendChild(button);
// 开发环境获取全局变量
// console.log(process.env);