


  let modal = document.querySelector('.modal');
  let trigger = document.querySelector('.trigger');
  let closeButton = document.querySelector('.close-button');


export const modalToggle = () => {

  modal?.classList.toggle('show-modal')
  console.log(modal);
}

const windowOnClick = (e: Event) =>{
    if (e.target === modal){
        modalToggle();
    }
}

trigger?.addEventListener('click', modalToggle);
closeButton?.addEventListener('click', modalToggle);
window.addEventListener('click', windowOnClick);

