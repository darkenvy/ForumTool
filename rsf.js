var isDayLightSaving = true;

var currentPageIsTop = $('.forum-stat--latest').length > 0 ? true : false; // resolve by looking at the length of a jquery list
var topLevelRegex = /(\d+)\/(\d+)\/(\d+)\s(\d+):(\d+)/ // Regex for the top level time format. Because Date() doens't like the current format
var threads;
var currTime = new Date();
var setParentElemColor = function(thread, cssToAppend) {
  // This function exists because the location of the parent element changes
  // if it is the front page of the forum or not.
  if (currentPageIsTop) {
    $($(thread)[0].parentElement).css(cssToAppend);
  }
  else {
    $($(thread)[0].parentElement.parentElement).css(cssToAppend);
  }
}

// If the forum is the top level, then prepare the dates a certain way.
// Else, prepare it another way
if (currentPageIsTop) {
  threads = $('.forum-stat--latest');
} else {
  threads = $('.thread-plate__last-post-time');
}

// Loop through each thread, look at the time, fix the time and color the thread
for (var i=0; i<threads.length; i++) {
  var parseDate;
  var threadDate;

  // Parse the time based on if it is from the top level page or not
  if (currentPageIsTop) {
    parseDate = threads[i].innerText.match(topLevelRegex);
    threadDate = new Date('20' + parseDate[3], parseDate[2]-1, parseDate[1], parseDate[4], parseDate[5]); // Gets GMT date
  } else {
    threadDate = new Date(threads[i].innerText); // Gets GMT date
  }

  // Finish date fixing. Brings GMT time equal to current time zone time.
  threadDate = new Date(threadDate - (( (new Date().getTimezoneOffset() + (isDayLightSaving*60) ) * 60) * 1000)); // converts to current time zone specific to user
  var minutesAgo = parseInt((new Date().valueOf() - threadDate.valueOf()) / 1000 / 60);
  
  // Do the magic now
  if (minutesAgo >=10080) { //week
    threads[i].innerText = parseInt(minutesAgo/10080) + " weeks Ago";
    $(threads[i]).css({color:'darkred'})
    setParentElemColor(threads[i], {background:'rgba(109,0,75,0.2)'} )
  }
  else if (minutesAgo >= 1440) { //day
    threads[i].innerText = parseInt(minutesAgo/1440) + " days Ago";
    $(threads[i]).css({color:'orange'})
    setParentElemColor(threads[i], {background:'rgba(191, 89, 89, 0.2)'} )
  }
  else if (minutesAgo >= 60) { //hour
    threads[i].innerText = parseInt(minutesAgo/60) + " hours Ago";
    $(threads[i]).css({color:'yellow'})
    setParentElemColor(threads[i], {background:'rgba(234,234,145,0.2)'} )
  } 
  else if (minutesAgo = 0) { //less than a minute
    threads[i].innerText = "Now";
    $(threads[i]).css({color:'green'})
    setParentElemColor(threads[i], {background:'rgba(144, 234, 159, 0.1)'} )
  }
  else if (minutesAgo < 60) { //minute
    threads[i].innerText = minutesAgo + " mins Ago";
    $(threads[i]).css({color:'green'})
    setParentElemColor(threads[i], {background:'rgba(144, 234, 159, 0.1)'} )
  } 
}






// 25889447

// 7 hours
// 420 minutes
// 25200 seconds
// 25889447

// current time + ((420*60) * 1000)



// GMT.valueOf() - ((new Date().getTimezoneOffset() * 60) * 1000)