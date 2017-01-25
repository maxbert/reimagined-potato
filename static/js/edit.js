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
var rmphto = function(e){
    this.parentElement.parentElement.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement.parentElement);//I'm so sorry
};
//adding photo bloks
var addPhotoBlock = function(e){

    var itm = document.getElementById("collection").getElementsByClassName("box")[0];
    var cln = itm.cloneNode(true);
    document.getElementById("boxholder").insertBefore(cln, document.getElementById("photobutton"));    
    var removebuttons = document.getElementsByClassName("remphto");
    for (i = 0; i < removebuttons.length; i++){
	removebuttons[i].addEventListener('click', rmphto);
    };

};


var addphto = document.getElementById('addphto');
addphto.addEventListener('click', addPhotoBlock);
console.log('okay');
//remove phtoblock

//remove event listeners
var i;
var removebuttons = document.getElementsByClassName("remphto");
for (i = 0; i < removebuttons.length; i++){
    removebuttons[i].addEventListener('click', rmphto);
};


//remove event listenre

var edphdesc = function(e){
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


var uplgo = function(e){
    console.log('help');
    var img = this.parentElement.parentElement.parentElement.getElementsByTagName("img")[0];
    var form = this.parentElement;
    var file_selector = this.parentElement.getElementsByClassName("form-control")[0];
    var form_submit = this;
    var sub = function(event){
	console.log(event);
	event.preventDefault();
	
	if(file_selector.files.length == 0){
	    alert("please choose an image with the file selector");
	    return false;
	};
	var files = file_selector.files;
	var formData = new FormData();
	var file = files[0];
	var today = new Date();
	var now = today.getMinutes();
	var now2 = today.getSeconds();
	var now3 = today.getDay();
	var ne = now + now2 + now3;
	var filename = ne + file.name
	if(!file.type.match('image.*')){
	    alert("please upload a valid image file");
	    return false;
	};
	form_submit.innerHTML = 'uploading...';
	formData.append('photo', file, filename);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/s/', true);
	xhr.send(formData);
	img.src = "/static/images/" + filename;
	form_submit.innerHTML = 'Upload File'
    };
    form.onsubmit = sub(event);
};

var uplogo = document.getElementsByClassName("uplgo")[0];
uplogo.addEventListener('click', uplgo);
var uplphto = function(e){
    console.log('help');
    var img = this.parentElement.parentElement.parentElement.parentElement.getElementsByTagName("img")[0];
    var form = this.parentElement;
    var file_selector = this.parentElement.getElementsByClassName("form-control")[0];
    var form_submit = this;
    var sub = function(event){
	console.log(event);
	event.preventDefault();
	if(file_selector.files.length == 0){
	    alert("please choose an image with the file selector");
	    return false;
	};
	var files = file_selector.files;
	var formData = new FormData();
	var file = files[0];
	var today = new Date();
	var now = today.getMinutes();
	var now2 = today.getSeconds();
	var now3 = today.getDay();
	var ne = now + now2 + now3;
	var filename = ne + file.name
	if(!file.type.match('image.*')){
	    alert("please upload a valid image file");
	    return false;
	};
	form_submit.innerHTML = 'uploading...';
	formData.append('photo', file, filename);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/s/', true);
	xhr.send(formData);
	img.src = "/static/images/" + filename;
	form_submit.innerHTML = 'Upload File'
    };
    form.onsubmit = sub(event);
};
var assignPhotoUploadButtons= function(e){
    var uploads = document.getElementsByClassName("uphto");
    i = 0;
    for(i; i<uploads.length; i++){
	uploads[i].addEventListener('click', uplphto);
    };
};
assignPhotoUploadButtons();

var strip = function(e){
    var strips = document.getElementsByClassName("strip");
    var i =strips.length;
    document.getElementById("squarespace").style.display = 'block';
    while(document.getElementsByClassName("strip")[0] != null){
	var strip = document.getElementsByClassName("strip")[0];
	strip.parentNode.removeChild(strip);
	i--;
    }
}



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
    var title = document.title
    var html_edit = document.getElementsByTagName("html")[0].innerHTML;
    strip();
    var html_publish = document.getElementsByTagName("html")[0].innerHTML;
    data.edit_html = html_edit
    data.publish_html = html_publish
    data.title = title;
    $.ajax({
	type: "POST",
	url: "/publish/",
	contentType: "application/json",
	data: JSON.stringify(data),
	success: function(data){
	    alert("Your site was successfully published")
	    window.location.href = '../../viewmypages/'
	},
	error: function(data){
	    console.log("failure")
	}
    });/*
         window.location.href= 'home/' + name;
       */
});
