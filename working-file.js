$('.forum-overview-search').append(`<a href="#" id="reorderBtn">Order by Most Recent</a>`);
$('#reorderBtn').click(reorderThreads);

// --------------- Start the Thread Sorting ---------------- //

function reorderThreads() {
  // Append new Thread Header for the groups to go into
  $('.main').append(`
  <details class="forum-group" id="group00" open="">
    <summary class="forum-stats">
      <h2 class="forum-group__heading">Ordered By Activity</h2>
      <div class="thread-plate-titles thread-plate-titles--rootview">
        <h4 class="thread-plate-title thread-plate-title--root-threads">Threads</h4>
        <h4 class="thread-plate-title thread-plate-title--root-posts">Posts</h4>
        <h4 class="thread-plate-title thread-plate-title--root-latest">Latest Post</h4>
      </div>
    </summary>
  </details>
  `);

  // Reorder threads based on post time
  var orderThreads = $('article.group-thread');

  orderThreads.sort(function(a,b) {
    var decode = function(string) {
      var output = 0;
      if (/now/.test(string)) {output = 0}
      else if (/mins/.test(string)) {output = parseInt(string)}
      else if (/hour/.test(string)) {output = parseInt(string)*60}
      else if (/day/.test(string)) {output = parseInt(string)*60*24}
      return output;
    }

    var x = decode($(a).children().children()[4].innerText),
        y = decode($(b).children().children()[4].innerText)
    console.log("info: ", 
      $(a).children().children()[4].innerText,
      $(b).children().children()[4].innerText,
      x, y, x > y);
    if (x < y) {return -1}
    if (x > y) {return 1}
    return 0;
  });

  for (var i=0; i<orderThreads.length; i++) {
    $('#group00').append(orderThreads[i]);
  }

  // Clean up old thread titles.
  $('[data-groupid]').remove();
  $('#reorderBtn').unbind('click'); // remove click listener
  $('#reorderBtn').wrap("<strike>"); // strikeout text
  $('#reorderBtn').removeAttr('id'); // remove ID for safe measure
}

// --------------------------------------------------------- //