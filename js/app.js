/////////////// Tab View /////////////////////

const opentab = (tabClass , tabContentCls) => {
    const tab = document.querySelectorAll('.tab_btn');
    const tabcontent = document.querySelectorAll('.tabcontent');
    tab.forEach (cur => {
        cur.classList.remove('active')
    })
    tabcontent.forEach (cur => {
        cur.style.display = 'none';
    })
    document.querySelector(tabClass).classList.add('active');
    document.querySelector(tabContentCls).style.display = 'flex';
}


document.querySelector('.income_div').addEventListener('click', e => {
    if (e.target.closest('.income_div')){
    opentab('.income_div', '.income');
    }
});
document.querySelector('.expense_div').addEventListener('click', e =>{
    if(e.target.closest('.expense_div')){
    opentab('.expense_div', '.expense');
    }
});

//////////////////////////////////////////
class incData {
    constructor(type, desp, value){
        this.type = type;
        this.desp = desp;
        this.value = value;
        this.id = 0;
        this.TotalIncome();
        this.createId();
    }
    TotalIncome(){
            data.totalData.inc += this.value;
            this.totalInc = data.totalData.inc;
    }
    createId () {
        const arrLength = data.allItems.inc.length;
        if(arrLength>0){
        this.id = data.allItems.inc[arrLength-1].id +1;
        } else {
            this.id = 0;
        }
    }
}
class expData {
    constructor(type, desp, value){
        this.type = type;
        this.desp = desp;
        this.value = value;
        this.TotalExpense();
        this.createId();
    }
    TotalExpense(){
            data.totalData.exp += this.value;
            this.totalExp = data.totalData.exp;
    }
    createId () {
        const arrLength = data.allItems.exp.length;
        if(arrLength>0){
        this.id = data.allItems.exp[arrLength-1].id +1;
        } else {
            this.id = 0;
        }
    }
}

//////////// data structure/////////
const data = {
    totalData: {
        exp: 0,
        inc: 0,
        parcent: 0,
    },
    allItems: {
        exp: [],
        inc: []
    },
}

const deleteArrItem = (type, id) => {
    const idArr = data.allItems[type].map(cur => cur.id);
    const index = idArr.indexOf(id);
    data.allItems[type].splice(index, 1);
}

const TotalParcent = () => {
    if(data.totalData.inc > 0){
    data.totalData.parcent = parseInt((data.totalData.exp/ data.totalData.inc)*100);
    }else {
        data.totalData.parcent = '--';
    }
}

const indivParcent = (i) => {
    if(data.totalData.inc > 0){
        return parseInt((data.allItems.exp[i].value/ data.totalData.inc)*100);
        }else {
            return '--';
        }
}

const addDecimal = (value) => {
    return value.toFixed(2);
}
///////////////DOM update /////////////////
const domUpdate = (totalParcent) => {
    document.querySelector('.total_income').textContent= `+${addDecimal(data.totalData.inc)}`;
    document.querySelector('.total_expense').textContent= `-${addDecimal(data.totalData.exp)}`;
    document.querySelector('.total_balance').textContent= addDecimal(data.totalData.inc- data.totalData.exp);
    document.querySelector('.top_percent').textContent= `${data.totalData.parcent}%`;
}

const domAdd = (data) => {
    let murkup;
    if(data.type === 'inc'){
        murkup = `<div class="inc" id="inc-${data.id}">
        <p class="cur_desp">${data.desp}</p>
        <div id="inc_details">
            <p class="cur_expense">+${addDecimal(data.value)}</p>
            <i class="fas fa-minus-circle"></i>
        </div>
    </div>`
    document.querySelector('.income').insertAdjacentHTML("beforeend",murkup)
    }
    else if (data.type === 'exp'){
        murkup = `<div class="exp" id="exp-${data.id}">
        <p class="cur_desp">${data.desp}</p>
        <div id="exp_details">
            <p class="cur_expense">-${addDecimal(data.value)}</p>
            <div class="cur_percent"></div>
            <i class="fas fa-minus-circle"></i>
        </div>
    </div>`
    document.querySelector('.expense').insertAdjacentHTML("beforeend",murkup)
    }

}


const getdate = (() => {
    const date = new Date();
    const month = date.getMonth();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = date.getFullYear();
    document.querySelector('.months span').textContent = `${months[month]} ${year}`;
})()


///////////////clear field///////////////
const clearInputData = () => {
    document.getElementById('input_desp').value ="";
    document.getElementById('input_value').value ="";
}

////////////////// input field ///////////////////
const curPrencentData = () => {
document.querySelectorAll('.cur_percent').forEach((cur,i)=>{
    cur.textContent = `${indivParcent(i)}%`;
})
}



const userDataInput = () => {
    const type = document.getElementById('type').value;
    const desp = document.getElementById('input_desp').value;
    const value = parseFloat(document.getElementById('input_value').value);
    if (desp !== '' && value!==0 && !isNaN(value)){
        let newData;
        if(type === 'exp'){
            newData = new expData(type, desp, value);
            data.allItems.exp.push(newData);
        }else if (type === 'inc'){
            newData = new incData(type, desp, value);
            data.allItems.inc.push(newData);
        }
        clearInputData();
        document.getElementById('input_desp').focus();
        TotalParcent();
        domUpdate();
        domAdd(newData);
        curPrencentData();
    }
}
document.getElementById('submit').addEventListener('click', e => {
    if(e.target.closest('#submit')){
        userDataInput();
    }
})
document.addEventListener('keypress', KeyboardEvent =>{
    if(KeyboardEvent.keyCode === 13){
        userDataInput();
    }
})
document.querySelector('.container').addEventListener('click',e => {
    if(e.target.matches('.fa-minus-circle')){
        const curID = e.target.parentNode.parentNode.id;
        const curIDArr = curID.split('-')
        const type = curIDArr[0];
        const id = parseInt(curIDArr[1]);
        if (type === 'inc'){
            document.querySelector(`#${curID}`).parentElement.removeChild(document.querySelector(`#${curID}`));
        }
        else if (type === 'exp'){
            document.querySelector(`#${curID}`).parentElement.removeChild(document.querySelector(`#${curID}`));
        }
        deleteArrItem (type, id);
        if(data.allItems[type].length> 0){
            data.allItems[type].forEach(cur => {
                console.log(cur.value)
                data.totalData[type] = 0;
                data.totalData[type] += cur.value;
            })  
        } else {
                data.totalData[type] = 0;
            }
        TotalParcent();
        domUpdate();
        curPrencentData();
    }
})