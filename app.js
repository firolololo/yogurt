var koa = require('koa');
var app = koa();
var logger = require('koa-logger');
var route = require('koa-route');
var router = require('koa-router')();

var staticServer = require('koa-static');
var path = require('path');

/*var xtpl = require('xtpl/lib/koa');
xtpl(app,{
	views:'./views'
});*/
var render = require('koa-ejs');
render(app, {
	root: path.join(__dirname, 'views'),
	layout: false,
	viewExt: 'html',
	cache: false,
	debug: true
});

app.use(staticServer(path.join(__dirname,'public')));


router.get('/',renderHome);
function *renderHome(){
	var user = {
		user:{
			username:'firo',
			imageUrl:'./images/users/firo/fuck.jpg'
		}
	}
	yield this.render('admin',user);
}




app.use(router.routes());
app.use(logger());
app.listen(3636);