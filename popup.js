function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

window.onload = function(){
    document.getElementById("remove_copy_restriction").addEventListener("click",function(){
        sendMessageToContentScript({cmd:'rmCopyRes'}, function(response){
            console.log('来自content的回复：'+response);
        });
            console.log("already send msg");
        }
    );
     document.getElementById("remove_paste_restriction").addEventListener("click",function(){
        sendMessageToContentScript({cmd:'rmPasteRes'}, function(response){
            console.log('来自content的回复：'+response);
        });
            console.log("already send msg");
        }
    );
}