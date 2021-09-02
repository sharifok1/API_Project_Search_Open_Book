//--------------------button click handlar---------------------------------
document.getElementById('search-btn').addEventListener('click',function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    if(searchField.value === ''){
        const error = document.getElementById('empty-mgs');
        error.innerHTML=`
        <h4>Please Enter your book Name before search!!!</h4>
        `
    }
    else{
        const emptyClean = document.getElementById('empty-mgs');
        emptyClean.textContent='';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.docs))
    
    }  
   //--------------------clean previous result and massage----------------------- 
    const cleanPastResult =document.getElementById('book-container');
    cleanPastResult.textContent = '';
    const error = document.getElementById('error-mgs');
    error.textContent = '';
    searchField.value = '';
    document.getElementById('search-found').textContent='';

})
//-------------------------search output and append/-----------------------------
const searchResult = result=>{
    if(result.length === 0){
        const error = document.getElementById('error-mgs');
        error.innerHTML=`
        <h4>Sorry!!! No result Found</h4>
        `
    }
    else{
        const containerDiv = document.getElementById('book-container');
        let numberOfresult = 0;
        result.forEach(output =>{
            numberOfresult = numberOfresult+1;
        const bookCard = document.createElement('div')
        bookCard.classList.add('col')

        bookCard.innerHTML =`
                    <div class="card">
                        <img src="https://covers.openlibrary.org/b/id/${output.cover_i}-M.jpg" class="card-img-top" alt="image note available">
                        <div class="card-body">
                          <h5 class="card-title">${output.title}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><b>Author:</b>${output.author_name}</li>
                          <li class="list-group-item"> <b>First Publish:</b>${output.first_publish_year}</li>
                          <li class="list-group-item"><b>Publisher:</b>${output.publisher}</li>
                          
                        </ul>
                    </div>
        `
        containerDiv.appendChild(bookCard);
    })
    //----search found items-------------------------------
    const totalResult =document.getElementById('search-found');
    totalResult.innerHTML=`
    <p>There are ${numberOfresult} results found for you.</p>
    `
    }
}