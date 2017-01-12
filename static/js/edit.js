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
    im.setAttribute('id', 'image'+ imgcount + '');
    im.setAttribute('src', 'static/images/image'+ imgcount + '.jpg');
    im.setAttribute('alt', 'Place image here');
    im.setAttribute('width', '100%');
    tile.appendChild(im);
    var imgDescription = document.createElement('div');
    imgDescription.setAttribute('id','imgDescription');
    tile.appendChild(im);
    var imDescription = document.createElement('p');
    imDescription.setAttribute('id','imgDescription' + imgcount +'');
    var imdesc = document.createTextNode('Describe this image');
    imDescription.appendChild(imdesc);
    imgDescription.appendChild(imDescription);
    var but1 = document.createElement('button');
    but1.setAttribute('type', 'button');
    but1.setAttribute('class', 'btn btn-success');
    imgDescription.appendChild(but1);
    var but2 = document.createElement('button');
    but2.setAttribute('type', 'button');
    but2.setAttribute('class', 'btn btn-danger');
    imgDescription.appendChild(but2);
    var but1desc = document.createTextNode('Upload Picture');
    but1.appendChild(but1desc);
    var but2desc = document.createTextNode('Remove');
    but2.appendChild(but2desc);
    var holder = document.getElementById('boxholder');
    holder.appendChild(box);
    console.log('done?');
    
};


var addphto = document.getElementById('addphto');
addphto.addEventListener('click', addPhotoBlock);
console.log('okay');


$("button#save").click(function() {
	var data = {};
	var html_info = document.getElementsByTagName("html")[0].innerHTML;
	data.templatehtml = html_info;
	$.ajax({
		type: "POST",
		url: "/save/",
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(data){
			console.log("success")
		},
		error: function(data){
			console.log("failure")
			}
		});/*
            window.location.href= 'home/' + name;
            */
		});
