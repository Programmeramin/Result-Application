const student_create_form = document.querySelector("#student_create_form");
const msg = document.querySelector(".msg");
const student_list = document.querySelector(".all-students-data")
const showStudentlist = document.querySelector(".singleStudent")
const student_edit_form = document.querySelector("#student_edit_form");
const student_result_form = document.querySelector("#student_result_form");

const msg_edit = document.querySelector(".msg-edit")
const student_edit_result_form = document.querySelector("#student_edit_result_form");




//Show all students data

const getStudents = () =>{

    const students = getDataLS("students");
    let content = '';

    if(students.length > 0){
        students.map((student, index) =>{
  
        })  
      }else{
          content = `<tr>
          <td colspan="8" class="text-center">No data found</td></tr>`
      }


    students.reverse().map((student,index) =>{
      content += `<tr>
      <td>${index +1}</td>
      <td>
          <img style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;" src="${student.photo}" alt="">
      </td>
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.reg}</td>
      <td>${timeAgo(student.createdAt)}</td>
      <td>
    
      ${student.result === null ? `<button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#student_create_modal" onclick="addResult('${student.id}')">Add Marks</button>` : `<button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#student_edit_result_modal" onclick="editResult('${student.id}')">View Marks</button>`}
    
      </td>
      <td>
      <button class="btn btn-sm btn-secondary"><i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#single_view_student_modal" onclick="viewsinglestudent('${student.roll}')"></i></button>

      <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#edit_student_modal" onclick="editStudentData('${student.id}')"><i class="fa-solid fa-edit"></i></button>

      <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash" onclick="deleteStudent('${student.roll}')"></i></button>
      </td>
      </tr>
      

      
      `
    })

    student_list.innerHTML = content;

        }

      getStudents();


// show single view student


   const viewsinglestudent = (roll) =>{

   const allStudent = getDataLS('students');
   const single = allStudent.find((data) => data.roll === roll);
   showStudentlist.innerHTML = `<img style="width: 300px;" src="${single.photo}" alt="">
     
    <h2>${single.name}</h2>
    <p>Roll:${single.roll}| Reg : ${single.reg}</p>
    
    `

   };

   // add result

   const addResult = (id) =>{
    
    student_result_form.querySelector("input[name='id']").value = id;

   }

      // add result form submit

      student_edit_result_form.onsubmit = (e) =>{
        e.preventDefault();
    
        const form_data = new FormData(e.target);
        const data = Object.fromEntries(form_data.entries());
    
    
        let oldData = getDataLS('students');
    
         oldData[oldData.findIndex(item => item.id === data.id)] = {
            ...oldData[oldData.findIndex(item => item.id === data.id)],
            result : data,
    
         }
         console.log(oldData);
    
        sendDataLS('students', oldData);
        getStudents();
        e.target.reset();
        
       };
    


   // edit result

    const editResult = (id) => {
    const data = getDataLS("students");
    const editResultData = data.find(item => item.id === id);
     
    student_edit_result_form.querySelector('input[placeholder="Bangla"]').value = editResultData.result.bangla;
    student_edit_result_form.querySelector('input[placeholder="English"]').value = editResultData.result.english;
    student_edit_result_form.querySelector('input[placeholder="Math"]').value = editResultData.result.math;
    student_edit_result_form.querySelector('input[placeholder="Science"]').value = editResultData.result.science;
    student_edit_result_form.querySelector('input[placeholder="Social Science"]').value = editResultData.result.social_science;
    student_edit_result_form.querySelector('input[placeholder="Religion"]').value = editResultData.result.religion;
    
    student_edit_result_form.querySelector('input[placeholder="id"]').value = id;


   }



   // student result form submit

   student_result_form.onsubmit = (e) =>{
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

    // uddate result

    const oldData = getDataLS("students");

    oldData[oldData.findIndex(item => item.id === data.id)] = {
        ...oldData[oldData.findIndex(item => item.id === data.id)],
    result:data,
    }

    sendDataLS('students', oldData)
    getStudents();
    e.target.reset()
   }

   //edit student data 

   const editStudentData = (id) =>{

       const oldData = getDataLS('students');

       const data = oldData.find((data) => data.id === id);

       student_edit_form.querySelector('input[name="name"]').value = data.name;
       student_edit_form.querySelector('input[name="roll"]').value = data.roll;
       student_edit_form.querySelector('input[name="reg"]').value = data.reg;
       student_edit_form.querySelector('input[name="id"]').value = data.id;  
       student_edit_form.querySelector('input[name="photo"]').value = data.photo;
       student_edit_form.querySelector("img#prevpho").setAttribute('src', data.photo);
       
       
   }

   
   //Edit form submit

   student_edit_form.onsubmit = (e) =>{
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
   

    const  getoldData  = getDataLS("students");

        //check roll reg number

        if(getoldData.some((item) => item.roll === data.roll)){
            msg_edit.innerHTML = createAlert("Roll already exist");
            let counter;
            let count;
            setTimeout((counter) => {
             let count = 0;
             msg_edit.innerHTML = '';
            },3000);
            return;
      }else if(getoldData.some((item) => item.reg === data.reg)){
        msg_edit.innerHTML = createAlert("Reg already exist");
        let counter;
        let count;
        setTimeout((counter) => {
         let count = 0;
         msg_edit.innerHTML = '';
        },3000);
      }else{
               msg_edit.innerHTML = createAlert(`<strong>${data.name}</strong> Data Edited Succes`, 'success')

               let counter;
               let count;
               setTimeout((counter) => {
                let count = 0;
                msg_edit.innerHTML = '';
               },3000);
      }
      
      
      

       getoldData[getoldData.findIndex(item => item.id === data.id)] ={
        ...getoldData[getoldData.findIndex(item => item.id === data.id)],
        ...data,
     }

    sendDataLS("students", getoldData)

    getStudents();
    e.target.reset();

   }


//delete student

const deleteStudent = (roll) =>{
   const con = confirm("Are you sure?");

   if(con){
    const oldStudent = getDataLS('students');
    const updateData = oldStudent.filter((data) => data.roll !== roll);
    sendDataLS('students', updateData);
    getStudents();

   }
       
}


// Student create form submit

student_create_form.onsubmit = (e) =>{
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries())

    //validation

    if(!data.name || !data.roll || !data.reg){
        msg.innerHTML = createAlert("All field are required");
    }else if(!isNumber(data.roll)){
        msg.innerHTML = createAlert("Invaild roll number");
    }else if(!isNumber(data.reg)){
        msg.innerHTML = createAlert("Invaild reg number");
    }else{

        e.target.reset();
      
        msg.innerHTML = createAlert(`<strong>${data.name}</strong> data created successful`, "success")

        let count;
        let counter;

        setTimeout((counter) =>{
            let count = 0;
            msg.innerHTML = '';
        }, 2000);

        
    }

    const oldStudent = getDataLS('students');

    //check roll number

    if(oldStudent.find((item) => item.roll === data.roll)){
      msg.innerHTML = createAlert("Roll already exist");
      return;
}


//check reg number

if(oldStudent.find((item) => item.reg === data.reg)){

    msg.innerHTML = createAlert('Reg Number already exist');
    
}



          oldStudent.push({
            ...data,
            result: null,
            createdAt: Date.now(),
            id: generateRandomId(),
          });
          sendDataLS('students', oldStudent)
          getStudents();
          console.log(data);
}



    // view result student

// // const members = [

// //     {
// //         id: 1,
// //         name: 'Amin',
// //         age : 43,
// //         isMarried: true,
// //         location : 'Mirpur',
// //         cell : '0179486141',
// //         isSkilled : 'IOS DEVS',
// //         movie: ['Avatar','Titanic','Pushpa']
// //     },


// //     {
// //         id: 2,
// //         name: 'ashik',
// //         age : 23,
// //         isMarried: true,
// //         location : 'Banani',
// //         cell : '0179486141',
// //         isSkilled : 'IOS DEVS',
// //         movie: ['Avatar','Titanic','Pushpa']
// //     },


// //     {
// //         id: 3,
// //         name: 'Sakil',
// //         age : 23,
// //         isMarried: false,
// //         location : 'Banani',
// //         cell : '0179486141',
// //         isSkilled : 'MERN',
// //         movie: ['Avatar','Doctor','The message']
// //     },

// //     {
// //         id: 4,
// //         name: 'Amin',
// //         age : 32,
// //         isMarried: true,
// //         location : 'Uttara',
// //         cell : '01517183565',
// //         isSkilled : 'Laravel',
// //         movie: ['Doctor','The message']
// //     },

// // ]

// // members.map((item, index) => {
// //       if(item.name == 'Amin'){
// //         console.log(item.location);
// //       }
// // })



// /**
//  * filter is multiple query er kaj kono akta database thke sobgulo data ber kore anai filter er kaj
//  */


// // console.log(members.filter((data) => data.name == 'Amin'));

// // console.log(members.filter((data) => data.age > 40));


// /**
//  * find er kaj single query akta condition jodi mile jai tahole se onno porer gulo ar nibe na kintu filter sob nibe joto ache
//  */



// // console.log(members.find((data) => data.name == 'Amin'));

// // console.log(members.filter((data) => data.name == 'Amin'));


// /**
//  * Some er kaj hocche true or false data return korbe
//  * 
//  */

// // console.log(members.some((data) => data.movie = 'Avatar'));


/**
 * Spread operator
 */

// const devs =  {
//     name : 'Amin Islam',
//     age: 33,
//     skill : 'Ios Devs',
//     foods : ['Alu','potol','lao','kumra','jamrul'],

// }


// const devsUpdate = {
//     ...devs,
//     skill : 'MERN Stack',
//     age : 43,
// }

// console.log(devsUpdate);

// devs.foods.splice(devs.foods.indexOf('kumra'),1);



// const devsUpdate = {
//     ...devs,
//     skill : [devs.skill, 'MERN Stack Devs'],
//     age : 43,
//     foods : devs.foods.filter(item => item !== 'kumra'),
// }

// const devs = [
//     {

//     name : 'Amin Islam',
//     age: 33,
//     skill : 'Ios Devs',
//     foods : ['Alu','potol','lao','kumra','jamrul'],

//     },

//     {

//         name : 'Ashik Haque',
//         age: 50,
//         skill : 'HTML Devs',
//         foods : ['Alu','potol','lao','kumra','jamrul'],
    
//         },

        
//     {

//         name : 'Shuvo Haque',
//         age: 54,
//         skill : 'Blockchain Devs',
//         foods : ['Alu','potol','lao','kumra','jamrul'],
    
//         },

        
//     {

//         name : 'Asrafi; Haque',
//         age: 50,
//         skill : 'PHP Devs',
//         foods : ['Alu','potol','lao','kumra','jamrul'],
    
//         },
// ];


    //  console.log(devs.find((item) => item.skill == 'PHP Devs'));

    // console.log(devs.findIndex((item) => item.skill === 'Blockchain Devs'));

    // devs[devs.findIndex((item) => item.skill === 'HTML Devs')] ={
     
    //     ...devs[devs.findIndex((item) => item.skill === 'HTML Devs')],

    //     skill : "Python Devs"
    // }



    console.log(getDataLS('students'));