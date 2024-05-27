$(()=>{
    let quizData = [];
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (data, status) {
        quiz(data);
    });
    function quiz(data){
        for(let i = 0; i<data.length;++i){
            setQuestion(data[i]);
        }
    }
    function setQuestion(data){
        quizData.push(data);
        $('#ques-section').append(
            "<ul class = 'ques-cont' id =q"+data.id+"><h1 class = 'question'>Q"+data.id+"."+data.question+"</h1></ul>"
        );
        for(let i = 0;i<data.options.length;++i){
            $('#q'+data.id).append(`<li><input type="radio" name="q${data.id}" value = "${i+1}" id="q${data.id}opt${i+1}"><label for="q${data.id}opt${i+1}"<h4 class = "option">${data.options[i]}</h4></label></li>`)
        }
    }
    $("#submit-btn").on('click',function(){
        let score = 0;
        for(let i = 0;i<quizData.length;++i){
            score+=checkScore(quizData[i].id,quizData[i].answer);
        }
        $("#score").html(score);
    });
    
    function checkScore(id,answer){
        let choice = $("input[name = q"+id+"]");
        for(let i = 0;i<choice.length;++i){
            if(choice[i].checked){
                if(choice[i].value == answer){
                    $('#q'+id+'opt'+(i+1)).addClass("right");
                    return 1;
                }
                else{
                    $('#q'+id+'opt'+(i+1)).addClass("wrong");
                    $('#q'+id+'opt'+answer).addClass("right");
                    return 0;
                }
            }
        }
        return 0;
    }
})
