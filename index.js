document.addEventListener("DOMContentLoaded", main);

function fetchBooks(searchQuery) {
  const url = `https://openlibrary.org/search.json?q=${searchQuery}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data.docs);
}

function displayBooks(books) {
  const bookContainer = document.getElementById('book-container');
  bookContainer.innerHTML = '';
  books.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
    const img = document.createElement('img');
    img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    img.alt = book.title;
    img.addEventListener('click', () => showDetails(book));
    
    bookCard.appendChild(img);
    bookContainer.appendChild(bookCard);
  });
}

function showDetails(book) {
  const titleElement = document.querySelector('#detail-title');
  const detailImage = document.querySelector('.detail-image');
  const authorElement = document.querySelector('#detail-author');
  const pagesDisplay = document.getElementById('pages-display');
  const plotDisplay = document.getElementById('plot-display');
  
  detailImage.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
  titleElement.innerText = book.title;
  authorElement.innerText = book.author_name ? book.author_name.join(", ") : "Unknown";
  pagesDisplay.innerText = `Pages: ${book.number_of_pages ? book.number_of_pages : "Unknown"}`;
  plotDisplay.innerText = book.first_publish_year ? `First Published: ${book.first_publish_year}` : "Publication Year Unknown";
}

function handleNewBook(event) {
  event.preventDefault();
  const searchQuery = document.querySelector("#search").value;
  
  fetchBooks(searchQuery)
    .then(books => displayBooks(books));
}

function main() {
  const newBookForm = document.querySelector("#search-book");
  newBookForm.addEventListener('submit', handleNewBook);
}
