const search_result_form = document.getElementById("search_result-form");
const student_result_sheet = document.querySelector(".student_result_sheet")
search_result_form.onsubmit = (e) =>{
 e.preventDefault();

 const form_data = new FormData(e.target);
 const data = Object.fromEntries(form_data.entries());

 let oldData = getDataLS('students');

 const studentResult = oldData.find((item) => item.roll === data.roll && item.reg === data.reg);

 let content;

 if(studentResult){

    content = `  <div class="student-info">
    <img class="shadow" style="width: 150px; height: 150;" src="${studentResult.photo}" alt="${studentResult.photo}">

       <h3>${studentResult.name}</h3>
 <p>Roll: ${studentResult.roll}| Reg : ${studentResult.reg}</p>

 ${getFinalResult({

    bangla : studentResult.result.bangla,
    english : studentResult.result.english,
    math : studentResult.result.math,
    science : studentResult.result.science,
    social_science: studentResult.result.social_science,
    religion : studentResult.result.religion,

}).result === "F" ?  "<h2 style='color:red;'>Failed</h2>" : "<h2 style='color:green;'>Passed</h2>"
}


 <hr/>

  <table class="table table-bordered">
      <tr>
      <td>Subject</td>
      <td>Marks</td>
      <td>GPA</td>
      <td>CGPA</td>
      <td>FinalGrade</td>

      <td>Final Result</td>
      </tr>

      <tr>
          <td>Bangla</td>
          <td>${studentResult.result.bangla}</td>
          <td>${getGpaGrade(studentResult.result.bangla).GPA}</td>
          <td>${getGpaGrade(studentResult.result.bangla).Grade}</td>
          <td rowspan="6">${getFinalResult({

                bangla : studentResult.result.bangla,
                english : studentResult.result.english,
                math : studentResult.result.math,
                science : studentResult.result.science,
                social_science: studentResult.result.social_science,
                religion : studentResult.result.religion,

            }).cgpa.toFixed(2)
        }</td>
          <td rowspan="6"> ${
            getFinalResult({
            bangla : studentResult.result.bangla,
            english : studentResult.result.english,
            math : studentResult.result.math,
            science : studentResult.result.science,
            social_science: studentResult.result.social_science,
            religion : studentResult.result.religion

        }).result
    }
          
          </td>
          
      </tr>

      <tr>
          <td>English</td>
          <td>${studentResult.result.english}</td>
          <td>${getGpaGrade(studentResult.result.english).GPA}</td>
          <td>${getGpaGrade(studentResult.result.english).Grade}</td>
         
      </tr>

      <tr>
          <td>Math</td>
          <td>${studentResult.result.math }</td>
          <td>${getGpaGrade(studentResult.result.math).GPA}</td>
          <td>${getGpaGrade(studentResult.result.math).Grade}</td>
         
      </tr>


      <tr>
          <td>Science</td>
          <td>${studentResult.result.science}</td>
          <td>${getGpaGrade(studentResult.result.science).GPA}</td>
          <td>${getGpaGrade(studentResult.result.science).Grade}</td>
         
      </tr>
      
      <tr>
          <td>Social Science</td>
          <td>${studentResult.result.social_science}</td>
          <td>${getGpaGrade(studentResult.result.social_science).GPA}</td>
          <td>${getGpaGrade(studentResult.result.social_science).Grade}</td>
          
      </tr>

      <tr>
          <td>Religion</td>
          <td>${studentResult.result.religion}</td>
          <td>${getGpaGrade(studentResult.result.religion).GPA}</td>
          <td>${getGpaGrade(studentResult.result.religion).Grade}</td>
          
      </tr>

  
  </table>

</div>
    
    `

 }else{
        content = 'Result not found'
 }

 student_result_sheet.innerHTML = content;

}