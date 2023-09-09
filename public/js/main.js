const cityName=document.getElementById('cityName')          //User input  
const submitBtn=document.getElementById('submitBtn')
const city_name=document.getElementById('city_name')        // output part
const temp_real_val=document.getElementById('temp_real_val')
const temp_status=document.getElementById('temp_status')
const datahide=document.querySelector('.middele_layer')
const day=document.getElementById('day')
const today_date=document.getElementById('today_date')



const getInfo=async(event)=>{
    event.preventDefault();   // The preventDefault() method of an event is used to stop a cancelable event from executing
    let cityVal=cityName.value;
    if(cityVal===""){
        city_name.innerText=`Plz write the name before search`
        datahide.classList.add('data_hide')  // hide temprature part if not data present 
        
    }else{
    try{
        let url =`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=7a16ad8c8f1f6e21450b667f20f9ebf0`
        const response =await fetch(url)        // await => wait for the data
        const data =await response.json()  // convert Api data into object 
        const arrData=[data]                // convert object data into array data 

        city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`;

        temp_real_val.innerText=arrData[0].main.temp
        // temp_status.innerText=arrData[0].weather[0].main

        


        const tempMood=arrData[0].weather[0].main;
          if (tempMood=='Clear'){
            temp_status.innerHTML=
            '<i class="fas fa-sharp fa-solid fa-sun" style="color: #eccc68;"></i>'
          }else if (tempMood=='Cloud'){
            temp_status.innerHTML=
            '<i class="fas fa-sharp fa-solid fa-cloud" style="color: #dfe4ea;"></i>'
          }else if(tempMood=='Rain'){
            temp_status.innerHTML=
            '<i class="fas fa-sharp fa-solid fa-cloud-rain" style="color: #a4bobe;"></i>'
          }else{
            temp_status.innerHTML=
            '<i class="fas fa-sharp fa-solid fa-sun" style="color: #eccc68;"></i>'
          }
        datahide.classList.remove('data_hide')  // remove hide temprature when data is not found 



    }catch{
        city_name.innerText=`Plz enter the city name properly`
        datahide.classList.add('data_hide')  // hide temprature part if not data present 

    }
    }
}

const getCurrentDay=()=>{
    const weekday = new Array();
    weekday[0]='Sun';
    weekday[1]='Mon';
    weekday[2]='Tue';
    weekday[3]='Wed';
    weekday[4]='Thu';
    weekday[5]='Fri';
    weekday[6]='Sat';

    let currentTime=new Date()
    let day= weekday[currentTime.getDay()]
    return day
}
day.innerHTML=getCurrentDay()


const getCurrentDate=()=>{
    var months=[
        "Jan",
        'Fab',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]

    var now =new Date()
    var month = months[now.getMonth() +1]
    var date = now.getDate()
    var year =now.getFullYear()

    return `${date} ${month} ${year}`
  }


today_date.innerHTML=getCurrentDate()








submitBtn.addEventListener('click', getInfo)