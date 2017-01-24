var imgcount = 9;
//description editing
var desc = document.getElementById("editdesc");
var description = document.getElementById("description");

var revdesc = function(e) {
    console.log('oops');
    var newdesc = document.getElementById("descentry").value;
    description.innerHTML = newdesc;
    
};

var change = function(e) {
    console.log('??');
    description.innerHTML = '<textarea rows="4" cols="50" id="descentry">' + description.innerHTML + '</textarea><br><button id = "subdesc" > done editing </button><br>';
    var sub = document.getElementById("subdesc");
    sub.addEventListener('click', revdesc);
    
};

desc.addEventListener('click', change);

//Description removal
var remdesc = document.getElementById("remdesc");

var rem = function(e) {
    description.parentElement.removeChild(description)
};

remdesc.addEventListener('click', rem);


//adding description
var adddesc = document.getElementById("adddesc");
var descholder = document.getElementById("descholder");
var descchild = document.createElement('p');
descchild.setAttribute('id', 'description');
descchild.innerHTML = 'Place a brief description of what your company does here. Lorem ipsu dolor sit amet, consectetur adipiscing elit.';
var add = function(e){
    console.log('hesh');
    descholder.appendChild(descchild);
    description = document.getElementById("description");

};

adddesc.addEventListener('click', add);

//adding photo bloks
var addPhotoBlock = function(e){

    var itm = document.getElementsByClassName("box")[0];
    var cln = itm.cloneNode(true);
    document.getElementById("boxholder").insertBefore(cln, document.getElementById("photobutton"));
    
};


var addphto = document.getElementById('addphto');
addphto.addEventListener('click', addPhotoBlock);
console.log('okay');
//remove phtoblock
var rmphto = function(e){
    this.parentElement.parentElement.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement.parentElement);//I'm so sorry
};
//remove event listeners
var i;
var removebuttons = document.getElementsByClassName("remphto");
for (i = 0; i < removebuttons.length; i++){
    removebuttons[i].addEventListener('click', rmphto);
};


//remove event listenre

var edphdesc = function(e){
    console.log("test");
    var phdesc = prompt("Enter an image description", this.innerHTML);
    if(phdesc != null){
	this.innerHTML = phdesc;
    }
};
var i;
var removebuttons = document.getElementsByClassName("remphto");
for (i = 0; i < removebuttons.length; i++){
    removebuttons[i].addEventListener('click', rmphto);
};

var addphto = document.getElementById('addphto');
addphto.addEventListener('click', addPhotoBlock);
console.log('okay');
var imdescs = document.getElementsByClassName("imdesc");
i = 0;
console.log(imdescs);
for(i; i<imdescs.length; i++){
    imdescs[i].addEventListener('click', edphdesc);
};

//upload!

var uploads = document.getElementsByClassName("uphto");
i = 0;
for(i; i<uploads.length; i++){
    uploads[i].addEventListener('click', uplphto);
}
var stop = function(e){
    event.preventDefault();
}
var uplphto = function(e){
    var form = this.getParentElement();
    var file_selector = this.getParentElement.getElementsByClassName("form-control")[0];
    var form_submit = this;
    form.onsubmit = stop 
    
}; 

$("button#save").click(function() {
    var data = {};
    var html_info = document.getElementsByTagName("html")[0].innerHTML;
    var title = document.title;
    data.templatehtml = html_info;
    data.title = title;
    $.ajax({
	type: "POST",
	url: "/save/",
	contentType: "application/json",
	data: JSON.stringify(data),
	success: function(data){
	    alert("Your site was successfully saved")
	},
	error: function(data){
	    console.log("failure")
	}
    });/*
         window.location.href= 'home/' + name;
       */
});
$("button#publish").click(function(e) {
    var data = {};
    var html_info = document.getElementsByTagName("html")[0].innerHTML;
    var title = document.title;
    data.templatehtml = html_info;
    data.title = title;
    $.ajax({
 	type: "POST",
	url: "/publish/",
	contentType: "application/json",
	data: JSON.stringify(data),
	success: function(data){
	    alert("Your site was successfully published")
	},
	error: function(data){
	    console.log("failure")
	}
    });/*
         window.location.href= 'home/' + name;
       */
});
