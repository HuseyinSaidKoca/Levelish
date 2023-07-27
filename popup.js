
var xhr = new XMLHttpRequest();
var url = "https://levelish-api.herokuapp.com/";
var video_url=""
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var error_style="padding-top: 10px ;font-family: Work Sans;font-style: bold;font-weight: 100; font-size:large;"
            var result_style="font-family: Work Sans;font-style: bold;font-weight: 100; font-size:3.5em; width: 75px;height: 75px; border-radius: 50%;color:white;"
            var results=document.getElementById('results');
            var info=document.getElementById('info');
            var image=document.getElementById('wheel');
            var prog_val=document.getElementById('prg_val');
            var prg=document.getElementById('prg');
            var diff_text=document.getElementById('diff_text');
            console.log(this.responseText)
            results.style.color="black";
            results.innerHTML=this.responseText
            info.innerHTML=""
            if(this.responseText=="The website is unavailable.") {
                results.innerHTML="The website is unavailable"
                info.innerHTML=""
                results.style=error_style;
                image.src ="images/broken.png"}
                
            else{
                
                if(this.responseText=="Subtitles are disabled for this video") {
                results.innerHTML="There is no English subtitles"
                results.style=error_style;
                image.src ="images/broken.png"
                info.innerHTML=""
                }
                else{
                results.style=result_style;
                var resp_arr=String(this.responseText).split(",")
                var resp=resp_arr[0]
                var prct=resp_arr[1]
                results.innerHTML=resp
                console.log(Math.round(prct))
                prct=Math.round(prct)
                switch(resp){
                    case "A1":
                        results.style.backgroundColor="red";
                        break;
                    case "A2":
                        results.style.backgroundColor="orange";
                        break;
                    case "B1":
                        results.style.backgroundColor="yellow";
                        break;
                    case "B2":
                        results.style.backgroundColor="green";
                        break;
                    case "C1":
                        results.style.backgroundColor="blue";
                        break;
                    case "C2":
                        results.style.backgroundColor="purple";
                        break;
                }
                info.innerHTML="(According to CEFR)"
                diff_text.innerHTML="Difficulty: %"+String(prct)
                image.style="width:13em;height:40%;padding-right:15px"
                image.src ="images/"+resp+".png"}
                prog_val.value=prct
                prg.style.display="block"
            }
            
            
            }
    }; 
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function 
(tabs) {
    video_url = tabs[0].url;
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = video_url.match(regExp);
    var video_id= (match&&match[7].length==11)? match[7] : false;
    if (video_id==false){
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if(!!pattern.test(video_url)){
        video_id=video_url
    }
    else{
        video_id=false
    }
    }
    var data = JSON.stringify({ "url": String(video_id) });
    xhr.send(data);
});

