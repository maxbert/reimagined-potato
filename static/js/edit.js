var refreshNavBar = function(e){
    var divs = document.getElementsByClassName("subpage");
    var navbar = document.getElementById("navlist");
    while(navbar.hasChildNodes()){
	navbar.removeChild(navbar.lastChild);
    };
    var newlist = [];
    var i = 0;
    for(i; i<divs.length -1; i++){
	var el = document.createElement('li');
	el.setAttribute('class', 'nav-element');
	var lin = document.createElement('a');
	lin.setAttribute('href', '#' + divs[i].id);
	var link = document.createTextNode(divs[i].id);
	lin.appendChild(link);
	el.appendChild(lin);
	navbar.appendChild(el);
    };
	
};

refreshNavBar();




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
	img.src = "../../static/images/" + filename;
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

///ABOUT SECTION

var removeperson = function(e){
    this.parentElement.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement);
};
i = 0;
var removes = document.getElementsByClassName("remper");
for (i= 0; i < removes.length; i++){
    removes[i].addEventListener('click', removeperson);
};

var contname = function(e){
    var phdesc = prompt("Enter a name", this.parentElement.parentElement.getElementsByClassName("pName")[0].innerHTML);
    if(phdesc != null){
	this.parentElement.parentElement.getElementsByClassName("pName")[0].innerHTML = phdesc;
    };
};

var names = document.getElementsByClassName("contnameedit");
i = 0;
for(i; i< names.length; i++){
    names[i].addEventListener('click', contname);
};

var aboutdesc = function(e){
    console.log("chanign fields");
    var field = document.createElement("textarea");
    field.setAttribute("rows","10");
    field.setAttribute("cols", "30");
    var newdesc = document.createTextNode(this.parentElement.parentElement.getElementsByClassName("pDescription")[0].innerHTML);
    field.appendChild(newdesc);
    var subdesc2 = document.createElement("button");
    var subtext = document.createTextNode("done editing");
    subdesc2.appendChild(subtext);
    console.log(this.parentElement.parentElement.getElementsByClassName("pDescription")[0]);
    this.parentElement.parentElement.replaceChild(field, this.parentElement.parentElement.parentElement.getElementsByClassName("pDescription")[0]);
    console.log(this.parentElement.parentElement.getElementsByClassName('strip')[2])
    this.parentElement.parentElement.insertBefore(subdesc2,this.parentElement.parentElement.getElementsByClassName('strip')[2]);
    var setdesc = function(e){
	console.log(field.value);
	var description2 = document.createTextNode(field.value);
	var descrip = document.createElement("div");
	descrip.setAttribute("class","pDescription");
	descrip.appendChild(description2);
	this.parentElement.replaceChild(descrip, field);
	this.parentElement.removeChild(this);
    }
    subdesc2.addEventListener('click',setdesc);
};

var eddescs = document.getElementsByClassName("condescedit");
i = 0;
for(i; i< eddescs.length; i++){
    console.log(eddescs[i]);
    eddescs[i].addEventListener('click', aboutdesc);
};

//CONTACT
var contactedit = function(e){
    var field = document.createElement("textarea");
    field.setAttribute("rows","10");
    field.setAttribute("cols", "30");
    var newdesc = document.createTextNode(this.parentElement.parentElement.getElementsByClassName("contactinfo")[0].innerHTML);
    field.appendChild(newdesc);
    var subdesc2 = document.createElement("button");
    var subtext = document.createTextNode("done editing");
    subdesc2.appendChild(subtext);
    console.log(this.parentElement.parentElement.getElementsByClassName("contactinfo")[0]);
    this.parentElement.parentElement.replaceChild(field, this.parentElement.parentElement.parentElement.getElementsByClassName("contactinfo")[0]);
    this.parentElement.parentElement.insertBefore(subdesc2,this.parentElement.parentElement.getElementsByClassName('strip')[1]);
    var setdesc = function(e){
	console.log(field.value);
	var description2 = document.createTextNode(field.value);
	var descrip = document.createElement("p");
	descrip.setAttribute("class","contactinfo");
	descrip.setAttribute("style", "white-space:pre;");
	descrip.appendChild(description2);
	this.parentElement.replaceChild(descrip, field);
	this.parentElement.removeChild(this);
    }
    subdesc2.addEventListener('click',setdesc);
};

document.getElementsByClassName("edcon")[0].addEventListener("click", contactedit);
//SUBPAGE HANDLERS

var remsubpage = function(e){
    this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    refreshNavBar();
};

var changenamesub = function(e){
    var name = prompt("Enter a name");
    if(name != null){
	this.parentElement.parentElement.getElementsByClassName("sptitle")[0].innerHTML = name;
	this.parentElement.parentElement.setAttribute("id",name);
	refreshNavBar();
    };
};

var addsubpage = function(e){
    var itm = document.getElementById("collection").getElementsByClassName("subpage")[0];
    var cln = itm.cloneNode(true);
    this.parentElement.parentElement.insertBefore(cln, this.parentElement);
    i = 0;
    
    var removesubs = document.getElementsByClassName("rmsec");
    for(i; i<removesubs.length; i++){
	removesubs[i].addEventListener("click",remsubpage);
    };
    i = 0;
    var edsubs = document.getElementsByClassName("editsec");
    for(i; i<edsubs.length; i++){
	edsubs[i].addEventListener("click",changenamesub);
    };
    refreshNavBar();

};

i = 0;
var removesubs = document.getElementsByClassName("rmsec");
for(i; i<removesubs.length; i++){
    removesubs[i].addEventListener("click",remsubpage);
};
i = 0;
var edsubs = document.getElementsByClassName("editsec");
for(i; i<edsubs.length; i++){
    edsubs[i].addEventListener("click",changenamesub);
};

i = 0;
var addsubs = document.getElementsByClassName("addsub");
for(i; i<addsubs.length; i++){
    addsubs[i].addEventListener("click",addsubpage);
};


    
var addperson = function(e){
    var itm = document.getElementById("collection").getElementsByClassName("box2")[0];
    var cln = itm.cloneNode(true);
    console.log(document.getElementById("about").getElementsByClassName('box2')[0]);
    this.parentElement.parentElement.parentElement.parentElement.insertBefore(cln, this.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("spacer")[1]);//,document.getElementById("about").getElementsByClassName('box2')[1]);
    i = 0;
    var removes = document.getElementsByClassName("remper");
    for (i= 0; i < removes.length; i++){
	removes[i].addEventListener('click', removeperson);
    };
    var uploads = document.getElementsByClassName("uphto");
    i = 0;
    for(i; i<uploads.length; i++){
	uploads[i].addEventListener('click', uplphto);
    };
    var names = document.getElementsByClassName("contnameedit");
    i = 0;
    for(i; i< names.length; i++){
	names[i].addEventListener('click', contname);
    };
    var eddescs = document.getElementsByClassName("condescedit");
    i = 0;
    for(i; i< eddescs.length; i++){
	console.log(eddescs[i]);
	eddescs[i].addEventListener('click', aboutdesc);
    };
};

document.getElementById("addperson").addEventListener('click', addperson);
//adding photo bloks
var addPhotoBlock = function(e){

    var itm = document.getElementById("collection").getElementsByClassName("box")[0];
    var cln = itm.cloneNode(true);
    document.getElementById("boxholder").insertBefore(cln, document.getElementById("photobutton"));    
    var removebuttons = document.getElementsByClassName("remphto");
    for (i = 0; i < removebuttons.length; i++){
	removebuttons[i].addEventListener('click', rmphto);
    };
     var uploads = document.getElementsByClassName("uphto");
    i = 0;
    for(i; i<uploads.length; i++){
	uploads[i].addEventListener('click', uplphto);
    };
    var imdescs = document.getElementsByClassName("imdescedit");
    i = 0;
    for(i; i<imdescs.length; i++){
	imdescs[i].addEventListener('click', edphdesc);
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
    var phdesc = prompt("Enter an image description", this.parentElement.parentElement.getElementsByTagName("p")[0].innerHTML);
    if(phdesc != null){
	this.parentElement.parentElement.getElementsByTagName("p")[0].innerHTML = phdesc;
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
var imdescs = document.getElementsByClassName("imdescedit");
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
	img.src = "../../static/images/" + filename;
	form_submit.innerHTML = 'Upload File'
    };
    form.onsubmit = sub(event);
};

var uplogo = document.getElementsByClassName("uplgo")[0];
uplogo.addEventListener('click', uplgo);

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

var setbg = function(e){
    var background = document.getElementsByTagName("body")[0];
    var nav = document.getElementsByTagName("nav")[0];
    var color = this.parentElement.getElementsByTagName("input")[0].value;
    background.style = "background-color: #" + color;
    //nav.setAttribute("style","background-color: #" + color);
    console.log('color');
};
var back = document.getElementsByClassName("bgc")[0];
back.addEventListener('click', setbg);
var setnbg = function(e){
    var background = document.getElementsByTagName("body")[0];
    var nav = document.getElementsByTagName("nav")[0];
    var color = this.parentElement.getElementsByTagName("input")[0].value;
//    background.style = "background-color: #" + color;
    nav.setAttribute("style","background-color: #" + color);
    console.log('color');
};
var back = document.getElementsByClassName("nbgc")[0];
back.addEventListener('click', setnbg);

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
