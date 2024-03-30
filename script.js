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
            
                
                <button class="remove-from-cart-btn" data-name="${item.name}">
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

//Função para remover item do carrinho
cartItemsContainer.addEventListener("click", (event)=>{
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -=1;
            updateCartModal()
            return;
        }
        cart.splice(index,1);
        updateCartModal();
    }
}
//monitorar nosso inpute
addressInput.addEventListener("input", (event)=>{
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})


checkoutBtn.addEventListener("click", ()=>{
  
    const isOpen = checkRestaurantOpen();
    if(!isOpen){

        Toastify({
            text: "Ops o estabelecimento está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
            }).showToast();
        return;

    }

    
    if(cart.length === 0) return;
    if(addressInput.value ===""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }


    let totalPedido = 0;
    cart.forEach(item => {
        totalPedido += item.price * item.quantity;
    });

    //Enviar o pedido api Whats
    const cartItems = cart.map((item)=>{
        return(
            `Pedidos: ${item.name}\nQuantidade: (${item.quantity})\nPreço: R$ ${item.price}\n`
        )
    }).join("") + `Total: R$ ${totalPedido.toFixed(2)} reais\n`;

    const message = encodeURI(cartItems)
    const phone = "83988639024"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")


    cart = [];
    updateCartModal();

})

//verifcar horario
function checkRestaurantOpen(){
    const data = new Date();
    const hour = data.getHours();
    return hour >= 13 && hour < 23;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
    
}else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
