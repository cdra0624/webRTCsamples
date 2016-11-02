navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
var localStream;
var connectedCall;
 
var peer = new Peer({ key: 'px6645j12izilik9', debug: 3});

window.onload = function(){
    displayMyCamera();
    getMyID();
}

function getMyID() {
    peer.on('open', function(){
        document.getElementById("my-id").innerHTML = peer.id;
    });
}

//take calling from other peer
peer.on('call', function(call){
    connectedCall = call;
        $("#peer-id").text(call.peer);
    call.answer(localStream);
 
    call.on('stream', function(stream){
        var url = URL.createObjectURL(stream);
        $('#peer-video').prop('src', url);
    });
});
 

function displayMyCamera(){
    navigator.getUserMedia({audio: true, video: true}, function(stream){
        localStream = stream;
        document.getElementById("my-video").src = URL.createObjectURL(stream);
    }, function() { alert("Error!"); });
}

function call-start(){
    var peer_id = document.getElementById("peer-id-input").value;
    var call = peer.call(peer_id, localStream);
    call.on('stream', function(stream){
        document.getElementById("PeerID").innerHTML = peer_id;
        var url = URL.createObjectURL(stream);
        document.getElementById("peer-video").src = url;
    });
}

function call-end() {
    connectedCall.close();
}