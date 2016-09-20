/*
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = new Student("Jane", "M.", "Qser");

document.body.innerHTML = greeter(user);
*/

class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image('ground', '../res/img/test.jpg');
    }

    create() {
        let logo = this.game.add.sprite(0, 0, 'ground');
        //logo.anchor.setTo(0.5, 0.5);
    }

}

window.onload = () => {

    let game = new SimpleGame();

};