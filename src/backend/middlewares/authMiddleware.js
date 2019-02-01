
module.exports.isAuthenticated = function checkAccess(req, res, next){	
	if (req.user){
		next();
	} else {
		res.status(440);
		res.render('error/440', {title: 'Invalid Session',layout: 'layouts/layout_errors'});
	}
}
module.exports.canManage = function(req, res, next, page, callback){
}
module.exports.canView = function(req, res, next, page, callback){
}