enum SIZE {
    //% block="29*29"
    1,
    //% block="58*58"
    2
}

enum MOVE_DIRECTION {
    //% block="Maju"
    Forward,
    //% block="Mundur"
    Backward,
    //% block="Belok Kiri"
    Left,
    //% block="Belok Kanan"
    Right,
    //% block="Stop"
    Stop
}

//% color="#FF4D00" iconWidth=50 iconHeight=40
namespace iBot {
    //% block="iBot Start" blockType="hat"
    export function iBotStart(parameter: any. block: any) {
        if(Generator.board === 'arduinonano'){
           Generator.addSetup(block.id, `motorInit();`);
      }
    }

    //% block="set motor pin | A1: [A] | A2: [B]| B1: [C] | B2: [D] kecepatan [speed]" blockType="command"
    //% A.shadow="dropdownRound" A.options="PIN_AnalogWrite", A.defl="2"
    //% B.shadow="dropdownRound" B.options="PIN_AnalogWrite", B.defl="3"
    //% C.shadow="dropdownRound" C.options="PIN_AnalogWrite", C.defl="4"
    //% D.shadow="dropdownRound" D.options="PIN_AnalogWrite", D.defl="5"
	//% speed.shadow="range" speed.param.min=0 speed.param.max=200 speed.defl=200
    export function setMotorPin(parameter: any, block: any) {
        let leftPinA = parameter.A.code;
        let leftPinB = parameter.B.code;
        let rightPinA = parameter.C.code;
        let rightPinB = parameter.D.code;
		let speed = parameter.speed.code;

        if(Generator.board === 'arduinonano'){
            Generator.addEvent("motorInit", "void", "motorInit","",false);
			Generator.addCode(`int motorSpeed = ${speed};`);
            Generator.addCode(`int motorLeftA = ${leftPinA};`);
            Generator.addCode(`int motorRightA = ${rightPinA};`);
            Generator.addCode(`int motorLeftB = ${leftPinB};`);
            Generator.addCode(`int motorRightB = ${rightPinB};`);
            Generator.addCode(`pinMode(motorLeftA, OUTPUT);`);
            Generator.addCode(`pinMode(motorLeftB, OUTPUT);`);
            Generator.addCode(`pinMode(motorRightA, OUTPUT);`);
            Generator.addCode(`pinMode(motorRightB, OUTPUT);`);
        }
    }

    //% block="Maju" blockType="command"
    export function moveForward(parameter: any, block: any) {
            Generator.addCode(`
                analogWrite(motorLeftA, motorSpeed);
                analogWrite(motorLeftB, 0);
                analogWrite(motorRightA, motorSpeed);
                analogWrite(motorRightB, 0);
            `);
    }

    //% block="Mundur" blockType="command"
    export function moveBackward(parameter: any, block: any) {
        if(Generator.board === 'arduinonano'){
        Generator.addCode(`
                analogWrite(motorLeftA, 0);
                analogWrite(motorLeftB, motorSpeed);
                analogWrite(motorRightA, 0);
                analogWrite(motorRightB, motorSpeed);
            `);
        }
    }

    //% block="Belok Kiri" blockType="command"
    export function turnLeft(parameter: any, block: any) {
        if(Generator.board === 'arduinonano'){
        Generator.addCode(`
                analogWrite(motorLeftA, 0);
                analogWrite(motorLeftB, motorSpeed);
                analogWrite(motorRightA, motorSpeed);
                analogWrite(motorRightB, 0);
            `);
        }
    }

    //% block="Belok Kanan" blockType="command"
    export function turnRight(parameter: any, block: any) {
        if(Generator.board === 'arduinonano'){
        Generator.addCode(`
                analogWrite(motorLeftA, motorSpeed);
                analogWrite(motorLeftB, 0);
                analogWrite(motorRightA, 0);
                analogWrite(motorRightB, motorSpeed);
            `);
        }
    }

    //% block="stop" blockType="command"
    export function stop(parameter: any, block: any) {
        if(Generator.board === 'arduinonano'){
        Generator.addCode(`
                analogWrite(motorLeftA, 0);
                analogWrite(motorLeftB, 0);
                analogWrite(motorRightA, 0);
                analogWrite(motorRightB, 0);
            `);
        }
    }
}