#ifndef IBOT_H
#define IBOT_H

class IBOT {
  public:
    // Constructor
    IBOT();
    void begin(int in1, int in2, int in3, int in4);
	void setKipasPin(int kipas1, int kipas2); // assign kipas pin di setup
    void setLampPin (int lampPin);
    void setHornPin (int hornPin);

    // Method kontrol gerakan
    void maju();
    void mundur();
    void belokKiri();
    void belokKanan();
    void stop();
    void LampOn();
    void LampOff();
    void HornOn();
    void HornOff();
	void kipasOn();
    void kipasOff();
    long readUltrasonicCM(int trigPin, int echoPin);
    void setFlamePin(int analogPin, int digitalPin);
    int  readFlameAnalog();
    bool readFlameDigital();

    // Set speed
    void setSpeed(int speedA, int speedB);

    //line follower
    void setPID(float kp, float ki, float kd);
    void setLFConfig(int baseSpeed, int maxSpeed);
    void setError(float errorValue);
    void runLF();

  private:
    int _in1, _in2, _in3, _in4;
	int _kipas1,_kipas2;
    int _lampPin;
    int _hornPin;
    int _speedA,_speedB;
    int _trigPin, _echoPin;
    int _flameAnalogPin;
    int _flameDigitalPin;
    bool _flameInitialized = false;
    bool _ultrasonicInitialized = false;
    bool _hornInitialized = false;            // <- Tambahan
    bool _lampInitialized = false;            // <- Tambahan
	bool _kipasInitialized = false; // biar aman kalau kipas belum di-setup

    void motorKiri(int pwmA, int pwmB);
    void motorKanan(int pwmA, int pwmB);

    float _kp, _ki, _kd;
    float _error, _lastError, _integral;
    int _baseSpeed, _maxSpeed;
};

#endif