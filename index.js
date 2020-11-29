const api = axios.create({
  baseURL: 'http://localhost:1010/projects/gaya/',
  timeout: 5000,
});

var loading_element = document.getElementById("loading");
var title_element = document.getElementById("title");
var description_element = document.getElementById("description");
var date_element = document.getElementById("date");
var form_element = document.getElementById("form");
var speakers_container_element = document.getElementById("speakers_container");
var speakers_element = document.getElementById("speakers");

function createElement(name, role, image){
	var element = '<div class="speaker">';
	element += '<div class="profile"><img src="'+image+'"></div>';
	element += '<div class="name"><span>'+name+'</span></div>';
	element += '<div class="sub"><span>'+role+'</span></div>';
	element += '</div>';
	return element;
}

function getParams()
{
	var params = window.location.search.substring(1).split('&');
	var paramArray = {};
	for(var i=0; i<params.length; i++)
	{
		var param = params[i].split('=');
		paramArray[param[0]] = param[1];
	}

	return paramArray;
}

async function getWebinar(id){
	await api.post("get_webinar.php", "webinar_id="+id).then((res) => {
		
		loading_element.style = "display: none";
		title_element.innerText  = res.data.result.title;
		description_element.innerText  = res.data.result.description;
		date_element.innerText = res.data.result.date;

		if(res.data.speakers != undefined){
			for(var i=0;i<res.data.speakers.length;i++){
				speakers_element.innerHTML += createElement(res.data.speakers[i].name, res.data.speakers[i].role, res.data.speakers[i].image);
			}
			speakers_container_element.style = "display: block";
		}

	}).catch((error) => {
		console.log(error);
	});
}


var params = getParams();
if(params.id != undefined){
	getWebinar(params.id);	
}
