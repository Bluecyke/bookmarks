// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save Bookmark
function saveBookmark(e){
    // Get from values
    var siteName =document.getElementById('siteName').value;
    var siteUrl =document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }
    
    // Creates the object
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //initialize array
       var bookmarks = [];
       // add to array
       bookmarks.push(bookmark);
        // set to localStorage, converts the JSON array into string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from LocalStorage, as JSON
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        //Reset it back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    // clear form
    document.getElementById('myForm').reset();
    
    //re-fetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
    
} //end of function saveBookmark(e)


// Delete Bookmarks
function deleteBookmark(url){
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // Loop through bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }  
    //Reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //re-fetch bookmarks
    fetchBookmarks();
    
} //end of function deleteBookmark(url)


//Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from LocalStorage, as JSON
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    // Build Output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML +=
        '<div class="card card-block">'+
        '<h3>' + name +
        ' <a class="btn btn-primary" target="_blank" href="' + url + '">Visit</a> '+
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
        '</h3>'+
        '</div>'+ 
        '<br>';
    }
    
} // end of function fetchBookmarks()


function validateForm(siteName, siteUrl){
    // validation for empty forms
    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }
    
    // validation for URL format
    var expression = ("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    
    //if it passes validatiomn
    return true;
    
} //end of function validateForm()

