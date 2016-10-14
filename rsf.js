// ######## USER SETTINGS ######### //
var isDayLightSaving = true;
// ###### END USER SETTINGS ####### //


// ####### HERE BE DRAGONS ######## //
var currentPageIsTop = $('.forum-stat--latest').length > 0 ? true : false; // resolve by looking at the length of a jquery list
var currTime = new Date();
var threads;


// If the forum is the top level, then prepare the dates a certain way.
// Else, prepare it another way
if (currentPageIsTop) {
  threads = $('.forum-stat--latest');
} else {
  threads = $('.thread-plate__last-post-time');
}

// +----------------------+---------------+----------------------+ //
// |~~~~~~~~~~~~~~~~~~~~~~| FORUM THREADS |~~~~~~~~~~~~~~~~~~~~~~| //
// +----------------------+---------------+----------------------+ //

// Make sure there are threads to iterate through. If there are, then
// we must be on a thread listing page. Else, we must be on a post page.
if (threads.length > 0) {
  
  // This function exists because the location of the parent element changes
  // if it is the front page of the forum or not.
  var setParentElemColor = function(thread, cssToAppend) {
    if (currentPageIsTop) {
      $($(thread)[0].parentElement).css(cssToAppend);
    } else {
      // $($(thread)[0].parentElement.parentElement).css(cssToAppend);
      $(thread.parentElement).css(cssToAppend); // Sets right child's color
      $($(thread)[0].parentElement.parentElement.children[0]).css(cssToAppend); // sets left child's color
    }
  }

  // Loop through each thread, look at the time, fix the time and color the thread
  for (var i=0; i<threads.length; i++) {
    var parseDate;
    var threadDate;

    // Parse the time based on if it is from the top level page or not
    if (currentPageIsTop) {
      parseDate = threads[i].innerText.match(/(\d+)\/(\d+)\/(\d+)\s(\d+):(\d+)/);
      threadDate = new Date('20' + parseDate[3], parseDate[2]-1, parseDate[1], parseDate[4], parseDate[5]); // Gets GMT date
    } else {
      threadDate = new Date(threads[i].innerText); // Gets GMT date
    }

    // Finish date fixing. Brings GMT time equal to current time zone time.
    threadDate = new Date(threadDate - (( (new Date().getTimezoneOffset() + (isDayLightSaving*60) ) * 60) * 1000)); // converts to current time zone specific to user
    var minutesAgo = parseInt((new Date().valueOf() - threadDate.valueOf()) / 1000 / 60);
    
    // Do the magic now
    // Look at the minutes, determine what to do based on that. 
    if (minutesAgo >=10080) { //week
      threads[i].innerText = parseInt(minutesAgo/10080) + " weeks Ago";
      $(threads[i]).css({color:'darkred'}) // Set text color
      setParentElemColor(threads[i], {background:'rgba(109,0,75,0.2)'} )
    } else if (minutesAgo >= 1440) { //day
      threads[i].innerText = parseInt(minutesAgo/1440) + " days Ago";
      $(threads[i]).css({color:'orange'})
      setParentElemColor(threads[i], {background:'rgba(191, 89, 89, 0.2)'} )
    } else if (minutesAgo >= 60) { //hour
      threads[i].innerText = parseInt(minutesAgo/60) + " hours Ago";
      $(threads[i]).css({color:'yellow'})
      setParentElemColor(threads[i], {background:'rgba(234,234,145,0.2)'} )
    } else if (minutesAgo < 1) { //less than a minute
      threads[i].innerText = "Now";
      $(threads[i]).css({color:'green'})
      setParentElemColor(threads[i], {background:'rgba(144, 234, 159, 0.1)'} )
    } else if (minutesAgo < 60) { //minute
      threads[i].innerText = minutesAgo + " mins Ago";
      $(threads[i]).css({color:'green'})
      setParentElemColor(threads[i], {background:'rgba(144, 234, 159, 0.1)'} )
    } 
  }
} 

// +----------------------+---------------+----------------------+ //
// |~~~~~~~~~~~~~~~~~~~~~~| THREAD  POSTS |~~~~~~~~~~~~~~~~~~~~~~| //
// +----------------------+---------------+----------------------+ //

// If we couldn't find any threads to colorize,
// but we found forum post bodies...
else if ($('.forum-post__body').length > 0) {
  var posts = $('.forum-post__body');

  if (posts.length > 0) {
    for (var i=0; i<posts.length; i++) {

      // Replace all links with inline IMG tags (to render them)
      posts[i].innerHTML = posts[i].innerHTML.replace(/(.*)(http.+?(?:png|jpg|jpeg|bmp|gif|tif|gif))(.*)/, function(match, p1, p2, p3) {
        return p1 + "<img src='" + p2 + "' style='max-width: 670px;'>" + p3;
      });

      

    }

  }

}