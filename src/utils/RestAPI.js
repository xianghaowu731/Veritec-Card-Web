import moment from "moment";


export const serverURL = "https://piique.co:11100/api/v1";
export const hostURL = serverURL;
export const uploadsHostUrl = "https://piique.co:11100"
export const WSUrl = "wss://piique.co:11100"



export const GetImgLink = (link)=>{
	if(link.startsWith('http') || link.startsWith('blob')){
		return link
	}else{
		if(link.startsWith('/uploads')){
			return uploadsHostUrl + link
		}else if(link.startsWith('uploads')){
			return uploadsHostUrl + '/' + link
		}

		return null
	}
}

export const GetKindLink = (link) => {
    let domain = '';
    let protocal = '';
    if(link.startsWith('http://')){
      domain = link.replace('http://', '')
      protocal = 'http://'
    }

    if(link.startsWith('https://')){
      domain = link.replace('https://', '')
      protocal = 'https://'
    }

    let parts = domain.split('/')
    if(parts.length > 0){
      domain = parts[0]
    }

    return protocal+''+domain+'/favicon.ico';

  }
export const GetSocialNameByLink = (link)=>{
	let domain = '';
    let protocal = '';
    if(link.startsWith('http://')){
      domain = link.replace('http://', '')
      protocal = 'http://'
    }

    if(link.startsWith('https://')){
      domain = link.replace('https://', '')
      protocal = 'https://'
    }

    let parts = domain.split('/')
    if(parts.length > 0){
      domain = parts[0]
    }
	
	const domainParts = domain.split('.');
	let socialname = domainParts[domainParts.length - 2]
	
	return socialname
}


const futch = (url, opts = {}, onProgress) => {
	// // console.log(url, opts)
	return new Promise((res, rej) => {
		var xhr = new XMLHttpRequest();
		xhr.open(opts.method || "get", url);
		for (var k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);
		xhr.onload = (e) => res(e.target);
		xhr.onerror = rej;
		if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
		xhr.send(opts.body);
	});
};

const requestCall = (
	subUrl,
	method,
	body,
	headers,
	callBack,
	isFullUrl = false,
	isResponseJson = true
) => {
	
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");


	let reqParams = {
		method: method,
		headers: myHeaders,
		// body: body,
		redirect: "follow",
	};

	if (!!headers) {
		reqParams.headers = headers;
	}

	if (body !== null) {
		reqParams.body = JSON.stringify(body);
	}

	let fullUrl = isFullUrl ? subUrl : hostURL + subUrl;
	// console.log(fullUrl);
	// // console.log('reqParams: LINE 39 ', reqParams)
	if (isResponseJson == false) {
		fetch(fullUrl).then(function (response) {
			// console.log("response: LINE 42", response);
			return response.text().then((text) => {
				// // console.log('text:', text)
				callBack(text, null);
			});
		});
	} else {
		fetch(fullUrl, reqParams)
			.then(function (response) {
				const status = response.ok ? 200 : response.status;

				response.json().then((data) => {
					if (status == 200) {
						callBack(data, null);
					} else {
						let field = null;
						let msg = null;
						if (data.length > 0) {
							field = data[0].field;
							msg = data[0].message;
						}
						let resObj = { field, msg };
						callBack(resObj, status);
					}
				});
			})
			.catch(function (err) {
				// console.log("err: LINE 64", err);
				callBack(null, err);
			});
	}
};

function BearerHeader(token) {
	const header = {
		Authorization: "Bearer " + token,
	};
	return header;
}

const formDataCall = (
	subUrl,
	method,
	body,
	headers,
	callBack,
	isFullLink = false
) => {
	let link = isFullLink ? subUrl : hostURL + subUrl;
	futch(
		link,
		{
			method: method,
			body: body,
			headers: headers,
		},
		(progressEvent) => {
			const progress = progressEvent.loaded / progressEvent.total;
			// console.log(progress);
		}
	).then(
		function (resJson) {
			// console.log("formDataCall response from server!>>>>>|||>>|:> ", resJson);

			try {
				let res = JSON.parse(resJson.response);
				// console.log("after parsing: ", res);
				if (resJson.status == 200) {
					callBack(res, null);
				} else {
					let field = null;
					let msg = null;
					if (res.length > 0) {
						field = res[0].field;
						msg = res[0].message;
					}

					let resObj = { field, msg };

					callBack(resObj, resJson.status);
				}
			} catch (exception) {
				// console.log(exception);
				callBack(null, exception);
			}
		},
		(err) => {
			// console.log("parsing err ", err);
			callBack(null, err);
		}
	);
};

const RestAPI = {
	fullUrl: (url) => {
		return hostURL + url;
	},

	geoCodingFromLocationIQ(lat, lon) {
		let myTokenInLocationIq = "79796c87ec4f44"; // from zyxm gmail account https://my.locationiq.com/

		let url =
			"https://us1.locationiq.com/v1/reverse.php?key=" +
			myTokenInLocationIq +
			"&lat=" +
			lat +
			"&lon=" +
			lon +
			"&format=json";

		return new Promise((resolve, reject) => {
			fetch(url)
				.then(function (res) {
					try {
						let json = res.json();
						return json;
					} catch (e) {
						reject(e);
					}
				})
				.then(
					function (resJson) {
						resolve(resJson);
					},
					(error) => {
						reject(error);
					}
				);
		});
	},

	geoGoogleReverse(place_id, GoogleApiKey) {
		let url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${GoogleApiKey}`;

		return new Promise((resolve, reject) => {
			fetch(url)
				.then(function (res) {
					try {
						let json = res.json();
						return json;
					} catch (e) {
						reject(e);
					}
				})
				.then(
					function (resJson) {
						resolve(resJson);
					},
					(error) => {
						reject(error);
					}
				);
		});
	},

	generalGet:(apiSubUrl)=>{
		

		return new Promise((resolve, reject) => {
			requestCall("/"+apiSubUrl, "GET", null,null, (res, err) => {
				if (err) {
					// console.log(
					// 	"LINE 204 Error while calling API ["+apiSubUrl+"] >>>>>>>>>>>>>>>err, res ",
					// 	err,
					// 	res
					// );
					let errObj = { status: err, ...res };
					reject(errObj);
				} else {
				
					resolve(res);
				}
			});
		});
	},

	
	generalPost:(apiSubUrl, data)=>{
		// console.log('generalPost jsonData > ', data);

		return new Promise((resolve, reject) => {
			requestCall("/"+apiSubUrl, "POST", data, null, (res, err) => {
				if (err) {
					// console.log(
					// 	"LINE 204 Error while calling API ["+apiSubUrl+"] >>>>>>>>>>>>>>>err, res ",
					// 	err,
					// 	res
					// );
					let errObj = { status: err, ...res };
					reject(errObj);
				} else {
					// console.log(
					// 	"LINE 208 Success in ["+apiSubUrl+"] calling : >>>>>>>>>>> ",
					// 	res
					// );
					resolve(res);
				}
			});
		});
	},

	generalFormPost: (subUrl, formData) => {
	

		// console.log("register data : ", formData);

		return new Promise((resolve, reject) => {
			formDataCall("/" + subUrl, "post", formData, null, (res, err) => {
				console.log("register result : ", res, err);

				if (err) {
                    console.log(
						"LINE 204 Error while calling API ["+subUrl+"] >>>>>>>>>>>>>>>err, res ",
						err,
						res
					);
					let errObj = { status: err, ...res };
					reject(errObj);
				} else {
                    console.log(
						"LINE 208 Success in ["+subUrl+"] calling : >>>>>>>>>>> ",
						res
					);
					resolve(res);
				}
			});
		});
	},

};

export default RestAPI;
