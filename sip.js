const monthlyinvestmentinput = document.querySelector(".sip-amount");
const intrestrateinput = document.querySelector(".expected-return");
const tenureinput = document.querySelector(".time-period");

const Investedamtvalue = document.querySelector(".invested-amount .value");
const Estimatedreturn = document.querySelector(".est-return .value");
const Totalvalue=document.querySelector('.total-value .value');

const calculatebtn = document.querySelector(".calculate-btn");

let monthlyinvestment = parseFloat(monthlyinvestmentinput.value);
let intrestrate = parseFloat(intrestrateinput.value);
let tenure = parseFloat(tenureinput.value);

let intrest = intrestrate/12/100;
let myChart;

const checkValues = () => {
    let monthlyinvestmentvalue = monthlyinvestmentinput.value;
    let intrestratevalue = intrestrateinput.value;
    let tenurevalue = tenureinput.value;

    let regexNumber = /^[0-9]+$/;

    if(!monthlyinvestmentvalue.match(regexNumber)){
        monthlyinvestmentinput.value = "20000";
    };

    if(!tenurevalue.match(regexNumber)){
        tenureinput.value = '12';
    };

    let regexdecimalnumber = /^(\d*\.)?\d+$/;

    if(!intrestratevalue.match(regexdecimalnumber)){
        intrestrateinput.value = "10";
    };
}

const displayChart = (totalinvestmentvalue , estimatedreturnvalue) => {
    myChart = new Chart("myChart", {
        type: "pie",
        data: {
          labels: ['Total Investment','Estimated Return'],
          datasets: [{
            backgroundColor: ["#e63946", "#14213d"] ,
            data: [totalinvestmentvalue, estimatedreturnvalue]
          }]
        },
        
      });
};

const updateChart = (totalinvestmentvalue , estimatedreturnvalue)  => {
    myChart.data.datasets[0].data[0] = totalinvestmentvalue;
    myChart.data.datasets[0].data[1] = estimatedreturnvalue;
    myChart.update();

}


const sip_calculate = () => {
    checkValues();
    refreshInputValues();
    let fv = monthlyinvestment * ([Math.pow(1+intrest,tenure)-1]/intrest) * (intrest+1)
    return fv;
};



const updateData = (fv) => {
    let total_investment = Math.round(monthlyinvestment * tenure)
    Investedamtvalue.innerHTML = total_investment;
    

    let estr = fv - total_investment;
    Estimatedreturn.innerHTML = Math.round(estr);
    
    Totalvalue.innerHTML = Math.round(fv);
    let n_estr = Math.round(estr);

    if (myChart) {
        updateChart(total_investment, n_estr);
    } else {
    displayChart(total_investment, n_estr);
    }

    
};

const init = () =>{
    
    let fv = sip_calculate();
    updateData(fv);
};

const refreshInputValues = () => {
    monthlyinvestment = parseFloat(monthlyinvestmentinput.value);
    intrestrate = parseFloat(intrestrateinput.value);
    tenure = parseFloat(tenureinput.value);

    intrest = intrestrate/12/100;
    total_investment = monthlyinvestment * tenure ;

};

init();

calculatebtn.addEventListener("click", init);