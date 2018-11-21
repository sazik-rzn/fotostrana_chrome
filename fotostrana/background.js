$.get(chrome.extension.getURL('/photoland.js'),
        function (data) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = data;
            document.getElementsByTagName("head")[0].appendChild(script);
            document.getElementsByTagName("body")[0].setAttribute("onreset", "photoland.init();");
            document.getElementsByTagName("body")[0].dispatchEvent(new CustomEvent('reset'));
            document.getElementsByTagName("body")[0].removeAttribute('onreset');
            
        }
);

