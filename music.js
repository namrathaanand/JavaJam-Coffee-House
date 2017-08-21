// Put your Last.fm API key here
var api_key = "bce6cd75116ec689b777ba3cbaab5eff";

function initialize(){
    document.getElementById("form-input").value=gup('name');
}

function gup( name) {
    url = location.href;
    url= decodeURI( url )
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}


function sendRequest () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            //var str = JSON.stringify(json,undefined,2);
            var details = "<br><h3>Name: "+ json.artist.name + "</h3>" + "URL: <a href="+json.artist.url+ ">Find more about "+json.artist.name+" here.</a><br><br>" + "<img src="+ json.artist.image[2]['#text'] + "/>";
            var bio = json.artist.bio.content;
            var similar1 = "<br><br><h3> Artists Similar to "+json.artist.name+":</h3><br> Name:" + json.artist.similar.artist[0]['name'] +"<br> <a href="+json.artist.similar.artist[0]['url']+"> See artist details here</a>";
            var similar2 = "<br><br> Name:" + json.artist.similar.artist[1]['name'] +"<br> <a href="+json.artist.similar.artist[1]['url']+"> See artist details here</a>";
            var similar3 = "<br><br> Name:" + json.artist.similar.artist[2]['name'] +"<br> <a href="+json.artist.similar.artist[2]['url']+"> See artist details here</a>";
            document.getElementById("output").innerHTML = details +"<br><br><br>" + bio + similar1 + similar2 + similar3 +"<br><br>";
            
            sendRequest1();
        }
    };
    xhr.send(null);
}

function sendRequest1 () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getTopAlbums";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            //var str = JSON.stringify(json,undefined,2);
            var album1 = "<strong>Album Name - "+json.topalbums.album[0]['name'] + "<strong><br>" + "<img src="+ json.topalbums.album[0]['image'][1]['#text'] + "/>";
            var album2 = "<strong>Album Name - "+json.topalbums.album[1]['name'] + "<strong><br>" + "<img src="+ json.topalbums.album[1]['image'][1]['#text'] + "/>";
            var album3 = "<strong>Album Name - "+json.topalbums.album[2]['name'] + "<strong><br>" + "<img src="+ json.topalbums.album[2]['image'][1]['#text'] + "/>";
            
            document.getElementById("albums").innerHTML = "<br><br><h3>Top 3 albums of " +json.topalbums.album[0]['artist'].name + " are: </h3><br>" + album1 + "<br><br>"+ album2 +"<br><br>" + album3 +"<br><br>";
        }
    };
    xhr.send(null);
}
