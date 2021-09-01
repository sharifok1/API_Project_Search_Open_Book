// button click handlar
document.getElementById('search-btn').addEventListener('click',function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    searchField.value = '';
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => searchResult(data.docs))
})

// search output and append/
const searchResult = result=>{
  
   const containerDiv = document.getElementById('book-container');
   
    result.forEach(output =>{
        console.log(output)
        const bookCard = document.createElement('div')
   bookCard.classList.add('col')

        bookCard.innerHTML =`
        <div class="card">
                        <img src="https://covers.openlibrary.org/b/id/${output.cover_i}-L.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${output.title}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><b>Author:</b>${output.author_name}</li>
                          <li class="list-group-item"> <b>First Publish:</b>${output.first_publish_year}</li>
                          <li class="list-group-item"><b>Publisher:</b>${output.publisher[0]}</li>
                          
                        </ul>
                    </div>
        `
        containerDiv.appendChild(bookCard);
    })
}