/**
    * v1.000 - Init
    * v1.001 - Handling removed sliders
*/

/**
 * Global Variables
 */

let allSliders = [
]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateSliderId(){
    const id = Math.random().toString(16).slice(2);
    return id
}

function deleteSlider(sliderId){
    let sliderGroup = document.querySelectorAll(`[slider_id="${sliderId}"]`)
    sliderGroup.forEach(s => {
        s.remove();
    });
    allSliders.forEach((s, index) => {
        if (s.s_id === sliderId) allSliders.splice(index, 1);
    });
}

function resetForm(){
    document.getElementById('sliderForm').reset();
}

function displayAlert(msg){
    let alertMsg = `You have ${msg.length} errors: \n`;
    msg.forEach(m => {
        alertMsg += `${m} \n`
    })
    alert(alertMsg);
}

function evalSettings(opt){

    let evalResult = {
        res: true,
        msg: []
    }

    // Check if Expense name, radius or color already exist
    allSliders.forEach(s =>{
        if(s.list == opt.list && s.expenseName == opt.expenseName) {
            evalResult.msg.push(" - Expense already exists");
            evalResult.res = false;
        } 
        if(s.list == opt.list && s.radius == opt.radius) {
            evalResult.msg.push(" - Radius already exists");
            evalResult.res = false;
        }
        if(s.list == opt.list && s.color == opt.color) {
            evalResult.msg.push(" - Color already exists");
            evalResult.res = false;
        }
    })


    return evalResult;
}

function handleName(name){
    if(typeof name == "string") return name.trim().toUpperCase()
}

function buildSlider(opt){
    const slider = new Slider(opt)
    slider.init()
    allSliders.push(opt);
}

function getSliderSettings(e){
    e.preventDefault()
    let sliderOptions = {}

    sliderOptions = {
        expenseName: handleName(e.target.exp_name.value),
        color: e.target.exp_color.value,
        min: parseInt(e.target.exp_min.value),
        max: parseInt(e.target.exp_max.value),
        step: parseInt(e.target.exp_step.value),
        radius: parseInt(e.target.exp_rad.value),
        list: e.target.exp_cont.value,
        initialValue: 0,
        s_id: generateSliderId()       
    };

    evalRes = evalSettings(sliderOptions);

    if(evalRes.res){
        buildSlider(sliderOptions);
        resetForm();
        return;
    } else {
        displayAlert(evalRes.msg)
        return;
    }

}

function selectedList(e){
    let selectedList = document.querySelector("#list_select").value;
    let list1 = document.querySelector('#list1-container');
    let list2 = document.querySelector('#list2-container');
    let mainContainer = document.querySelector('.main-container');

    if (selectedList == "#list1") {
        list1.style.display = "block";
        list2.style.display = "none";
        mainContainer.insertBefore(list1, list2);
    } else if (selectedList == "#list2") {
        list1.style.display = "none";
        list2.style.display = "block";
        mainContainer.insertBefore(list2, list1);
    }

}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelectorAll('.input-container').forEach(e => e.style.opacity = "1")
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelectorAll('.input-container').forEach(e => e.style.opacity = "0")
}


/**
 * Initialize sliders on startup
 */

window.addEventListener("DOMContentLoaded", ()=>{
    initSliders.forEach(opt => buildSlider(opt));
})