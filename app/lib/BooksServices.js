/**
 *	A utility class to provide an persistance layer for Book management. 
 * 
 */
var BooksManager = {
		
	books: Alloy.Globals.booksGlobal,
	
	/**
 	  *	set books array from the data file and set books array as a global application object. 
 	  * 
 	  * @param {}
 	  */
	setBooks: function() {
	
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "sampleData/data.json"); 
	
		books = JSON.parse(file.read().text).books;
		Alloy.Globals.booksGlobal = books;
	},
	
	/**
 	  *	return books array.
 	  * 
 	  * @param {}
 	  */
	getBooks: function() {
		return books;
	},
	
	/**
 	  *	Adds a book into the main books array.
 	  * 
 	  * @param {object} book - a book object from the controller.
 	  */
	insertBook: function(book) {
		books.unshift(book);
		Alloy.Globals.booksGlobal = books;
	}	
};
module.exports = BooksManager;