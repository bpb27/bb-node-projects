module.exports = function Route(app){
	
	var users = {};
	var id_counter = 1;

	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/chat', function(req, res){
		res.render('chat');
	})

	app.get('/draw', function(req, res){
		res.render('canvas');
	})

	//DRAW APP
	app.io.route('drawClick', function(req){
    	req.io.broadcast('draw', req.data);
	})

	//CHAT APP
	app.io.route('ready', function(req) {
    	req.session.name = req.data;
    	req.session.id_number = id_counter;

    	users[id_counter] = req.data;
    	id_counter += 1;

    	req.session.save(function(){
    		req.io.broadcast('new_user', {name: req.data, id: req.session.id_number});
    		req.io.emit('existing_users', {'users': users, 'session': req.session});
    	})
	
	});

	app.io.route('disconnect', function(req){
  		req.io.broadcast('user_disconnected', {'id': req.session.id_number, 'name': req.session.name});
		delete users[req.session.id_number];
	})

	app.io.route('updating_text', function(req, res){
		req.io.broadcast('text_update', {'id': req.data.id, 'text': req.data.text});
	});
	
}//END ROUTING PAGE
