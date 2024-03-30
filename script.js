const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

// abrir o modal do carrinho
cartBtn.addEventListener("click", ()=>{
    updateCartModal()
    cartModal.style.display = "flex"
})

//fechar o modal quando clicar fora
cartModal.addEventListener("click", (event)=>{
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})
//clicou no fechar já fecha
closeModalBtn.addEventListener("click", (event)=>{
    cartModal.style.display = "none"
})
// classe smepre começa com ponto
menu.addEventListener("click", (event)=>{
    let parentButton = event.target.closest(".add-to-cart-btn")
    //clicou no botão adicionar
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name,price)
    }
    
    // console.log(parentButton);
})

//Funcao para adicionar no carrinho
function addToCart(name, price){
    
    const existingItem = cart.find(item=> item.name === name)
    if(existingItem){    
        existingItem.quantity += 1;    
    }else{
        cart.push({
            name,   
            price,
            quantity: 1,
        })    
    }

    updateCartModal()
}

//Atualiza carrinho

function updateCartModal(){

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
            
                
                <button>
                    Remover
                </button>
            
            </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    })
    
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"   
    });

    cartCounter.innerHTML = cart.length;

}