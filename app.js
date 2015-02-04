var ical = require('ical')
var mongojs = require("mongojs");
var schedule = require('node-schedule');
var connection_string = '127.0.0.1:27017/myapp';
var db = mongojs(connection_string, ['myapp']);
var wc_users = db.collection("wc_users"); // The wc_users db is selected 


if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}


function  getTeamAShortName (s)
{

          if(s.indexOf("Pool B Scotland") > -1)
          {
                return "SCO";
          } 
           else
          if(s.indexOf("Pool B Sri Lanka") > -1)
          {
                return "SL";
          } 
          else
          if(s.indexOf("Pool B Australia") > -1 )
          {
                return "AUS";
          } 
          else
          if(s.indexOf("Pool B New Zealand") > -1 )
          {
                return "NZ";
          } 
          else
          if(s.indexOf("Pool B Bangladesh") > -1)
          {
                return "BAN";
          } 
          else
          if(s.indexOf("Pool B West Indies") > -1)
          {
                return "WI";
          } 
          else
          if(s.indexOf("Pool B Pakistan") > -1 )
          {
                return "PAK";
          } 
          else
          if(s.indexOf("Pool B South Africa") > -1 )
          {
                return "SA";
          } 
          else
          if(s.indexOf("Pool B Afghanistan") > -1)
          {
                return "AFG";
          } else
          if(s.indexOf("Pool B India") > -1)
          {
                return "IND";
          } else
          if(s.indexOf("Pool B United Arab Emirates") > -1 )
          {
                return "UAE";
          } else
          if(s.indexOf("Pool B England") > -1 )
          {
                return "ENG";
          } else

          if(s.indexOf("Pool B Zimbabwe") > -1)
          {
                return "ZIM";
          } else
          if(s.indexOf("Pool B Ireland") > -1)
          {
                return "IRE";
          } else

          if(s.indexOf("TBD") > -1)
          {
                return  "TBD";
          } else

          if(s.indexOf("Pool A Scotland") > -1)
          {
                return "SCO";
          } else
          if(s.indexOf("Pool A Sri Lanka") > -1)
          {
                return "SL";
          } else
          if(s.indexOf("Pool A Australia") > -1 )
          {
                return "AUS";
          } else
          if(s.indexOf("Pool A New Zealand") > -1 )
          {
                return "NZ";
          } 
          else
          if(s.indexOf("Pool A Bangladesh") > -1)
          {
                return "BAN";
          } else
          if(s.indexOf("Pool A West Indies") > -1)
          {
                return "WI";
          } else
          if(s.indexOf("Pool A Pakistan") > -1 )
          {
                return "PAK";
          } else
          if(s.indexOf("Pool A South Africa") > -1 )
          {
                return "SA";
          } else

          if(s.indexOf("Pool A Afghanistan") > -1)
          {
                return "AFG";
          } else
          if(s.indexOf("Pool A India") > -1)
          {
                return "IND";
          } else
          if(s.indexOf("Pool A United Arab Emirates") > -1 )
          {
                return "UAE";
          } else
          if(s.indexOf("Pool A England") > -1 )
          {
                return "ENG";
          } else

          if(s.indexOf("Pool A Zimbabwe") > -1)
          {
                return "ZIM";
          } else 
          if(s.indexOf("Pool A Ireland") > -1)
          {
                return "IRE";
          } else

          if(s.indexOf("TBD") > -1)
          {
                return  "TBD";
          }
          else
          {
             return "Team";
          }

}

function getTeamBShortName (s)
{

          if(s.indexOf("v Scotland") > -1)
          {
                return "SCO";
          } else
          if(s.indexOf("v Sri Lanka") > -1)
          {
                return "SL";
          } else
          if(s.indexOf("v Australia") > -1 )
          {
                return "AUS";
          } else
          if(s.indexOf("v New Zealand") > -1 )
          {
                return "NZ";
          } else


          if(s.indexOf("v Bangladesh") > -1)
          {
                return "BAN";
          } else
          if(s.indexOf("v West Indies") > -1)
          {
                return "WI";
          } else
          if(s.indexOf("v Pakistan") > -1 )
          {
                return "PAK";
          } else
          if(s.indexOf("v South Africa") > -1 )
          {
                return "SA";
          } else


          if(s.indexOf("v Afghanistan") > -1)
          {
                return "AFG";
          } else
          if(s.indexOf("v India") > -1)
          {
                return "IND";
          } else
          if(s.indexOf("v United Arab Emirates") > -1 )
          {
                return "UAE";
          } else
          if(s.indexOf("v England") > -1 )
          {
                return "ENG";
          } else

          if(s.indexOf("v Zimbabwe") > -1)
          {
                return "ZIM";
          } else
          if(s.indexOf("v Ireland") > -1)
          {
                return "IRE";
          } else

          if(s.indexOf("v TBD") > -1)
          {
                return  "TBD";
          }
          else
          {
                return  "Team";
          }
          
}



var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var sentcount = 0;
var count = 0 ; 

// wc_users.find().sort( { modifiedOn : -1}, function(err, success) {
//                     console.log("Response success is "+success);
//                     success.forEach( function (rec)
//                     {
//                         count++;


//                             if(rec.notify_id!=null && rec.notify_id!="")
//                             {
//                                 sentcount ++;
//                                 NotificationTask("World Cup 2015 Calendar Sync", "Next:KEN vs RSA", "Next Match ", "KEN", "RSA", "Sydney", "at 17:00", rec.notify_id); // Added navigatedto parameter to                            
//                             }

//                             if(success.length == count )
//                             {
//                                     console.log("sent!!! ");
//                                     //res.send(200, "Sent to "+sentcount+"  users! "); // At the end it will respond with number of users the feed has been reached. 
//                             } 

//                     });
//                     });    




function NotificationTask(title, msg, header, teama, teamb, firstdetail, teamadetail1, notify_id)  // Added navigateto parameter!
{


              // Added navigatedto parameter to                            

      if(notify_id.startsWith("http://")) 
     {
                console.log("startsWith is working ");          
                var mpns = require('mpns');
                var pushUri = notify_id;
                console.log("The pushUri is "+pushUri);
                var windows_navigation_path = "/LiveUpdate.xaml?Header="+header+"&Flag1Label="+teama+"&Flag2Label="+teamb+"&FirstDetail="+firstdetail+"&TeamADetail1="+teamadetail1;
                mpns.sendToast(pushUri, title, msg, "",windows_navigation_path, function back(err,data)
                {
                    console.log(data);
                });
                console.log("This user is not an android user");
     }

}


function triggerNotificationForAll(TeamA, TeamB, header, firstdetail, teamadetail1)
{

    var count = 0;
    var sentcount = 0;
    console.log("Team A is "+TeamA);
    console.log("Team B is "+TeamB);

   wc_users.find().sort( { modifiedOn : -1}, function(err, success) {
                    console.log("Response success is "+success);
                    success.forEach( function (rec)
                    {
                        count++;


                            if(rec.notify_id!=null && rec.notify_id!="" && rec.preference == "send")
                            {
                                sentcount ++;
                                NotificationTask("World Cup 2015 Calendar Sync", "Next: "+TeamA+ " vs "+TeamB, header, TeamA, TeamB, firstdetail, teamadetail1, rec.notify_id); // Added navigatedto parameter to                            
                            }

                            if(success.length == count )
                            {
                                    console.log("sent!!! ");
                                    //res.send(200, "Sent to "+sentcount+"  users! "); // At the end it will respond with number of users the feed has been reached. 
                            } 

                    });
                    });    

}


 
    ical.fromURL('http://gaadikey.com/wct7.ics', {}, function(err, data) {
    var count = 0;
    var sentcount = 0;
      for (var k in data){
        if (data.hasOwnProperty(k)) {
          count++;
          var ev = data[k];
          console.log("Conference",
            ev.summary,
            'is in',
            ev.location,
            'on the', ev.start.getDate(), ev.start.getYear(), ev.start.getMonth(), ev.start.getHours(), ev.start.getMinutes(), ev.start.getSeconds(), 'of', months[ev.start.getMonth()]);

            
            
            var TeamA = getTeamAShortName(ev.summary);
            var TeamB = getTeamBShortName(ev.summary);
            var firstdetail = ev.location;
            var tpart1 = ev.start.getHours();
            var tpart2  =ev.start.getMinutes();
            var date = ev.start;
            if(ev.start.getMinutes() == 0 )
            tpart2 = "00";
            var teamadetail1 = tpart1+":"+tpart2+" GMT";
            var header = ev.summary;
            console.log("Team A is "+TeamA);
            console.log("Team B is "+TeamB);
            console.log("Location is "+firstdetail);
            console.log("Time is "+teamadetail1);
            eval("var j11 = schedule.scheduleJob(date, function(){ console.log('The Scheduled Task '); triggerNotificationForAll('"+TeamA+"', '"+TeamB+"', '"+header+"', '"+firstdetail+"', '"+teamadetail1+"'); })");
           // triggerNotificationForAll(TeamA, TeamB, header, firstdetail, teamadetail1); // Schedule this beautiful function ! 
            
            
           

        // if(ev.start < q)
        // {
        //   console.log("The event is already over");
        // }

        //  else
         // {
           
         //  //  eval("var j1 = schedule.scheduleJob(date, function(){ console.log('The 2 ')})");


         // }

 
      
        }
      }
    });