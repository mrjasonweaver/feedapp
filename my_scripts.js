var Home = {};

Home.rssfeedsetup = function(){
	var feedurl = "http://www.nytimes.com/services/xml/rss/nyt/GlobalHome.xml",
		espntop = "http://sports.espn.go.com/espn/rss/news",
		feedlimit = 10,
		feedpointer = new google.feeds.Feed(espntop) //Google Feed API method
	
	feedpointer.setNumEntries(feedlimit) //Google Feed API method
	feedpointer.load(Home.displayfeed) //Google Feed API method
}

Home.displayfeed = function(result){
	var feedcontainer = document.getElementById("feed"),
		currentTime = new Date(),
		currentDateTime = currentTime.getTime();
	
	if (!result.error){
		for (var i = 0, max = result.feed.entries.length; i < max; i += 1) {
			var entry = result.feed.entries[i],
				dateoutput = '';
				div = document.createElement('div'),
				article = document.createElement('article'),
				section = document.createElement('section'),
				date = document.createElement('date'),
				h2 = document.createElement('h2'),
				a = document.createElement('a'),
				p = document.createElement('p'),
				button = document.createElement('button'),
				queuebutton = document.createElement('a'),
				link = document.createTextNode(entry.link),
				title = document.createTextNode(entry.title),
				content = document.createTextNode(entry.contentSnippet),
				read = document.createTextNode('read'),
			 	queue = document.createTextNode('queue'),
				readbuttons = feedcontainer.getElementsByClassName('read');
				datePub = new Date(entry.publishedDate),
				dateDateTime = datePub.getTime(),
				one_hour = 1000*60*60,
				timeElapse = (Math.ceil((currentDateTime - dateDateTime)/(one_hour)));						
				if (timeElapse === 1) {			
					timeElapse += " hour ago";
					}
				else {
					timeElapse += " hours ago";
					}
				dateoutput += timeElapse;	
				
				feedcontainer.appendChild(article);
				article.appendChild(h2);
				h2.appendChild(a);
				a.setAttribute('href', entry.link);
				a.appendChild(title);
				article.appendChild(section);
				section.setAttribute('class', 'content');
				section.appendChild(p);				
				p.appendChild(content);
				article.appendChild(date);
				article.appendChild(div);
				div.setAttribute('class', 'buttons-container');
				div.appendChild(button);
				button.appendChild(read);
				button.setAttribute('type', 'button');
				button.setAttribute('class', 'read');
				button.setAttribute('id', entry.link);
				button.setAttribute('title', entry.title);			
				date.innerHTML=dateoutput;	
								
	}
}
	else
		alert("Error fetching feeds!");
}

Home.makeContentContainer = function(jQuery) {
		var container = $('#feed'),
			viewportHeight = $(window).outerHeight(),		
			headerHeight = $('.app-header').height(),
			footerHeight = $('.app-footer').height(),
			contentHeight = viewportHeight - (headerHeight + footerHeight);
			
		container.css({
			'height':contentHeight,				
			'overflow-y':'scroll'
			});	
			
		// console.log(container);			
}

// add/remove body classes based on viewport width
Home.bodyViewportClasses = function() {
	// testing the display property on the element
	var window_w = $(window).width();
	// testing for display:block (changed in css via media queries)
	if (window_w <= '780') {			
		$("body").removeClass("multi-column").addClass("small-screen");
			Home.makeContentContainer();				
	} 
	// testing for display:none (changed in css via media queries)	
	if (window_w > '780') {
		$("body").removeClass("small-screen").addClass("multi-column");			
	}
}

window.onload = function(){
	Home.rssfeedsetup();
	Home.bodyViewportClasses();
}

// add/remove classes everytime the window resize event fires
jQuery(window).resize(function(){
	Home.bodyViewportClasses();		
});	