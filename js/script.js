document.addEventListener("DOMContentLoaded", ()=>{
    const menuResponsivo = document.getElementById("menuResponsivo");
    const navMenu = document.getElementById("nav-menu");

    menuResponsivo.addEventListener("click", () =>{
        navMenu.classList.toggle("active");
    })//Fecha menu responsivo
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link)=>{
        link.addEventListener("click", () =>{
            navMenu.classList.remove("active");
        });
    });
    //EStrutura carroussel
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let slideAtual = 0;
    let slideIntervalo;

    function showSlide(index){
        slides.forEach((slide) =>
        slide.classList.remove("active"));
        dots.forEach((dots) =>
        dots.classList.remove("active"));

        slideAtual = (index + slides.length)
        % slides.length;
        
        slides[slideAtual].classList.add("active");
        dots[slideAtual].classList.add("active");
    }

    function nextSlide (){
        showSlide(slideAtual + 1);
    }

    function prevSlide(){
        showSlide (slideAtual - 1);
    }

    function startSlide(){
        slideIntervalo = setInterval(nextSlide, 5000);
    }

    function stopSlide(){
        clearInterval(slideIntervalo);
    }

    nextBtn.addEventListener("click", () =>{
        nextSlide();
        stopSlide();
        startSlide();
    });

    prevBtn.addEventListener("click", () =>{
        prevSlide();
        stopSlide();
        startSlide();
    });
    
    //Dar funcionalidade para as bolinhas de navegação
    dots.forEach((dot) =>{
        dot.addEventListener("click",(e) =>{
            const index = parseInt(e.target.getAttribute("data-index"));
            showSlide(index);
            stopSlide();
            startSlide();
        });
    });
    //Iniciar os slides de forma automática
    startSlide();

    //Validação campo formulário
    const contatoForm = document.getElementById("contatoForm");
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    contatoForm.addEventListener("submit",(event)=>{
        event.preventDefault();

        //LImpar os erros a partir da segunda submissão
        clearError();

        let isValid = true;

        //Validação campo nome (min 3 caracteres)
        if(nome.value.trim().length < 3)
            {
                showErro(nome, "O nome deve ter no mínimo três caracteres.");
                isValid = false;
        }
        //Verificar se campo email é válido
        if(!isEmailValid(email.value.trim()))
            {
                showErro(email, "Insira um e-mail válido");
                isValid = false;
        }
        //Validação campo mensagem
        if(mensagem.value.trim().length < 10)
        {
            showErro(mensagem, "A mensagem deve ter no mínimo 10 caracteres.")
            isValid = false;
        }

        if(isValid){
            clearError();
            showToast("Mensagem enviada com sucesso");
            contatoForm.reset();
        }
    });

    function showToast(mensagemCadastro){
        const toast = document.getElementById("toast");
        const toastMensagem = document.getElementById("toastMensagem");
        toastMensagem.textContent = mensagemCadastro;
        toast.classList.add("show");
        setTimeout(() =>{
            toast.classList.remove("show");
        }, 3000);

    }

    function isEmailValid (email)
    {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
    //Remover a borda vermelha nos inputs
    [nome, email, mensagem].forEach((input) =>{
        input.addEventListener("input", () =>{
            clearFieldError(input);
        });
    });

    function showErro(inputElement, mensagem)
    {
        const formGroup = inputElement.parentElement;
        clearFieldError(inputElement);
        inputElement.classList.add("input-error");
        const erroMensagem = document.createElement("small");
        erroMensagem.className = "error-text";
        erroMensagem.innerText = mensagem;
        formGroup.appendChild(erroMensagem);
    }

    function clearFieldError(inputElement){
        const formGroup = inputElement.parentElement;

        inputElement.classList.remove("input-error");
        const removerErro = formGroup.querySelector(".error-text");
        if(removerErro){
            removerErro.remove();
        }
    }

    //Remover erro dos campos de forma indivídual
    function clearError(){
        document.querySelectorAll(".error-text").forEach((el) => el.remove());
    //Remover erro de todos os campos
        document.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
    }
});//Final função evento carregar todo HTML