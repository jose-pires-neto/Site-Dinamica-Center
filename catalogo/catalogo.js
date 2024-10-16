// Produtos com categorias adicionadas
const products = [
    { id: 1, name: "Sansumg S24 Ultra 512GB", price: 7299.99, oldPrice: 15099.99, rating: 4.5, category: 'smartphone', image: "https://i5.walmartimages.com/seo/Samsung-Galaxy-S24-Ultra-5G-SM-S928B-DS-512GB-12GB-RAM-DUAL-SIM-Global-Model-Factory-Unlocked-GSM-Titanium-Gray_1e4840ab-5bd9-4483-b997-cec15dbd101f.2dc8593e555669c7dcad71a9ca89a863.jpeg" },
    { id: 2, name: "Notebook Acer Ryzen 7", price: 3999.99, oldPrice: 4499.99, rating: 4.7, category: 'notebook', image: "https://th.bing.com/th/id/R.21017b7b7f4f98b7e36ea05c993d307b?rik=2pBEJinf%2bxkFKw&pid=ImgRaw&r=0" },
    { id: 3, name: "LG Smart TV 4K", price: 2599.99, oldPrice: 2999.99, rating: 4.3, category: 'tv', image: "https://www.electrical-deals.co.uk/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/5/0/50UK6750PLD-2_1.jpg" },
    { id: 4, name: "iPhone 16 Pro", price: 10400.99, oldPrice: 15599.99, rating: 4.5, category: 'smartphone', image: "https://ares.shiftdelete.net/2023/10/iphone-16-pro-pro-max-buyuk-ekran.jpg" },
    { id: 5, name: "Macbook Air Laptop", price: 5999.99, oldPrice: 8499.99, rating: 4.7, category: 'notebook', image: "https://i.pinimg.com/originals/dc/21/b9/dc21b9f7f59aa1e57b746e7c1e10648e.jpg" },
    { id: 6, name: "Sansumg Smart TV 4K", price: 3599.99, oldPrice: 6999.99, rating: 4.3, category: 'tv', image: "https://th.bing.com/th/id/OIP.IcBpykpTql5p9hT2ef49nAAAAA?rs=1&pid=ImgDetMain" },
];

// Exibição dos produtos
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="col">
                <div class="card product-card" data-category="${product.category}">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="product-name">${product.name}</h5>
                        <p class="product-discount">R$ ${product.oldPrice.toFixed(2)}</p>
                        <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                        <p class="product-rating">Avaliação: ${product.rating}⭐</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Filtro e pesquisa
function filterProducts() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const filterOptions = Array.from(document.getElementsByClassName('filter-option'))
        .filter(option => option.checked)
        .map(option => option.value);

    // Verificar se os filtros estão sendo aplicados corretamente
    console.log("Opções de filtro selecionadas:", filterOptions);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchInput);
        const matchesFilter = filterOptions.length === 0 || filterOptions.includes(product.category);
        return matchesSearch && matchesFilter;
    });

    // Exibir produtos filtrados
    displayProducts(filteredProducts);
}

// Mostrar ou esconder o menu de filtros
function toggleFilterMenu() {
    const filterMenu = document.getElementById('filter-menu');
    filterMenu.style.display = filterMenu.style.display === 'none' ? 'block' : 'none';
}

// Adicionar listeners para filtro e pesquisa
document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('change', filterProducts); // Chamar filtragem ao alterar filtros
});

document.getElementById('search-bar').addEventListener('input', filterProducts); // Filtrar ao digitar na pesquisa

// Inicializar a página
displayProducts();



// Inicializando o carrinho como um array vazio
let cart = [];

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    // Atualizando a lista de itens no carrinho
    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} - R$ ${item.price.toFixed(2)}
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remover</button>
            </li>
        `;
        cartItems.innerHTML += cartItem;
    });
    
    // Atualizando o total e a contagem de itens
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);  // Remove o item na posição 'index'
    updateCartUI();
}

// Função para enviar o pedido para o WhatsApp
function sendOrder() {
    let message = "Olá, gostaria de solicitar um orçamento dos seguintes itens:%0A";
    let total = 0;
    
    cart.forEach(item => {
        message += `- ${item.name} (R$ ${item.price.toFixed(2)})%0A`;
        total += item.price;
    });
    
    message += `%0ATotal: R$ ${total.toFixed(2)}`;
    
    // Redirecionando para o WhatsApp com a mensagem formatada
    const phoneNumber = "559188215343";  // Substitua pelo número de WhatsApp desejado
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Exibindo os produtos (essa função já estava correta no código anterior)
displayProducts();
