var getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var vblteamid = getParameterByName("vblteamid");
var teamid = getParameterByName("teamid");
var partnershipId = getParameterByName("p");
var team;
var visualDate = new Date();

var renderPastMatches = function(){
  repository.pastMatches(vblteamid, function(match){
    var matchuri= "/match/?matchid=" + match.guid;
    var tr = $.template("#table-item-template", {
        date: match.datumString,
        time: match.beginTijd,
        home: match.tTNaam,
        away: match.tUNaam,
        result: match.uitslag
    }, "tbody");

    $("#result-table tbody").append(tr);    
  });
  $("#result-table").show();
};

var renderTeam = function(vblTeam, team){
      
    if(team != null){
        $("#team-name").text("Uitslagen -" + team.groupName);               
    }
    else if(vblTeam != null){
        $("#team-name").text("Uitslagen -" + vblTeam.naam);
    }
    
    var imgurl = null;
    var fallbackimgurl = null;
    if(team != null){
        imgurl = "url('https://clubmgmt.blob.core.windows.net/groups/originals/" + team.groupId + ".jpg')";        
    }
    // if(vblTeam != null){       
    //     var pic = vblTeam.naam.replace(/ +/g,".").toLowerCase();
    //     fallbackimgurl = "url('/img/teams/" + pic +  ".jpg')"       
    // }
    fallbackimgurl = "url('/img/team_placeholder.png')";

    var combined = null;
    if(imgurl){
        combined = imgurl;
    }
    if(fallbackimgurl){
        if(combined){
            combined += ", " + fallbackimgurl;
        }
        else{
            combined = fallbackimgurl;
        }
    }
    combined += ";";
    
    $("#team-photo").attr("style", "background: " + combined +  " background-repeat: no-repeat; background-position: center top; background-size: cover;");   
};


$.topic("repository.initialized").subscribe(function () {
    console.log("loading data");
     
    if(vblteamid != null){
      repository.loadTeam(vblteamid);
    }
    else if(teamid != null){   
      
      if(partnershipId == null){
  
          clubmgmt.mapTeam(teamid, function(map){
              if(map == null){            
                  clubmgmt.loadTeam(teamid, function(t){
                      team = t;
                      renderTeam(null, team);
                      $(".loading").hide();
                      $("#team-dashboard").css("visibility", "visible");     
                  });                       
              }
              else{
                  vblteamid = map.referenceId;
                  clubmgmt.loadTeam(teamid, function(t){
                      team = t;
                      repository.loadTeam(vblteamid);         
                  });
              }               
          });
  
      }
      else{
          clubmgmt.mapPartnerTeam(teamid, partnershipId, function(map){
              if(map == null){            
                  clubmgmt.loadPartnerTeam(partnershipId, teamid, function(t){
                      team = t;
                      renderTeam(null, team);
                      $(".loading").hide();
                      $("#team-dashboard").css("visibility", "visible");     
                  });                        
              }
              else{
                  vblteamid = map.referenceId;
                  clubmgmt.loadPartnerTeam(partnershipId, teamid, function(t){
                      team = t;
                      repository.loadTeam(vblteamid);         
                  });
              }   
          });
      } 
    }
   
  });

$.topic("vbl.team.loaded").subscribe(function () {
    repository.loadMatches();
    repository.getTeam(vblteamid, function(vblteam){
        if(vblteam && vblteam.guid == vblteamid){
           renderTeam(vblteam, team);
           $(".loading").hide();
           $("#team-dashboard").css("visibility", "visible");
        }
        if(!vblteam){
            $("#team-name").text("Team niet gevonden");
        }
    });     
});

$.topic("vbl.matches.loaded").subscribe(function () {
     renderPastMatches();   
});

$.topic("vbl.members.loaded").subscribe(function () {

});

$( document ).ready(function() {
    
});
