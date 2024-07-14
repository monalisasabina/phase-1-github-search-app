document.addEventListener('DOMContentLoaded', () =>{ 

    const searchForm = document.getElementById('github-form');
    const usernameInput = document.getElementById('search');
    const resultsDiv = document.getElementById('user-list');
   
    searchForm.addEventListener('submit', (event) => {
     event.preventDefault(); 
    searchForm.reset()

     const user = usernameInput.value;
   
     // Build the GitHub User Search API URL
     const url = `https://api.github.com/search/users?q=${user}`;
   
     fetch(url)
       .then(response => response.json())
       .then(data => {
   
         resultsDiv.innerHTML = `
             <h2>Results</h2>
             <p>Username: ${data.login}</p>
             <img src="${data.avatar_url}" alt="${data.login} avatar">
             <a href="${data.html_url}"</a>
             <button type='submit'>Show Repos</button>
             `;
             
         
       })
       .catch(error => {
         // Handle errors (e.g., user not found)
         resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
       });
     
       const userReposButton = resultsDiv.querySelector('button');
       userReposButton.addEventListener('click', handleUserReposClick);  
   });
})

// .......step 3......................
function handleUserReposClick(event) {

    const userReposUrl= `https://api.github.com/users/${user}/${repos}`
    userReposUrl.event.target.dataset
  
    fetch(userReposUrl)
      .then(response => response.json())
      .then(reposData => {
        // Handle successful user repos data fetch
        let repoList = '';
        reposData.forEach(repo => {
          repoList += `
             <li>
               <a href="${repo.html_url}">${repo.name}</a>
            </li>
            `;
        });
        resultsDiv.innerHTML += `<h3>Repositories</h3><ul>${repoList}</ul>`;
      })
      .catch(error => {
        // Handle errors
        resultsDiv.innerHTML += `<p>Error fetching repos: ${error.message}</p>`;
      });
  }
