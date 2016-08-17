import readline from "readline" 
var beefy = new Beefy();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function pollinput() {
    rl.question("Enter command: ", (answer) => {
        console.log(beefy.handleCommand(answer))
        pollinput();
    });
}
pollinput();