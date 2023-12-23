const bellBtn = document.querySelector('#icon-bell');
const bellMenu = document.querySelector('#icon-bell-menu');
const profileBtn = document.querySelector('.js-menu');
const profileMenu = document.querySelector('#icon-profile-menu');
const articleBlock = document.querySelector('main > article');
const cancelBtn = document.querySelector('.cancel');
const accordion = document.querySelector('#accordion');
const chevronUp = document.querySelector('.heading-context button');
const accordionTask = document.querySelectorAll('#accordion .task');

const checkedImg = document.querySelectorAll('.checked-img');
const progress = document.querySelector('.progress');
const progressCompleted = document.querySelector('.progress-completed');

let logo = document.querySelector('.logo img');
let mql = window.matchMedia('(max-width:750px)');

function render(e) {
  if (e.matches) {
    logo.src = 'https://crushingit.tech/hackathon-assets/shopify-icon.svg';
    profileBtn.id = 'dc-menu';
    profileBtn.innerHTML = 'DC';
  } else {
    logo.src = 'https://crushingit.tech/hackathon-assets/shopify-icon-desktop.svg';
    profileBtn.id = 'icon-profile';
    profileBtn.innerHTML = 'Davii Collections <span>DC</span>';
  }
}

render(mql);

mql.addEventListener('change', render);

document.addEventListener('click', (e) => {
  if (e.target.id === 'icon-bell' || e.target.parentElement.id === 'icon-bell') {
    bellMenu.classList.toggle('bell-menu-hidden');
  } else {
    bellMenu.classList.add('bell-menu-hidden');
  }
  if (
    e.target.className === 'js-menu' ||
    e.target.parentElement.className === 'js-menu'
  ) {
    profileMenu.classList.toggle('profile-menu-hidden');
  } else if (
    e.target.id === 'icon-profile-menu' ||
    e.target.parentElement.id === 'icon-profile-menu' ||
    e.target.parentElement.parentElement.id === 'icon-profile-menu'
  ) {
    profileMenu.classList.remove('profile-menu-hidden');
  } else {
    profileMenu.classList.add('profile-menu-hidden');
  }
});

cancelBtn.addEventListener('click', () => {
  articleBlock.style.display = 'none';
});

let isOpen = true;
let rotate = 0;

chevronUp.addEventListener('click', () => {
  const taskContainer = document.querySelector('#accordion .task-container');
  rotate += 180;
  taskContainer.style.display = isOpen ? 'none' : 'flex';
  chevronUp.style.transform = `rotate(${rotate}deg)`;
  isOpen = !isOpen;
});

accordionTask.forEach((item, index) => {
  const background = '#f1f1f1';
  const taskHeader = item.querySelector('.task-header');
  const accordionContent = item.querySelector('.task-content');
  taskHeader.addEventListener('click', () => {
    item.classList.toggle('open');

    if (item.classList.contains('open')) {
      item.style.height = 'auto';
      accordionContent.style.display = 'block';
      taskHeader.style.fontWeight = '600';
      item.style.backgroundColor = background;
    }
    removeOpen(index);
  });
});

function removeOpen(index1) {
  accordionTask.forEach((item2, index2) => {
    const taskHeader = item2.querySelector('.task-header');
    const accordionContent = item2.querySelector('.task-content');

    if (index1 != index2) {
      item2.classList.remove('task-default');
      item2.classList.remove('open');
      accordionContent.style.display = 'none';
      item2.style.height = '1.7rem';
      taskHeader.style.fontWeight = '500';
      item2.style.backgroundColor = 'initial';
    }
  });
}

checkedImg.forEach((item, index) => {
  item.addEventListener('click', () => {
    item.classList.toggle('rot');
    const progressVal = document.querySelectorAll('.rot').length;

    if (progressVal >= 0 && progressVal <= 5) {
      progress.style.width = `${progressVal}rem`;
    }
    progressCompleted.innerText = `${progressVal}/5 completed`;
    if (item.classList.contains('rot')) {
      item.src = 'https://crushingit.tech/hackathon-assets/icon-spinner.svg';
      item.style.transition = 'all 1.5s linear';
      setTimeout(() => {
        item.src = 'https://crushingit.tech/hackathon-assets/icon-checkmark-circle.svg';
        item.style.filter = 'invert(0)';
        item.style.transition = 'none';
      }, 1500);
    } else {
      item.src = 'https://crushingit.tech/hackathon-assets/icon-dashed-circle.svg';
      item.style.filter = 'invert(0.5)';
    }
  });
});
