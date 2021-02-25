let greetUser = (name : string): string => `Hello ${name}` 
let app = document.querySelector("#app")
const students : string [] =  ["Adeleke " , "Bright"]
// Typescript is about improved tooling and compile time validation not new language feaures 
//Types in typescript includes Boolean , Number , Array , Tuple , Enum , Any , void , classes
enum MyColors  {
    red = "#f00" , 
    blue = "#339"
}
students.map(student => {
    let p = document.createElement("p")
    p.textContent = greetUser(student) 
    p.style.color = MyColors.red 
    app.appendChild(p) 
}) 
//An interface is a contract that must be implemented by a class 
interface name {
    firstName: string;
    middleInitial? : string;
    lastName: string;
    getName() : string;
}
class Echo {
    static readonly messageIntro : string = "Hello" 
    subject : name[]
    private message : string 
    constructor(subjects : name[]){
        this.subject = subjects 
    }
    createMessage() : void  {
        this.message = "" 
        for (let person of this.subject){
            this.message += Echo.messageIntro + " " + person.getName() + "<br/>";
        }
    }
    echo() : string {
        return this.message
    }
}
class Person implements name {
    firstName: string;
    middleInitial : string;
    lastName: string;
    getName(): string {
    return this.firstName + ' ' + this.middleInitial + ' ' + this.lastName;
    }
}
//A class that choose to implement an interface must implement everything in that interface 
class Pet implements name {
    firstName: string;
    lastName: string;
    type : string;
    getName(): string {
    return this.firstName + ' ' + this.lastName + ", " + this.type;
    }
}
let nameArray : name[] = [];
let jeffryInstance : Person = new Person();
jeffryInstance.firstName = "Jeffry";
jeffryInstance.middleInitial = "A";
jeffryInstance.lastName = "Houser";
nameArray.push(jeffryInstance);
let echoInstance : Echo = new Echo(nameArray);
echoInstance.createMessage();
console.log(echoInstance.echo())
   

// class Echo {
//     static readonly messageIntro : string = "Hello" 
//     subject : string 
//     private message : string 
//     constructor(subject : string){
//         this.subject = subject 
//     }
//     createMessage() : void  {
//         this.message = Echo.messageIntro + "  " + this.subject 
//     }
//     echo() : string {
//         return this.message
//     }
// }
// let echoInstance : Echo = new Echo("World") 
// console.log(echoInstance.echo)
