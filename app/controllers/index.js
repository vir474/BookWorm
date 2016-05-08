var books = null;
var $BM = require('BooksServices'); // instance of book manager.

$BM.setBooks(); // set books from data file.

/**
 *	Open a new View - controller for Adding Book
 * 
 * 	@param {Object} Event object from the DOM.
 */
function addBook(e) {
    Alloy.createController("addBook", $BM).getView().open();
}

/**
 *	Initialize the books object and set the main books list view
 * 
 * 	@param {} 
 */
function init(){

	books = $BM.getBooks();

/*	
	books = _.sortBy(books, function(book){
		return book.title;
	});
*/	
	if(books) {
		
//		indexes = [];
//		var sections = [];
/*	
		var bookGroups  = _.groupBy(books, function(book){
		 	return book.title.charAt(0).toUpperCase();
		});
*/		
		var dataToAdd = preprocessForListView(books);
//alert(JSON.stringify(dataToAdd)); 
 /*       
		_.each(bookGroups, function(group){

			/**
			 * Take the group data that is passed into the function, and parse/transform
			 * it for use in the ListView templates as defined in the directory.xml file.
			 */
/*			var dataToAdd = preprocessForListView(group);

			/**
			 * Check to make sure that there is data to add to the table,
			 * if not lets exit
			 */
/*			if(dataToAdd.length < 1) return;
			
			/**
			 * Create the ListViewSection header view
			 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.ListSection-property-headerView
			 */

/*			 var sectionHeader = Ti.UI.createView({
			 	backgroundColor: "#ececec",
			 	width: Ti.UI.FILL,
			 	height: 30
			 });

			 /**
			  * Create and Add the Label to the ListView Section header view
			  */
/*			 var sectionLabel = Ti.UI.createLabel({
			 	text: group[0].title.charAt(0).toUpperCase(),
			 	left: 20,
			 	font:{
			 		fontSize: 20
			 	},
			 	color: "#666"
			 });
			 sectionHeader.add(sectionLabel);

			/**
			 * Create a new ListViewSection, and ADD the header view created above to it.
			 */
/*			 var section = Ti.UI.createListSection({
				headerView: sectionHeader
			});

			/**
			 * Add Data to the ListViewSection
			 */
/*			section.items = dataToAdd;
			
			/**
			 * Push the newly created ListViewSection onto the `sections` array. This will be used to populate
			 * the ListView 
			 */
//			sections.push(section);
//		});

		/**
		 * Add the ListViewSections and data elements created above to the ListView
		 */
//alert($.bookListView.sections[0]);	
		$.bookListView.sections[0].setItems(dataToAdd);	
//		$.bookListView.sections[0].setItems(dataToAdd);
	}
};

/**
 *	Convert an array of data from a JSON file into a format that can be added to the ListView
 * 
 * 	@param {Object} Raw data elements from the JSON file.
 */
var preprocessForListView = function(rawData) {
	 
	/**
	 * Using the rawData collection, we map data properties of the users in this array to an array that maps an array to properly
	 * display the data in the ListView based on the templates defined in index.xml (levearges the _.map Function of UnderscoreJS)
	 */
	return _.map(rawData, function(item) {
		/**
		 * Create the new user object which is added to the Array that is returned by the _.map function. 
		 */
		return {
			title: {text: item.title},
			year: {text: item.year},
			genre: {text: item.genre},
			author: {text: "by: " + item.author}
		};
	});	
};

init();

Ti.App.addEventListener("refresh-data", function(e){
	init();
});

$.index.open();
