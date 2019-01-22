
module.exports.isAuthenticated = function checkAccess(req, res, next){	
	if (req.user){
		next();
	} else {
		let errorMsg = '<div class="alert alert-danger" id="divError">'+
		'<span id="msgError">Session Expired! Click <a href="/login" > here </a>'+
		'to login again</span></div>'
		res.send(errorMsg)
	}
}
module.exports.canManage = function(req, res, next, page, callback){
}
module.exports.canView = function(req, res, next, page, callback){
}