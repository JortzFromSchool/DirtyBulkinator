document.addEventListener('DOMContentLoaded', () => {
    require('./scripts/calculator.js');
});
const apiRequest = (query = 'curry') => {
    fetch(`/api/food-database/v2/parser?searchTerm=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }