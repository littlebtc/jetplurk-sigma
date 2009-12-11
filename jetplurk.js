/* JetPlruk 0.0005
 *
 * Some code originaled from BobChao's JetWave 
 *   http://go.bobchao.net/jetwave
 */

var manifest = {
	settings: [
	{
		name: "jetplurk",
		type: "group",
		label: "Plurk Account",
		settings: [
			{ name: "username", type: "text", label: "Username" },
			{ name: "password", type: "password", label: "password" }
		]
	},
	]
};

jetpack.future.import("storage.settings");
set = jetpack.storage.settings;

var loginStr = {};  
loginStr.username = set.jetplurk.username;  
loginStr.password = set.jetplurk.password;  
loginStr.api_key = "LGMTGe6MKqjPnplwd4xHkUFTXjKOy6lJ";  


jetpack.future.import('slideBar') 
jetpack.slideBar.append( {
    icon: "http://www.plurk.com/favicon.ico",
    width: 250,
    html: "<style>body {margin: 0; padding-top: 55px; background: url(http://www.plurk.com/static/logo.png) top left no-repeat; background-color: white; border-bottom:solid lightgray 1px; font-size: 12px;} msgs {display: block; max-width: 245px; overflow: hidden; } msg {display: block; border-bottom:solid lightgray 1px; position: relative; padding: 2px; min-height: 2.5em;} msg:hover {background-color: lightgreen;}</style><body><div id='container'><msgs></msgs></div></body>",
    onClick: function(slider){

		$.ajax({
			url: "http://www.plurk.com/API/Users/login",
			data: loginStr,

			success: function(json){
				var jsObject = JSON.parse(json);
//				console.log(json)
				
				$(jsObject.plurks).each(
					function(i){
						var owner_id = jsObject.plurks[i].owner_id;
						var owner_nickname = jsObject.plurks_users[owner_id].nick_name;
						var content = owner_nickname + ": " + jsObject.plurks[i].content_raw + " content: " + jsObject.plurks[i].content +" response: " + jsObject.plurks[i].response_count + " " + jsObject.plurks[i].posted + " posted. ";
						//console.log(content);
						$(slider.contentDocument).find("msgs").append("<msg>" + owner_nickname + ": " + jsObject.plurks[i].content_raw + "</msg>");
					}
				);
											
			},
			error:function (xhr, textStatus, errorThrown){
				console.log(xhr.status + textStatus + errorThrown);				
			}       

		});

    },
});