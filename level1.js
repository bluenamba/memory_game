
      
      var counter=0 
      var number_cards=4
      var attemptLeft=number_cards-1
      var score=0
      document.getElementById("attemptDiv").innerHTML="MOVES LEFT"+ "<br>"+ attemptLeft+"/"+ (number_cards-1)
      document.getElementById("score").innerHTML="SCORE"+ "<br>"+ score
      function attempt(){ 
        attemptLeft--
        document.getElementById("attemptDiv").innerHTML="MOVES LEFT"+ "<br>"+ attemptLeft+"/"+ (number_cards-1)
      }
        function winner_loser (){
          if (attemptLeft==0) {
            document.getElementById("status").innerHTML="You Lost!"
            score--
             document.getElementById("score").innerHTML="SCORE"+ "<br>"+ score
            attemptLeft=number_cards-1
            document.getElementById("attemptDiv").innerHTML="MOVES LEFT"+ "<br>"+ attemptLeft+"/"+ (number_cards-1)
          }
          else if (counter==number_cards) {
            document.getElementById("status").innerHTML="You Won!" 
            score++
            document.getElementById("score").innerHTML="SCORE"+ "<br>"+ score
            
          }
        }
        
        
        const cards= document.querySelectorAll('.cards');
      
      // flips the card
      function flipCard() {
        this.classList.toggle('flip');
      }
      
      //cards.forEach(card => card.addEventListener('click', flipCard));
        //store card
        
 
        let FlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard; 
        
        function flipCard(){
        if (lockBoard) return;
        if (this === firstCard) return;
          
          this.classList.add('flip');
          
          if (!FlippedCard) {
            FlippedCard = true; 
            firstCard = this;
            return;
          }
      
    secondCard = this;
    <!--lockBoard = true; -->commented
          
          checkForMatch()
          
          
        }
     
      console.log("random")
          function checkForMatch(){
    
        <!--if (firstCard.dataset.framework === secondCard.dataset.framework) {
            if (firstCard.getAttribute('data-framework') === secondCard.getAttribute('data-framework')) {
         disableCards();
       return;
       }
console.log("about to unflip");
     unflipCards();
   }
  
                 
 
        function disableCards(){
          console.log("in disable") <!-- removed after-->
          counter+=2
          
        firstCard.removeEventListener ('click', flipCard);
          secondCard.removeEventListener ('click', flipCard);

          winner_loser() <!--last flip/pair to know if user won-->
          resetBoard()
          
          
        }
        
        function unflipCards(){
          console.log("in unflip")
         lockBoard=true; 
          
          setTimeout(()=> {  
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            
          resetBoard();
            
            
          },1500);
          
         attempt()
           winner_loser() <!--if attemptLEf=0, then we call this fct to say it's game over-->
     
        }
        
        function resetBoard(){
          
     [FlippedCard, lockBoard] = [false,false];
      [firstCard, secondCard] = [null, null];
          
        }
       
        
      // shuffle elements
      cards.forEach(card => {
      const ramdomPos = Math.floor(Math.random() * cards.length); 
      card.style.order = ramdomPos;
      });
        
      cards.forEach(card => card.addEventListener('click', flipCard));    
    

  

