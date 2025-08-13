enum MOVE_DIRECTION {
	//% block="Maju"
	maju,
	//% block="Mundur"
	mundur,
	//% block="Belok Kiri"
	belokKiri,
	//% block="Belok Kanan"
	belokKanan,
	//% block="Stop"
	stop
}
enum fungsi {
	//% block="Lampu"
	LampPin,
	//% block="Klakson"
	HornPin,
	//% block="Kipas"
	KipasPin,
}
enum ultrasonik {
	//% block="Depan"
	Depan,
	//% block="Kiri"
	Kiri,
	//% block="kanan"
	Kanan,
}
enum Satatpin {
	//% block="Analog"
	Analog,
	//% block="Digital"
	Digital,
}

enum Stat {
	//% block="Nyalakan"
	On,
	//% block="Matikan"
	Off,
}

declare var Generator: any;

//% color="#FF4D00" iconWidth=50 iconHeight=40
namespace IBOT {
	//% block="IBOT init kecepatan kiri [speedA] ||  kecepatan Kanan[speedB]" blockType="command"
	//% speedA.shadow="range" speedA.params.min=0 speedA.params.max=255 speedA.defl=200
	//% speedB.shadow="range" speedB.params.min=0 speedB.params.max=255 speedB.defl=200
	export function iBotStart(parameter: any, block: any) {
		let Speed1 = parameter.speedA.code;
		let Speed2 = parameter.speedB.code;

		if (Generator.board === 'arduinonano' || Generator.board === 'arduino') {
			Generator.addInclude('IBOT', '#include <IBOT.h>');
			Generator.addObject('robot', 'IBOT', 'robot;');
			Generator.addSetup("robot.begin", `robot.begin(10,6,9,5);`);
			Generator.addCode(`robot.setSpeed(${Speed1}, ${Speed2});`);
		}
	}
	//% block="Gerak Robot [direction] Selama [delay] Detik" blockType="command"
	//% direction.shadow="dropdown" direction.options="MOVE_DIRECTION" direction.defl="Maju"
	//% delay.shadow="number" delay.defl="1"
	export function gerakRobot(parameter: any, block: any) {
		let direction = parameter.direction.code;
		let delay = parameter.delay.code;
		let delay2 = delay * 1000;
		Generator.addCode(`robot.${direction}();\n  delay(${delay2});`);
	}

	//% block="Gerak Robot [directionA]" blockType="command"
	//% directionA.shadow="dropdown" directionA.options="MOVE_DIRECTION" directionA.defl="Maju"
	export function gerakRobotA(parameter: any, block: any) {
		let directionA = parameter.directionA.code;
		Generator.addCode(`robot.${directionA}();`);
	}

	//% block="[StatusL] [Fungsi]" blockType="command"
	//% StatusL.shadow="dropdown" StatusL.options="Stat" StatusL.defl="Nyalakan"
	//% Fungsi.shadow="dropdown" Fungsi.options="fungsi" Fungsi.defl="lamp"
	export function Setfungsiinit(parameter: any, block: any) {
		let Fungsi = parameter.Fungsi.code;
		let StatusL = parameter.StatusL.code;

		Generator.addInclude('IBOT', '#include <IBOT.h>');
		Generator.addObject('robot', 'IBOT', 'robot;');
		if (Fungsi === 'LampPin') {
			Generator.addSetup('robot.setLampPin', `robot.setLampPin(A2);`);
			Generator.addCode(`robot.Lamp${StatusL}();`);
		}
		else if (Fungsi === 'HornPin') {
			Generator.addSetup('robot.setHornPin', `robot.setHornPin(A3);`);
			Generator.addCode(`robot.Horn${StatusL}();`);
		}
		else if (Fungsi === 'KipasPin') {
			Generator.addSetup("setupKipas", `robot.setKipasPin(3,A1);`);
			Generator.addCode(`robot.kipas${StatusL}();`);
		}
	}

	//% block="Baca Jarak Sensor Ultrasonik [Posisi] Cm " blockType="reporter"
	//% Posisi.shadow="dropdown" Posisi.options="ultrasonik" Posisi.defl="Depan"
	export function Setultrasonikinit(parameter: any, block: any) {
		let Posisi = parameter.Posisi.code;

		Generator.addInclude('IBOT', '#include <IBOT.h>');
		Generator.addObject('robot', 'IBOT', 'robot;');
		if (Posisi === 'Depan') {
			Generator.addCode(`robot.readUltrasonicCM(4,2)`);
		}
		else if (Posisi === 'Kiri') {
			Generator.addCode(`robot.readUltrasonicCM(8,7)`);
		}
		else if (Posisi === 'Kanan') {
			Generator.addCode(`robot.readUltrasonicCM(12,11)`);
		}
	}

	//% block="Deteksi Api Secara [detek] " blockType="reporter"
	//% detek.shadow="dropdown" detek.options="Satatpin" detek.defl="Analog"
	export function Setapiinit(parameter: any, block: any) {
		let detek = parameter.detek.code;

		Generator.addInclude('IBOT', '#include <IBOT.h>');
		Generator.addObject('robot', 'IBOT', 'robot;');
		Generator.addSetup("robot.setFlamePin", `robot.setFlamePin(A0, 13);`);
		Generator.addSetup();
		if (detek === 'Analog') {
			Generator.addCode(`robot.readFlameAnalog()`);
		}
		else if (detek === 'Digital') {
			Generator.addCode(`robot.readFlameDigital()`);
		}
	}
	//% block="Selama [delay1] detik" blockType="command"
	//% delay1.shadow="number" delay1.defl="1"
	export function wait(parameter: any, block: any) {
		let delay1 = parameter.delay1.code;
		let delay2 = delay1 * 1000;

		Generator.addCode(`delay(${delay2});`);
	}
}