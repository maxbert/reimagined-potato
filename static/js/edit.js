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

var editdesc = function(e){
    var field = document.createElement("textarea");
    field.setAttribute("rows","4");
    field.setAttribute("cols", "50");
    var newdesc = document.createTextNode(document.getElementById("descholder").getElementsByTagName("p")[0].innerHTML);
    field.appendChild(newdesc);
    var subdesc2 = document.createElement("button");
    var subtext = document.createTextNode("done editing");
    subdesc2.appendChild(subtext);
    document.getElementById("descholder").replaceChild(field, document.getElementById("descholder").getElementsByTagName('p')[0]);
    document.getElementById('descholder').appendChild(subdesc2);
    var setdesc = function(e){
	console.log(field.value);
	var description2 = document.createTextNode(field.value);
	var descrip = document.createElement("p");
	descrip.setAttribute("id","description");
	descrip.appendChild(description2);
	this.parentElement.replaceChild(descrip, field);
	this.parentElement.removeChild(this);
    }
    subdesc2.addEventListener('click',setdesc);
};

desc.addEventListener('click', editdesc);

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
var numsub = 0;
var addsubpage = function(e){
    var itm = document.getElementById("collection").getElementsByClassName("subpage")[0];
    var cln = itm.cloneNode(true);
    var newid = 'me' + numsub;
    cln.getElementsByClassName('dropdown')[0].getElementsByClassName('dropdown-toggle')[0].setAttribute("id", newid);
    cln.getElementsByClassName('dropdown')[0].getElementsByClassName('dropdown-menu')[0].setAttribute("aria-labelledby", newid);
    this.parentElement.parentElement.insertBefore(cln, this.parentElement);
    numsub++;

    i = 0;


    //methods===================================================
    var uphtolr = function(e){
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

    var uphtocar = function(e){
	console.log('help');
	var img = this.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByTagName("img")[0];
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


    var editserif = function(e){
	var field = document.createElement("textarea");
	field.setAttribute("rows","4");
	field.setAttribute("cols", "50");
	var newdesc = document.createTextNode(this.parentElement.parentElement.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML);
	field.appendChild(newdesc);
	var subdesc2 = document.createElement("button");
	var subtext = document.createTextNode("done editing");
	subdesc2.appendChild(subtext);
	this.parentElement.parentElement.getElementsByTagName('div')[0].replaceChild(field, this.parentElement.parentElement.getElementsByTagName("p")[0]);
	this.parentElement.parentElement.getElementsByTagName("div")[0].appendChild(subdesc2);
	var setdesc = function(e){
	    console.log(field.value);
	    var description2 = document.createTextNode(field.value);
	    var descrip = document.createElement("p");
	    descrip.setAttribute("id","description");
	    descrip.appendChild(description2);
	    this.parentElement.replaceChild(descrip, field);
	    this.parentElement.removeChild(this);
	}
	subdesc2.addEventListener('click',setdesc);
    };

    var editpara = function(e){
	var field = document.createElement("textarea");
	field.setAttribute("rows","10");
	field.setAttribute("cols", "30");
	var newdesc = document.createTextNode(this.parentElement.parentElement.getElementsByClassName("contactinfo")[0].innerHTML);
	field.appendChild(newdesc);
	var subdesc2 = document.createElement("button");
	var subtext = document.createTextNode("done editing");
	subdesc2.appendChild(subtext);
	console.log(this.parentElement.parentElement.getElementsByClassName("contactinfo")[0]);
	this.parentElement.parentElement.replaceChild(field, this.parentElement.parentElement.getElementsByClassName("contactinfo")[0]);
	this.parentElement.parentElement.appendChild(subdesc2);
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

    var edhedlr = function(e){
	var phdesc = prompt("Enter a heading", this.parentElement.parentElement.getElementsByTagName("h2")[0].innerHTML);
	if(phdesc != null){
	    this.parentElement.parentElement.getElementsByTagName("h2")[0].innerHTML = phdesc;
	};
    };


    var edhedcar = function(e){
	var phdesc = prompt("Enter a heading", this.parentElement.parentElement.getElementsByTagName("h1")[0].innerHTML);
	if(phdesc != null){
	    this.parentElement.parentElement.getElementsByTagName("h1")[0].innerHTML = phdesc;
	};
    };

    var editdesclr = function(e){
	var field = document.createElement("textarea");
	field.setAttribute("rows","15");
	field.setAttribute("cols", "65");
	var newdesc = document.createTextNode(this.parentElement.parentElement.getElementsByTagName("p")[0].innerHTML);
	field.appendChild(newdesc);
	var subdesc2 = document.createElement("button");
	var subtext = document.createTextNode("done editing");
	subdesc2.appendChild(subtext);
	this.parentElement.parentElement.replaceChild(field, this.parentElement.parentElement.getElementsByTagName("p")[0]);
	this.parentElement.parentElement.insertBefore(subdesc2, this.parentElement.parentElement.getElementsByClassName('strip')[1]);
	var setdesc = function(e){
	    console.log(field.value);
	    var description2 = document.createTextNode(field.value);
	    var descrip = document.createElement("p");
	    descrip.setAttribute("id","pDescription");
	    descrip.appendChild(description2);
	    this.parentElement.replaceChild(descrip, field);
	    this.parentElement.removeChild(this);
	}
	subdesc2.addEventListener('click',setdesc);
    }; 
    var eddesccar = function(e){
	var field = document.createElement("textarea");
	field.setAttribute("rows","15");
	field.setAttribute("cols", "5");
	field.setAttribute("style", "color:black");
	var newdesc = document.createTextNode(this.parentElement.parentElement.getElementsByTagName("p")[0].innerHTML);
	field.appendChild(newdesc);
	var subdesc2 = document.createElement("button");
	var subtext = document.createTextNode("done editing");
	subdesc2.appendChild(subtext);
	subdesc2.setAttribute("style", "color:black");
	this.parentElement.parentElement.replaceChild(field, this.parentElement.parentElement.getElementsByTagName("p")[0]);
	this.parentElement.parentElement.insertBefore(subdesc2, this.parentElement.parentElement.getElementsByClassName('strip')[1]);
	var setdesc = function(e){
	    console.log(field.value);
	    var description2 = document.createTextNode(field.value);
	    var descrip = document.createElement("p");
	    descrip.appendChild(description2);
	    this.parentElement.replaceChild(descrip, field);
	    this.parentElement.removeChild(this);
	}
	subdesc2.addEventListener('click',setdesc);
    }; 

	
    //============================ADDDING==================================//

    var addserif = function(e){
	var itm = document.getElementById("collection").getElementsByClassName("company_description")[0];
	var cln = itm.cloneNode(true);
	cln.getElementsByTagName('button')[0].addEventListener('click', editserif);
	this.parentElement.parentElement.parentElement.parentElement.parentElement.insertBefore(cln, this.parentElement.parentElement.parentElement.parentElement);
    };

    var addpara = function(e){
	var itm = document.getElementById("collection").getElementsByClassName("contact_paragraph")[0];
	var cln = itm.cloneNode(true);
	cln.getElementsByTagName('button')[0].addEventListener('click', editpara);
	this.parentElement.parentElement.parentElement.parentElement.parentElement.insertBefore(cln, this.parentElement.parentElement.parentElement.parentElement);
    };

    var addimgr = function(e){
	var itm = document.getElementById("collection").getElementsByClassName("sqImageR")[0];
	var cln = itm.cloneNode(true);
	cln.getElementsByClassName('uphto')[0].addEventListener('click', uphtolr);
	cln.getElementsByClassName('edhed')[0].addEventListener('click', edhedlr);
	cln.getElementsByClassName('imdescedit')[0].addEventListener('click', editdesclr);
	this.parentElement.parentElement.parentElement.parentElement.parentElement.insertBefore(cln, this.parentElement.parentElement.parentElement.parentElement);
    };

    var addimgl = function(e){
	var itm = document.getElementById("collection").getElementsByClassName("sqImageL")[0];
	var cln = itm.cloneNode(true);
	cln.getElementsByClassName('edhed')[0].addEventListener('click', edhedlr);
	cln.getElementsByClassName('uphto')[0].addEventListener('click', uphtolr);
	cln.getElementsByClassName('imdescedit')[0].addEventListener('click', editdesclr);
	this.parentElement.parentElement.parentElement.parentElement.parentElement.insertBefore(cln, this.parentElement.parentElement.parentElement.parentElement);
    };
    var addimgc = function(e){
	var itm = document.getElementById("collection").getElementsByClassName("carousel")[0];
	var cln = itm.cloneNode(true);
	var j = 0;
	var heds = cln.getElementsByClassName('edcarhead');
	for(j; j<heds.length; j++){
	    heds[j].addEventListener('click', edhedcar);
	}
	j = 0;
	var descs = cln.getElementsByClassName('imdescedit');
	for(j; j<descs.length; j++){
	    descs[j].addEventListener('click', eddesccar);
	}
	j = 0;
	var phtos = cln.getElementsByClassName('uphto');
	for(j; j<phtos.length; j++){
	    phtos[j].addEventListener('click', uphtocar);
	}

 
	this.parentElement.parentElement.parentElement.parentElement.parentElement.insertBefore(cln, this.parentElement.parentElement.parentElement.parentElement);
    };


    //=------------------------EVENT LISTNERS-----------------------=//
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
    var edsubs = document.getElementsByClassName("addParagraphSerif");
    for(i; i<edsubs.length; i++){
	edsubs[i].addEventListener("click",addserif);
    };
     i = 0;
    var edsubs = document.getElementsByClassName("addParagraph");
    for(i; i<edsubs.length; i++){
	edsubs[i].addEventListener("click",addpara);
    };
     i = 0;
    var edsubs = document.getElementsByClassName("addImageRight");
    for(i; i<edsubs.length; i++){
	edsubs[i].addEventListener("click",addimgr);
    };
     i = 0;
    var edsubs = document.getElementsByClassName("addImageLeft");
    for(i; i<edsubs.length; i++){
	edsubs[i].addEventListener("click",addimgl);
    };
    i =0;
    var edsubs = document.getElementsByClassName("addImageCarousel");
    for(i; i<edsubs.length; i++){
	edsubs[i].addEventListener("click",addimgc);
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
    var img = document.getElementById('logo');
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
