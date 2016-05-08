// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var $BM = $.args; 										// get our book manager object 
var books = null;
var textfields = [$.title, $.year, $.genre, $.author]; 	// place all the textfields to be validated here
var errors = null;

books = $BM.getBooks();									// get books from book manager.

/**
 *	Add book event callback function - validation and addition of book from the View to Persistance Layer.
 * 
 * 	@param {} 
 */
function addBook() {
	errors = validate();
	if( errors.length == 0 || errors === null ) { 
		insertBook();
		closeWindow();
	}
	else {
		for (var i in errors) {
			errors[i].hintTextColor = "#f44336"; 						// sets red color text for errors.
			errors[i].hintText = errors[i].name + " cannot be empty";	// field name error message.
		}
	}
}

/**
 *	Put focus on the title field
 * 
 * 	@param {}
 */
function focusTitleField() {
    $.title.focus();
}

function closeKeyboard(e) {
    e.source.blur();
}

/**
 *	Close the add book window.
 * 
 * 	@param {}
 */
function closeWindow() {
//	Ti.App.fireEvent("refresh-data");
    $.addWin.close();
}

/**
 *	create a new book object and insert into persistance layer using bookmanager.
 * 	Uses the form fields from the addbook view 
 * 
 * 	@param {}
 */
function insertBook() {
	var book = {};
		book.id="gddsg675643w4"; 		// constant is ok for now but consider unique later.
		book.title=$.title.value;
		book.year=$.year.value; 
		book.genre=$.genre.value;
		book.author=$.author.value;
	$BM.insertBook(book); 				// Add book to the main books array. 
	Ti.App.fireEvent("refresh-data"); 	// refresh the view on main booklist view.
}

/**
 *	validate the fields provided in textfields array.
 * 
 * 	@param {}
 * 
 *  @return {object} errors - an array object containing all the errors fields. 
 */
function validate() {
	var errors = [];
	for (var i in textfields) {
            if (textfields[i].value === '' || textfields[i].value === null || textfields[i].value === undefined ) {
                errors.push(textfields[i]);
            }
    }
    return errors;
}