class Controls{
    constructor(){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        this.#addKeyboardListeners();
    }

    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowForward":
                    this.forward = true;
                    break;
                case "ArrowReverse":
                    this.reverse = true;
                    break;
            }
            console.log("Changing directions!") 
        }
    }
}