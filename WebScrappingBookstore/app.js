//Importando dependencias importantes, react, axios, cheerio(seleciona mais facilmente os elementos html da página)
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function WebScrapping(){
  const [error, setError] = useState(null);

  useEffect(() => {
    //const fetchData variavel que vai guardar a função de puxar os dados do site
    const fetchData = async () => {
        try{
            const response = await axios.get('https://www.scrapingcourse.com/ecommerce/').then(response => {
            const $ = cheerio.load(response.data);
    }).catch(() => {
    console.log("Erro ao buscar os dados");
});
// Extraindo os nomes dos produtos
const productNames = $('.woocommerce-loop-product__title')
  .map((_, product) => $(product).text())
  .toArray();
// Exibindo os nomes dos produtos no console
console.log("Nomes dos Produtos:", productNames);
} catch (err) {
setError(err.message, "Error ao buscar dados data");
}
};

fetchData();
}, []);

if (error) {
return <div>Error: {error}</div>;
}

return (
  <div>
<h2>Scraped Product Names:</h2>
  </div>
);
}

export default WebScrapping;