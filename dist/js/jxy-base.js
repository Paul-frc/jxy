function debounce(e,t,n){var o;return function(){var n=this,r=arguments,a=function(){o=null,e.apply(n,r)};clearTimeout(o),o=setTimeout(a,t)}}function include(e,t,n){var o=window.innerWidth,r=e,a=e,c=0,i=0;for(n&&(i=n.length);c<i;)o>n[c]&&(a=r+"."+n[c]+".html"),c++;var s=document.querySelector("[jm-name="+t+"]");if(s.style.display="block",s.style.height="20px",s.hasAttribute("jm-lazy")){var u=s.getAttribute("jm-lazy")||100,d=window.innerHeight,l=s.getBoundingClientRect().top-d-u;window.addEventListener("scroll",function f(e){if(l=s.getBoundingClientRect().top-d-u,l<=0){window.removeEventListener("scroll",f);var t=new XMLHttpRequest;t.onreadystatechange=function(){4==t.readyState&&200==t.status&&(console.log("wicked and i'm lazy"),bob(s,t.responseText,a))},t.open("GET",a,!0),t.send()}})}else{var p=new XMLHttpRequest;p.onreadystatechange=function(){4==p.readyState&&200==p.status&&(console.log("not lazy"),bob(s,p.responseText,a))},p.open("GET",a,!0),p.send()}}function bob(e,t,n){if(console.log("bob called"),e.hasAttribute("jm-data")){console.log("has a jm-data thingy");var o=e.getAttribute("jm-data"),r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState&&200==r.status){var n=doT.template(t);t=n(JSON.parse(r.responseText)),e.outerHTML=t,debounceClassName()}},r.open("GET",o,!0),r.send()}else console.log("doesn't have a jm-data thingy33"),e.outerHTML=t,debounceClassName()}function fullReplace(e){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){document.documentElement.innerHTML=t.responseText;var e=document.querySelectorAll("script:not([src$='jxy.js']):not([src$='jxy.min.js'])");e.forEach(function(e){var t=document.createElement("SCRIPT");t.innerHTML=e.innerHTML,e.hasAttribute("src")&&t.setAttribute("src",e.getAttribute("src")),document.head.appendChild(t)})}},t.open("GET",e,!0),t.send()}!function(){"use strict";function e(t,n,o){return("string"==typeof n?n:n.toString()).replace(t.define||a,function(e,n,r,a){return 0===n.indexOf("def.")&&(n=n.substring(4)),n in o||(":"===r?(t.defineParams&&a.replace(t.defineParams,function(e,t,r){o[n]={arg:t,text:r}}),n in o||(o[n]=a)):new Function("def","def['"+n+"']="+a)(o)),""}).replace(t.use||a,function(n,r){t.useParams&&(r=r.replace(t.useParams,function(e,t,n,r){if(o[n]&&o[n].arg&&r){var a=(n+":"+r).replace(/'|\\/g,"_");return o.__exp=o.__exp||{},o.__exp[a]=o[n].text.replace(new RegExp("(^|[^\\w$])"+o[n].arg+"([^\\w$])","g"),"$1"+r+"$2"),t+"def.__exp['"+a+"']"}}));var a=new Function("def","return "+r)(o);return a?e(t,a,o):a})}function t(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var n,o={name:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};o.encodeHTMLSource=function(e){var t={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},n=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(n,function(e){return t[e]||e}):""}},n=function(){return this||(0,eval)("this")}(),"undefined"!=typeof module&&module.exports?module.exports=o:"function"==typeof define&&define.amd?define(function(){return o}):n.doT=o;var r={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},a=/$^/;o.template=function(c,i,s){i=i||o.templateSettings;var u,d,l=i.append?r.append:r.split,p=0,f=i.use||i.define?e(i,c,s||{}):c;f=("var out='"+(i.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(i.interpolate||a,function(e,n){return l.start+t(n)+l.end}).replace(i.encode||a,function(e,n){return u=!0,l.startencode+t(n)+l.end}).replace(i.conditional||a,function(e,n,o){return n?o?"';}else if("+t(o)+"){out+='":"';}else{out+='":o?"';if("+t(o)+"){out+='":"';}out+='"}).replace(i.iterate||a,function(e,n,o,r){return n?(p+=1,d=r||"i"+p,n=t(n),"';var arr"+p+"="+n+";if(arr"+p+"){var "+o+","+d+"=-1,l"+p+"=arr"+p+".length-1;while("+d+"<l"+p+"){"+o+"=arr"+p+"["+d+"+=1];out+='"):"';} } out+='"}).replace(i.evaluate||a,function(e,n){return"';"+t(n)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),u&&(i.selfcontained||!n||n._encodeHTML||(n._encodeHTML=o.encodeHTMLSource(i.doNotSkipEncoded)),f="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+o.encodeHTMLSource.toString()+"("+(i.doNotSkipEncoded||"")+"));"+f);try{return new Function(i.varname,f)}catch(m){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),m}},o.compile=function(e,t){return o.template(e,null,t)}}();var debounceClassName=debounce(function(){document.documentElement.classList.add("loaded")},100);window.addEventListener("click",function(e){e.preventDefault(),e=e||window.event;var t=e.target||e.srcElement;if(t.href){document.documentElement.classList.remove("loaded"),document.documentElement.classList.add("loading");var n=t.href;fullReplace(n),history.pushState(null,null,t.href)}}),window.addEventListener("popstate",function(e){document.documentElement.classList.remove("loaded"),document.documentElement.classList.add("loading"),fullReplace(window.location.href)});