
window.onload = function () {
    var zan = document.getElementById('zan');
    var dianzan = document.getElementById('dianzan');
    var num = document.getElementById('num');

    var flag = 0;

    dianzan.addEventListener('click', function () {
        if (flag == 0) {
            this.nextElementSibling.innerHTML++;
            dianzan.setAttribute('src', "../image/点赞后.svg");
        }
        if (flag == 1) {
            this.nextElementSibling.innerHTML--;
            dianzan.src = "../image/点赞.svg";
        }
        if (flag == 2) {
            this.nextElementSibling.innerHTML++;
            dianzan.src = "../image/点赞后.svg";
            flag = 0;
        }
        flag++;
    });
}
