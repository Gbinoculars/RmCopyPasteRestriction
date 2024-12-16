function emptyHandler(){
}

function for_element(parent){
    if(parent.children != undefined){
        for(var i = 0; parent.children[i] != undefined; i++){
            for_element(parent.children[i]);
        }
    }
}

function cutCopyEvent(){
        document.addEventListener("copy",function(event){
            event.stopPropagation();
        },true);
        document.addEventListener("contextmenu",function(event){
            event.stopPropagation();
        },true);
        document.addEventListener("keydown",function(event){
            event.stopPropagation();
        },true);
}

function cutPasteEvent(){
        document.addEventListener("keydown",function(event){
            event.stopPropagation();
        },true);
        document.addEventListener("paste",function(event){
            event.stopPropagation();
        },true);
}

function makeTextCanBeSelect(){
        var sty = document.createElement("style");
        var str = "*{ \
            -webkit-user-select: text !important; \
            user-select: text !important; \
        }";
        sty.innerHTML = str;
        document.head.appendChild(sty);
}

function receiveMsg(e,sender,sendResponse)
{
    console.log("start rm copy restriction")
    console.log(e.cmd);
    if(e.cmd === "rmCopyRes"){
        cutCopyEvent();
        makeTextCanBeSelect();
        //for_element(document.documentElement);
    }
    if(e.cmd === "rmPasteRes"){
        cutPasteEvent();
    }
}

window.onload = function(){
    chrome.runtime.onMessage.addListener(receiveMsg);
    let keysPressed = {}
    document.addEventListener('keydown', function(event) {
        keysPressed[event.key] = true;
        if (keysPressed['Control'] && keysPressed['Shift'] && keysPressed['C']){
            var text = window.getSelection(0).toString();
            navigator.clipboard.writeText(text);
        }
    });
}