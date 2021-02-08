// 로또 번호를 관리하는데 필요한 변수들!
let isCreate = false // 생성중엔 true가 됨.(생성중..일떄는 생성하기를눌러도 새로운번호가 선택되지않음 )
const lotto = new Array(6)
let step = 0; // 이것이 6이되면 생성 완료 
let intervalId = 0; // setInterval 관리용.
const createComment = ["생성중..","생성중...","생성중."]


// 1~45번호 생성용 함수
function creatWholeNumber(){
	for(let i=1; i<=45; i++){
		const numDiv = document.createElement("div")
		numDiv.innerHTML = `<p class="number">${i}</p>`
		numDiv.id = `no-${i}`
		$(".js-numbers").append(numDiv)
	}
}

function clearNumbers(){
	// 선택된 숫자들이 선택되었다는 표시를 없앤다! 
	$(".selected").removeClass("selected")
}

// 여섯 개의 번호 선택해주는 함수
function createNumbers(){
	if(isCreate){
		return; // isCreate가 참이다 = 생성중이다. 일 때는 함수를 강제 종료 ! 
	}
	isCreate = true; // 생성해도 된다면 생성상태로 바꾼다.
		
	// 이미 선택되어있던 애들(색이 칠해진애들)은 다 정리하기!(다시 하얀색으로 만들기!)
	clearNumbers();
	
	let count = 0;
	let flag = true;
	
	while(count<6){
		let number = parseInt(Math.random() * 45) + 1;
		
		for(let i=0; i<count; i++){
			if(lotto[i] == number){
				flag = false; // 뽑은 숫자 중 중복이 있으면 flase가됨! 
			}
		}
		if(flag){
			lotto[count] = number;
			count++;
		}
		flag = true; // false였던 flag를 true로 바꿈.(앞으로도 계속 중복검사를 할것이다.)
	}
	// console.log(lotto) // 테스트..
	
	// 선정된 6개의 숫자를 0.5초마다 하나씩 보여주기.
	$(".ing").addClass("visible")
	intervalId = setInterval(pointNumbers, 500)
}

// 배열 lotto에 번호 여섯개가 다 들어갔다고 가정!
function pointNumbers(){
	$(`#no-${lotto[step]}`).addClass("selected")
	$(".ing").text(createComment[step % 3])
	step++;
	
	// 번호 표시가 끝나면?! 
	if(step == 6){
		clearInterval(intervalId); // 주기적 동작 종료!
		displayNumbers(); 
		$(".ing").removeClass("visible")
		step = 0;
		isCreate = false; // 모든것이 처음으로 돌아가야함. (생성 안하는 최초의 상태.)
	}
}

// 여섯개의 번호 선택을 마치고나면, 하단에 리스트업! 
function displayNumbers(){
	const numberContainer = document.createElement("div") // 길다란 네모 div 부분
	
	for(let i = 0; i < 6; i++){
		const number = document.createElement("div") // 하나의 숫자 동그라미 div 부분
		number.textContent = `${lotto[i]}`
		
		//미션 1~9 , 10-19, 20-29, 30-39, 40-45 색 다르게 설정
		if(lotto[i] < 10){
			$(number).css("backgroundColor","orange")
		}else if(lotto[i] < 20){
			$(number).css("backgroundColor","skyblue")
		}else if(lotto[i] < 30){
			$(number).css("backgroundColor","yellowgreen")
		}else if(lotto[i] < 40){
			$(number).css("backgroundColor","purple")
		}else{
			$(number).css("backgroundColor","coral")
		}
		$(numberContainer).css("display","none")
		numberContainer.appendChild(number)
	}
	$(".result").append(numberContainer)
	$(numberContainer).fadeIn(1000);
	$(".js-reset").show();
}

function init(){
	// 보이면 안되는것들 가리고, 1~45숫자 만들기.
	creatWholeNumber();
	$(".ing").removeClass("visible")
}

function resetNumbers(){
	clearNumbers(); // 선택된 번호 없는 상태로! 
	$(".result").empty(); // 디스플레이중인 번호 싹 없애기.
	$(".js-reset").hide(); // 초기화 버튼 안보이게 하기.
}

// 문서 로드(준비) 완료 후 실행할 코드 블록! 
$(document).ready(function(){
	// 초기 셋팅 내용에 대한 함수.
	init();
	// 생성하기 버튼의 동작에 대한 등록.
	$(".js-btn").click(createNumbers)
	// 초기화 버튼의 동작에 대한 등록.
	$(".js-reset").click(resetNumbers)
})