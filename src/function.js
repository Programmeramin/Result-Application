
const createAlert = (msg, type = 'danger') =>{
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg} <button class="btn-close" data-bs-dismiss="alert"></button></p>`
}


/**
 * send data local storage
 */

const sendDataLS = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

/**
 * Get data ls
 */

const getDataLS = (key) => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return [];
  };

/**
 *  number validation pattern
 */

const isNumber = (num) =>{
    const pattern = /^[0-9]{6,}$/;
    return pattern.test(num)
}


/**
 * Time Ago
 */
const timeAgo = (timestamp) => {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
  
    const timeElapsed = Date.now() - timestamp;
  
    if (timeElapsed < MINUTE) {
      return `${Math.floor(timeElapsed / SECOND)} seconds ago`;
    } else if (timeElapsed < HOUR) {
      return `${Math.floor(timeElapsed / MINUTE)} minutes ago`;
    } else if (timeElapsed < DAY) {
      return `${Math.floor(timeElapsed / HOUR)} hours ago`;
    } else if (timeElapsed < WEEK) {
      return `${Math.floor(timeElapsed / DAY)} days ago`;
    } else if (timeElapsed < MONTH) {
      return `${Math.floor(timeElapsed / WEEK)} weeks ago`;
    } else if (timeElapsed < YEAR) {
      return `${Math.floor(timeElapsed / MONTH)} months ago`;
    } else {
      return `${Math.floor(timeElapsed / YEAR)} years ago`;
    }
  };
  
  
  
  // create random string id function
  

  const  generateRandomId = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }
  
  // Example usage
//   const randomId = generateRandomId(); // Generates a random 8-character ID
//   console.log(randomId);
  

const getGpaGrade = (marks) =>{
    let GPA;
    let Grade;

    if(marks >= 0 && marks <= 32){
        GPA = 0;
        Grade = 'F';
    }else if(marks >= 33 && marks < 40){
     GPA = 1;
     Grade = "D";
    }else if(marks >= 40 && marks < 50){
        GPA = 2;
        Grade = "C";
       }else if(marks >= 50 && marks < 60){
        GPA = 3;
        Grade = "B";
       }else if(marks >= 60 && marks < 70){
        GPA = 3.5;
        Grade = "A-";
       }else if(marks >= 70 && marks < 80){
        GPA = 4;
        Grade = "A";
       }else if(marks >= 80 && marks <= 100){
        GPA = 5;
        Grade = "A+";
       }

       return{
       GPA: GPA,
       Grade : Grade,
       }

};



// cgpa function


const getFinalResult = (marks) =>{

  let cgpa;
  let result;

  let totalGpa =
  getGpaGrade(marks.bangla).GPA + 
  getGpaGrade(marks.english).GPA +
  getGpaGrade(marks.math).GPA +
  getGpaGrade(marks.science).GPA +
  getGpaGrade(marks.social_science).GPA +
  getGpaGrade(marks.religion).GPA;

  cgpa = totalGpa / 6;

  if(marks.bangla >= 33 && marks.english >= 33 && marks.math >= 33 && marks.science >= 33 && marks.social_science >= 33 && marks.religion >= 33 ){

   if(cgpa > 1 && cgpa < 2){
    result = 'D';
   }else if(cgpa > 2 && cgpa < 3){
    result = 'C'
   }else if(cgpa > 3 && cgpa < 3.5){
    result = 'B'
   }else if(cgpa > 3.5 && cgpa < 4){
    result = 'A-'
   }else if(cgpa > 4 && cgpa < 5){
    result = 'A'
   }else if(cgpa >= 5){
    result = 'A+'
   }

   return {
    result : result,
    cgpa : cgpa,
   }


  }else{
    return {
      result : "F",
      cgpa : cgpa,
    }
  }

}



