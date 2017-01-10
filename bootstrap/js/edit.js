
var desc = document.getElementById("description");
var addchangedesc = function(e){
    desc.addEventListener('click', change);
}
var revdesc = function(e) {
    console.log('?');
    var newdesc = document.getElementById("descentry").value;
    desc.innerHTML = newdesc;
    setTimeout(addchangedesc,1);
    
};

var change = function(e) {
    
    desc.innerHTML = '<textarea rows="4" cols="50" id="descentry">' + desc.innerHTML + '</textarea><br><button id = "subdesc" > Submit </button><br>';
    var sub = document.getElementById("subdesc");
    desc.removeEventListener('click', change);
    sub.addEventListener('click', revdesc);
    
};

desc.addEventListener('click', change);

