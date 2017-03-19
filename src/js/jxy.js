// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

var debounceClassName = debounce(function() {
  document.documentElement.classList.add("loaded");
}, 100);

function include(theUrl, target, arr) {
    var wW = window.innerWidth;
    var _url = theUrl;
    var url = theUrl;
    var i = 0;
    var j = 0;
    if (arr) {
        j = arr.length;
    }
    while (i < j) {
        if (wW > arr[i]) {
            url = _url + "." + arr[i] + ".html";
        }
        i++;
    }
    var _target = document.getElementById(target);

    _target.style.display = "block";
    _target.style.height = "20px";

    if(_target.hasAttribute("jm-lazy")){
        var offset = _target.getAttribute("jm-lazy") || 100;
        var wH = window.innerHeight;
        var ps = _target.getBoundingClientRect().top - wH - offset;
        console.log([_target.id, ps]);
        window.addEventListener("scroll", function vvv(e){
            ps = _target.getBoundingClientRect().top - wH - offset;
            console.log(ps);
            if(ps <= 0){
                window.removeEventListener("scroll", vvv);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        bob(_target, xmlhttp.responseText, url);
                    }
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
        })
    }else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                bob(_target, xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

function bob(outer, res, lru){
    var scripts = document.querySelectorAll("script:not(.accounted)");
    scripts.forEach(function(element) {
        element.classList.add('accounted');
    });

    outer.outerHTML = res;

    var addScripts = document.querySelectorAll("script:not(.accounted)");
    addScripts.forEach(function(element) {
        var newScript = document.createElement("SCRIPT");
        newScript.innerHTML = element.innerHTML;
        if(element.hasAttribute("src")){
            newScript.setAttribute("src", element.getAttribute("src"));
        }
        newScript.setAttribute("data-jxy-injected-script-from", lru);
        document.head.appendChild(newScript);
    });
    debounceClassName();
}

function fullReplace(theUrl) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.documentElement.innerHTML = xmlhttp.responseText;
            var addScripts = document.querySelectorAll("script:not([src$='jxy.js']):not([src$='jxy.min.js'])");
            addScripts.forEach(function(element) {
                var newScript = document.createElement("SCRIPT");
                newScript.innerHTML = element.innerHTML;
                if(element.hasAttribute("src")){
                    newScript.setAttribute("src", element.getAttribute("src"));
                }
                document.head.appendChild(newScript);
            });
        }
    }
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.send();
}


window.addEventListener("click", function(e) {
    e.preventDefault();
    e = e || window.event;
    var targ = e.target || e.srcElement;
    if(targ.href) {
        document.documentElement.classList.remove("loaded");
        document.documentElement.classList.add("loading");
        var page = targ.href;
        fullReplace(page);
        history.pushState(null, null, targ.href);
    }
});

// turned off reload-on-resize for now

// function debouncedResize(a,b){
// return window.addEventListener("resize",function(){
//   clearTimeout(b),
//   b = setTimeout(a,250)
// }),a
// }
// debouncedResize(function(){
//     // TODO
//     // fullreplace only if a breakpoint is crossed
//     fullReplace(window.location.href);
// });


// back/forward button functionality

window.addEventListener("popstate", function(e) {
    document.documentElement.classList.remove("loaded");
    document.documentElement.classList.add("loading");
    fullReplace(window.location.href);
});
