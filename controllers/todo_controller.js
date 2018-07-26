//controlls how data is sent from view to backend etc. contains get,post etc
var bodyParser= require('body-parser');
var urlencodedparser=bodyParser.urlencoded({extended: false});
//var data = [{task:"do homework"},{task:"eat"},{task:"drink water"}];
module.exports=function(app,connection){
  app.get('/todo',function(req,res){
        //res.render('todo',{tasks: data});
    connection.query("select * from tasks", function(error,rows,fields){
        if(error)
         console.log("query problem");
         else {

            //console.log(rows);
            res.render('todo',{tasks: rows});
         }
      });
    //  res.render('todo',{tasks: rows});
  });
  app.post('/todo',urlencodedparser,function(req,res){
     //data.push(req.body);
     var pfft=req.body.task;
     //console.log(pfft);
     connection.query("insert into tasks (label) values (?) ",pfft);
      //res.json(data);
      connection.query("select * from tasks", function(error,rows,fields){
        res.json(rows);
      });
    //res.render('todo',{tasks: data});
  });
  app.delete('/todo/:item',function(req,res){
    //data =data.filter(function(work){
    //  return work.task.replace(/ /g,"-") !== req.params.item;
    //});
    //console.log(req.params.item);
/*   for(i=0;i<data.length;i++)
   {
     data[i].task = data[i].task.replace(/ /g, "-");
     data[i].task= data[i].task + "-";
    // console.log(data[i].task);
  };*/
  //console.log(req.params.item);
  /* for(i=0;i<data.length;i++)

   {
     if(req.params.item === data[i].task)
      { console.log("found");
        data.splice(i,1);}
   };*/
  /* for(i=0;i<data.length;i++)
   {
     data[i].task = data[i].task.replace(/-/g, " ");
     //data[i].task= data[i].task + "-";
    // console.log(data[i].task);
  };*/
  // var search =req.params.item;
 var search = req.params.item;
 console.log(search);
    connection.query("delete from tasks where label = ?",search);
  var info=  connection.query("select * from tasks",function(error,rows,fields){
     //console.log(rows);
     res.json(rows);
    });

    //res.json(info);

  });
};
