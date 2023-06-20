window.onload=function(){
    var top = document.getElementById('top');
    top.addEventListener("click", function() {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    });
}



// function top() {
//     window.scrollTo({
//         top:0,
//         behavior:"smooth"
//     })
// }