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
		var dataToAdd = preprocessForListView(books);

		/**
		 * Add the ListViewSections and data elements created above to the ListView
		 */
	
		$.bookListView.sections[0].setItems(dataToAdd);	
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

/**
  * Create a custom event to be fired whenever the list view needs to be updated
  * 
  */
Ti.App.addEventListener("refresh-data", function(e){
	init();
});

init();
$.index.open();
