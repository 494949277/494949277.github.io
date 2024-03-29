// 计时器函数
function animate(obj, target, callback) {
    //先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //步长值写到定时器里面
        //把我们步长值改为整数，不要出现小数的问题    
        var step = (target - obj.offsetLeft) / 10;
        //如果向右走就向上取整，向左走就向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //回调函数写到定时器结束里面
            if (callback) {
                callback();//调用函数
            }
        }
        else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 10);
}



window.addEventListener('load', function () {
    // 1. 获取元素
    var left = document.querySelector('.lbt_left');
    var right = document.querySelector('.lbt_right');
    var box = document.querySelector('.lbt');
    var circle = document.querySelector('.circle');
    var img = document.querySelector('.lbt_img');
    var focus = box.offsetWidth;
    var num = 0;
    box.addEventListener('mouseenter', function () {
        // 2. 鼠标经过focus 就显示隐藏左右按钮
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer = null;// 清除定时器变量
    })
    box.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function () {
            right.click();//手动调用点击事件
        }, 2000)
    })
    // 3. 动态生成小圆圈  有几张图片，就生成几个小圆圈
    for (var i = 0; i < img.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        circle.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            animate(img, -index * focus);
        })

    }
    // 把ol里面的第一个小li设置类名为 current
    circle.children[0].className = 'current';
    // 6. 克隆第一张图片(li)放到ul 最后面
    var first = img.children[0].cloneNode(true);
    img.appendChild(first);
    var flag = true;//节流阀(防止轮播图点击速度过快）
    // 7. 点击右侧按钮， 图片滚动一张
    right.addEventListener('click', function () {
        if (flag) {
            flag = false;
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == img.children.length - 1) {
                img.style.left = 0;
                num = 0;
            }
            num++;
            animate(img, -num * focus, function () {
                flag = true;
            });
            if (num == img.children.length - 1) {
                circle.children[0].className = 'current';
            }
            else {
                circle.children[num].className = 'current';
            }


        }
    });
    // 9. 左侧按钮做法
    left.addEventListener('click', function () {
        if (flag) {
            flag = false;
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            if (num == 0) {
                num = img.children.length - 1;
                img.style.left = -num * focus + 'px';
            }
            num--;
            animate(img, -num * focus, function () {
                flag = true;
            });
            circle.children[num].className = 'current';
        }
    });
    // 10. 自动播放轮播图
    var timer = setInterval(function () {
        right.click();
    }, 1500)
});