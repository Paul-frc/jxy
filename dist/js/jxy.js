function debounce(e,t,n){var c;return function(){var o=this,r=arguments,a=function(){c=null,n||e.apply(o,r)},d=n&&!c;clearTimeout(c),c=setTimeout(a,t),d&&e.apply(o,r)}}function include(e,t,n){var c=window.innerWidth,o=e,r=e,a=0,d=0;for(n&&(d=n.length);a<d;)c>n[a]&&(r=o+"."+n[a]+".html"),a++;var u=document.getElementById(t),i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&200==i.status){var e=document.querySelectorAll("script:not(.accounted)");e.forEach(function(e){e.classList.add("accounted")}),u.outerHTML=i.responseText;var t=document.querySelectorAll("script:not(.accounted)");t.forEach(function(e){var t=document.createElement("SCRIPT");t.innerHTML=e.innerHTML,e.hasAttribute("src")&&t.setAttribute("src",e.getAttribute("src")),t.setAttribute("data-jxy-injected-script-from",r),document.head.appendChild(t)}),debounceClassName()}},i.open("GET",r,!0),i.send()}function fullReplace(e){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){document.documentElement.innerHTML=t.responseText;var e=document.querySelectorAll("script:not([src$='jxy.js'])");e.forEach(function(e){var t=document.createElement("SCRIPT");t.innerHTML=e.innerHTML,e.hasAttribute("src")&&t.setAttribute("src",e.getAttribute("src")),document.head.appendChild(t)})}},t.open("GET",e,!0),t.send()}function debouncedResize(e,t){return window.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(e,250)}),e}var debounceClassName=debounce(function(){document.documentElement.classList.add("loaded")},100);window.addEventListener("click",function(e){e.preventDefault(),e=e||window.event;var t=e.target||e.srcElement;if(t.href){document.documentElement.classList.remove("loaded"),document.documentElement.classList.add("loading");var n=t.href;fullReplace(n),history.pushState(null,null,t.href)}}),debouncedResize(function(){fullReplace(window.location.href)}),window.addEventListener("popstate",function(e){document.documentElement.classList.remove("loaded"),document.documentElement.classList.add("loading"),fullReplace(window.location.href)});