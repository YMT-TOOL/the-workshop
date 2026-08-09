const header=document.querySelector(".site-header");
window.addEventListener("scroll",()=>{window.scrollY>40?header.classList.add("scrolled"):header.classList.remove("scrolled")});

const revealElements=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("is-visible")}
  });
},{threshold:.15});
revealElements.forEach(el=>observer.observe(el));

const contactForm=document.querySelector("#contactForm");
const formMessage=document.querySelector("#formMessage");

contactForm.addEventListener("submit",async(event)=>{
  event.preventDefault();
  const formData=new FormData(contactForm);
  formMessage.textContent="Sending...";

  try{
    const response=await fetch(contactForm.action,{
      method:"POST",
      body:formData,
      headers:{Accept:"application/json"}
    });

    if(response.ok){
      formMessage.textContent="Thanks. Your message has been sent.";
      contactForm.reset();
    }else{
      formMessage.textContent="送信できませんでした。少し時間をおいて、もう一度お試しください。";
    }
  }catch(error){
    formMessage.textContent="通信エラーが発生しました。ネット接続を確認して、もう一度お試しください。";
  }
});
