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
    var box = document.createElement('div');
    box.setAttribute('class', 'box');
    var tile = document.createElement('div');
    tile.setAttribute('class', 'tile');
    box.appendChild(tile);
    var im = document.createElement('img');
    im.setAttribute('id', 'image8');
    im.setAttribute('src', '/static/images/image8.jpeg');
    im.setAttribute('alt', 'Place image here');
    im.setAttribute('width', '100%');
    tile.appendChild(im);
    var imgDescription = document.createElement('div');
    imgDescription.setAttribute('class','imgDescription');
    tile.appendChild(imgDescription);
    var imDescription = document.createElement('p');
    imDescription.setAttribute('id','imgDescription8');
    var imdesc = document.createTextNode('Describe this image');
    imDescription.appendChild(imdesc);
    imgDescription.appendChild(imDescription);
    var but1 = document.createElement('button');
    but1.setAttribute('type', 'button');
    but1.setAttribute('class', 'btn btn-success');
    var but2 = document.createElement('button');
    but2.setAttribute('type', 'button');
    but2.setAttribute('class', 'btn btn-danger remphto');
    but2.addEventListener('click', rmphto);
    imgDescription.appendChild(but2);
    var but1desc = document.createTextNode('Upload Picture');
    but1.appendChild(but1desc);
    var but2desc = document.createTextNode('Remove');
    but2.appendChild(but2desc);
    var holder = document.getElementById('boxholder');
    imgDescription.appendChild(but1);
    holder.appendChild(box);
    console.log('done?');
    
};


var addphto = document.getElementById('addphto');
addphto.addEventListener('click', addPhotoBlock);
console.log('okay');
//remove phtoblock
var rmphto = function(e){
    this.parentElement.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement);//I'm so sorry
};
//remove event listeners
var i;
var removebuttons = document.getElementsByClassName("remphto");
for (i = 0; i < removebuttons.length; i++){
    removebuttons[i].addEventListener('click', rmphto);
};

//remove logo

var rmlogo = function(e){
    var logo = document.getElementById("logo");
    logo.parentElement.removeChild(logo);
};

//remove event listenre
var remlogo = document.getElementsByClassName('remlogo')[0];
remlogo.addEventListener("click", rmlogo);

var revphdesc = function(e){
    var newphdesc = this.parentElement.getElementsByTagName("textarea")[0].value;
    this.parentElement.innerHTML = newphdesc;
}

var edphdesc = function(e){
    console.log(this.innerHTML);
    this.innerHTML = '<textarea rows="0" cols="0" id="phdescentry">' + this.innerHTML + '</textarea><br><button id = "phsubdesc'+ imgcount + '" > done editing </button><br>';
    var phsub = document.getElementById("phsubdesc" + imgcount);
    phsub.addEventListener('click', revphdesc);
    imgcount += 1;
};


    
var imdescs = document.getElementsByClassName("imdesc");
i = 0;
for( i = 0; i<imdescs; i++){
    imdescs[i].addEventListener('click', edphdesc);
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
$("button#publish").click(function() {
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