pastas
html
assests
styles

> npm init -y
> npm install -D tailwindcss

> npx tailwindcss init
cria tailwind.config.js

content: ["./**/*.{html,js}"], -> qualquer arquivo dentro da pasta raiz vai poder usar css no tailwind

dentro do styles do css importa

@tailwind base;
@tailwind components;
@tailwind utilities;

e agora script para rodar

"dev": "npx tailwindcss -i ./src/input.css -o ./src/output.css --watch"

onde que tá o arquivo global?

"dev": "npx tailwindcss -i ./styles/styles.css -o ./styles/output.css --watch"

no packge json

> npm run dev

vai buildar agora em html colocar 

<link rel="stylesheet" href="./styles/output.css">
do qual vai usar o tailwind

tailwind é como se fosse um lego...

extensão já trás as informações..

imagem de fundo, pode usar dentro tailwind
theme: {
    extend: {
      backgroundImage:{
        "home": "url('/assets/bg.png')"
      }
    },
ai posso colocar no htoml como bg-home no header, 

depois bibloteca, código

instala fonts

vai no arquivo config

fecha /> fontes

fontFamily:{
      'sans':['Roboto', 'sans-serif']
    },

<scripit> antes do body

manipular arvore de elementos - DOM


updateCartModal() foi criado e posteriormente chamado lá em cima


// abrir o modal do carrinho
cartBtn.addEventListener("click", ()=>{
    updateCartModal()
    cartModal.style.display = "flex"
})