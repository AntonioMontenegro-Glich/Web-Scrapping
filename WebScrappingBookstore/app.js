import React, { useState, useEffect} from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function WebScrapping(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    //const fetchData variavel que vai guardar a função de puxar os dados do site
    const fetchData = async () => {
        try{
            const response = await
    axios.get('https://www.scrapingcourse.com/ecommerce/').then(response => {
    const $ = cheerio.load(response.data);
    }).catch(() => {
    console.log("Erro ao buscar os dados");
});

const productNames = $('.woocommerce-loop-product__title')
.map((_, product) => {
  const $product = $(product);
  return $product.text();
})
.toArray(); // Convert to array for better handling

setData(productNames);
} catch (err) {
setError(err.message || "Error fetching data");
}
};

fetchData();
}, []);

if (error) {
return <div>Error: {error}</div>;
}

if (!data) {
return <div>Loading...</div>;
}

return (
<div>
<h2>Scraped Product Names:</h2>
<ul>
{data.map((name, index) => (
<li key={index}>{name}</li>
))}
</ul>
</div>
);
}

export default WebScrapping;