/*
 * MSG Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of MSG from the web page.
 */

// Variables
var regex = /MSG/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering MSG with Mild filter...");
	return $(":contains('msg'), :contains('Gurmeet Ram Rahim Singh'), :contains('dera sacha sauda'), :contains('ram rahim singh')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering KRK with Default filter...");
	return $(":contains('msg'), :contains('Gurmeet Ram Rahim Singh'), :contains('dera sacha sauda'), :contains('ram rahim singh')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering KRK with Vindictive filter...");
	return $(":contains('msg'), :contains('Gurmeet Ram Rahim Singh'), :contains('dera sacha sauda'), :contains('ram rahim singh')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("MSG found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", krk: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " MSG."); 
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
