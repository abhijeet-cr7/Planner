const express =  require('express');
const port = 4000;
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const Details = require('./models/data');
// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Template Engine
// Middlewares
app.use(express.urlencoded());
app.use(express.static('assests'));
// Middlewares
app.get('/', function(req,res){
    Details.find({}, function(err, details)
    {
        if(err){
            console.log('Error in fetchcing DB');
            return;
        }
        return res.render('home', {description_list: details});
})
});
// finding the things added to the database
app.listen(port, function(err){
    if(err){
        console.log(`error ${err}`);
    return;
    }
    console.log(`Server is up on port ${port}`);
});
app.post('/submit-details', function(req,res){
Details.create({
    description: req.body.description,
    category: req.body.category,
    due_date: req.body.due_date
}, function(err, newDetail){
    if(err)
    {
        console.log('error in creating a detail of todo', err);
        return;
    }
    console.log('*****', newDetail);
});
   return res.redirect('back');
})
app.post('/delete-task', function(req, res){
    // storing object id "_id" in variable id
        let id = req.body.id;
        // delete many command in case user selected two or more tasks
        Details.deleteMany({_id: {$in: id}}, function(err){
            if(err){
                // error handling
                console.log('error in deleting the task');
                return;
            }
            // returning response
            return res.redirect('/');
});
});
