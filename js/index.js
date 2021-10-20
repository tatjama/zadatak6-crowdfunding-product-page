/**Start Toggle Bookmark Button */

const bookmarkBtnRight = document.querySelector('.main__btns--right');
const bookmarkBtn = document.querySelector(".main__btn--right");
const toggleBookmarkBtn = () => { 
    bookmarkBtnRight.classList.toggle("active");
    bookmarkBtn.innerHTML = (bookmarkBtn.innerHTML == "Bookmark")? "Bookmarked" : "Bookmark";
    }
bookmarkBtnRight.addEventListener("click", toggleBookmarkBtn);
/*End Toggle Bookmark Button */

/**Start Hamburger Menu Button */
const hamburgerMenuButton = document.querySelector(".nav__menu");
const navMenu = document.querySelector(".nav");
const toggleMenu = () => {
    if(navMenu.style.display == "block"){
        hamburgerMenuButton.innerHTML = '<img src="./images/icon-hamburger.svg" alt="hamburger menu"/>';
        navMenu.style.display = "none";
    }else{
        hamburgerMenuButton.innerHTML = '<img src="./images/icon-close-menu.svg" alt="close menu"/>';
        navMenu.style.display = "block";
    }    
}
hamburgerMenuButton.addEventListener("click",toggleMenu);
/**End Hamburger Menu Button */

/**START  PROJECT */

const root = document.querySelector(".root");
const selectionRoot = document.querySelector(".selection__root");
const statusRoot = document.querySelector(".status");
const selectionSection = document.querySelector(".selection__wrapper");

class Project{
    constructor(amount, backers, days){
        this.target = 100000;
        this.amount = amount;
        this.backers = backers;
        this.days = days;
    }
}
class Stand{
    constructor(id, title, description, price, quantity){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
    removeStand(){
        this.quantity--;
    }
}

//Initial Values:

const backerProject = new Project(10000, 1000, 56);
const bambooStand =  new Stand(1, 'Bamboo Stand', `You get an ergonomic stand made of natural bamboo. You've helped us launch our
promotional campaign, and you’ll be added to a special Backer member list.`, 25, 101);
const blackEditionStand = new Stand(2, `Black Edition Stand `, `You get a Black Special Edition computer stand and a personal thank you. You’ll be
added to our Backer member list. Shipping is included.`, 75, 64);
const mahoganySpecialEditionStand = new Stand(3, `Mahogany Special Edition`, `You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal 
thank you. You’ll be added to our Backer member list. Shipping is included.`, 200, 1 )

const stands = [bambooStand, blackEditionStand, mahoganySpecialEditionStand];

// Rendering

const displayStatus = (project) => {
    statusRoot.innerHTML = `
    <div class="status__statistic">              
        <div class="status__item">
            <h1 class="status__h1">${project.amount}</h1>
            <p>of $100,000 backed</p>
        </div>
        <div class="status__item">
            <h1 class="status__h1">${project.backers}</h1>
            <p>total backers</p>
        </div>
        <div class="status__item">
            <h1 class="status__h1">${project.days}</h1>
            <p>days left</p>
        </div>
    </div>
    <div class="status__slider--background">
        <input class="status__slider"  type="range" name="status" />      
    </div>
    `
    const rangeSlider = document.querySelector(".status__slider");
    rangeSlider.style.width = project.amount / project.target * 100 + "%";
}

const displayStands = (stands) => {    
        root.innerHTML = 
        stands.map((stand) => {
                return `
                <section class="about__item ${!stand.quantity && "out-stock"}">
                <header class="about__header">
                <h3>${stand.title}</h3>
                <span class="about__span">Pledge ${stand.price} or more </span>
                </header>
                <p>${stand.description}
                </p>
                <footer class="about__footer">
                <h1 class="about__h1">${stand.quantity} <sup class="about__sup">left</sup></h1>
                 <button  
                    id="btn-${stand.id}"
                class= ${(stand.quantity == 0)? "about__btn--opac": "about__btn" } >${(stand.quantity == 0)? "Out of stock": "Select Reward"}</button>
                </footer>
                </section>
                `
            }    
    )   
    const standButtons = document.querySelectorAll(".about__btn");
    standButtons.forEach((el) =>{el.addEventListener('click', handleSelectReward)} ); 
}

const displaySelection = (stands, radioId) => {    
        selectionRoot.innerHTML = 
        stands.map((stand) => {
                return `
                <section class="selection__item  selection__radio-${stand.id} ${!stand.quantity && 'out-stock'}">
                    <label class="selection__container">
                        <article class="selection__description">
                            <header class="selection__header">              
                                <h3 class="selection__title">${stand.title} </h3>
                                <span class="selection__span">Pledge ${stand.price} or more</span>
                                <h3 class="selection__h3">${stand.quantity} <span class="selection__sup"> left</span></h3>
                            </header>
                            <p class="selection__text">${stand.description}</p>   
                        </article>
                        <input type="radio"  ${!stand.quantity&& "disabled "} id="radio-${stand.id}" class="radio-btn" name="pledge" value="radio-${stand.id}"/>
                        <span class="radio-mark"></span>           
                    </label>
                    <footer class="selection__footer radio-${stand.id}">
                        <p>Enter your pledge</p>
                        <div>
                            <label class="selection__container--footer" for="price">$
                                <input class="input-${stand.id} " type="number" min=${stand.price} name="price" value=${stand.price} >
                            </label>
                            <button class=" btn selection__btn">Continue</button>
                        </div>
                    </footer>
                </section>     
                `
    })
    document.querySelector(`.selection__${radioId}`).classList.add("active");
    document.getElementById(radioId).checked = "checked";
    document.querySelector(`.${radioId}`).style.display = "flex";
    document.querySelector(`.selection__radio-1`).scrollIntoView({behavior: 'smooth', block: 'start'});
    const checkButtons = document.querySelectorAll(".radio-btn");
    checkButtons.forEach((el) =>{el.addEventListener('click', handleCheckRadio)});
    const continueButtons = document.querySelectorAll(".selection__btn");
    continueButtons.forEach((el) =>el.addEventListener('click', handleContinuePledge));
    const closeButton = document.querySelector(".selection__close");
    closeButton.addEventListener('click',()=> handleClose(selectionSection));
}

const successSection = document.querySelector(".success__wrapper");
const successButton = document.querySelector(".success__btn");
successButton.addEventListener('click', () => handleClose(successSection) );
let checkedStand = "";

function handleSelectReward(){
    let radioId;
    switch(this.id){
        case "btn-1": radioId = "radio-1";
        break;
        case "btn-2": radioId = "radio-2";
        break;
        case "btn-3": radioId = "radio-3";
        break;
        default : radioId = "radio-0";
        break;         
    }
    checkedStand = radioId;
    selectionSection.style.display = "block";
    displaySelection(stands, radioId);
}

function handleCheckRadio(){
    document.querySelector(`.selection__${checkedStand}`).classList.remove("active");
    document.querySelector(`.${checkedStand}`).style.display = "none";
    checkedStand = this.id;
    document.querySelector(`.selection__${checkedStand}`).classList.add("active");
    document.querySelector(`.${checkedStand}`).style.display = "flex";
}

function handleContinuePledge(){
    switch(checkedStand){
        case "radio-1": updateProjectStatistic(stands[0]);
        break;
        case "radio-2": updateProjectStatistic(stands[1]);;
        break;
        case "radio-3": updateProjectStatistic(stands[2]);;
        break;
        default:        updateNoRewordStatistic();
        break; 
    }
    document.querySelector(`.selection__${checkedStand}`).classList.remove("active");
    document.querySelector(`.${checkedStand}`).style.display = "none";    
    displayStands(stands);
    handleClose(selectionSection);
    successSection.style.display = "block";
    //successSection.scrollIntoView({behavior: "smooth", block: "start"});
    window.scrollTo(0, 130);
}

function handleClose(section){
    section.style.display = "none";
}

function updateProjectStatistic(stand){
    stand.removeStand();
    backerProject.amount +=  document.querySelector(".input-" + stand.id).value*1;
    backerProject.backers ++;
    displayStatus(backerProject)
}

function updateNoRewordStatistic(){
    backerProject.amount += document.querySelector(".input-0").value*1;
    displayStatus(backerProject)
}

displayStands(stands);
displayStatus(backerProject);
/** END PROJECT */

