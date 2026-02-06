#include "IBOT.h"
#include "arduino.h"

// Constructor
IBOT::IBOT()
{
}

void IBOT::begin(int in1, int in2, int in3, int in4)
{
  _in1 = in1;
  _in2 = in2;
  _in3 = in3;
  _in4 = in4;

  _speedA = 200; // default speed
  _speedB = 200;

  pinMode(_in1, OUTPUT);
  pinMode(_in2, OUTPUT);
  pinMode(_in3, OUTPUT);
  pinMode(_in4, OUTPUT);
}

long IBOT::readUltrasonicCM(int trigPin, int echoPin)
{
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH, 25000); // timeout 25ms
  long distance = duration * 0.034 / 2;
  return distance;
}

void IBOT::setKipasPin(int kipas1, int kipas2)
{
  _kipas1 = kipas1;
  _kipas2 = kipas2;

  pinMode(_kipas1, OUTPUT);
  pinMode(_kipas2, OUTPUT);

  _kipasInitialized = true;
}
// Motor kiri (PWM A, PWM B)
void IBOT::motorKiri(int pwmA, int pwmB)
{
  analogWrite(_in1, pwmA);
  analogWrite(_in2, pwmB);
}

// Motor kanan (PWM A, PWM B)
void IBOT::motorKanan(int pwmA, int pwmB)
{
  analogWrite(_in3, pwmA);
  analogWrite(_in4, pwmB);
}

// Maju
void IBOT::maju()
{
  motorKiri(_speedA, 0);
  motorKanan(_speedB, 0);
}

// Mundur
void IBOT::mundur()
{
  motorKiri(0, _speedA);
  motorKanan(0, _speedB);
}

// Belok kiri
void IBOT::belokKiri()
{
  motorKiri(0, _speedA);
  motorKanan(_speedB, 0);
}

// Belok kanan
void IBOT::belokKanan()
{
  motorKiri(_speedA, 0);
  motorKanan(0, _speedB);
}

// Stop
void IBOT::stop()
{
  motorKiri(_speedA, _speedA);
  motorKanan(_speedB, _speedB);
  delay(100);
  motorKiri(0, 0);
  motorKanan(0, 0);
  delay(10);
}

// Set speed
void IBOT::setSpeed(int speedA, int speedB)
{
  _speedA = constrain(speedA, 0, 255);
  _speedB = constrain(speedB, 0, 255);
}

// lamp
void IBOT::setLampPin(int lampPin)
{
  _lampPin = lampPin;
  pinMode(_lampPin, OUTPUT);
  _lampInitialized = true;
}

void IBOT::LampOn()
{
  if (_lampInitialized)
  {
    digitalWrite(_lampPin, HIGH);
  }
}

void IBOT::LampOff()
{
  if (_lampInitialized)
  {
    digitalWrite(_lampPin, LOW);
  }
}

// HORN
void IBOT::setHornPin(int hornPin)
{
  _hornPin = hornPin;
  pinMode(_hornPin, OUTPUT);
  _hornInitialized = true;
}

void IBOT::HornOn()
{
  if (_hornInitialized)
  {
    digitalWrite(_hornPin, HIGH);
  }
}

void IBOT::HornOff()
{
  if (_hornInitialized)
  {
    digitalWrite(_hornPin, LOW);
  }
}

// Kipas
void IBOT::kipasOn()
{
  if (_kipasInitialized)
  {
    analogWrite(_kipas1, 0);
    analogWrite(_kipas2, 200);
  }
}

void IBOT::kipasOff()
{
  if (_kipasInitialized)
  {
    analogWrite(_kipas1, 0);
    analogWrite(_kipas2, 0);
  }
}
// Flame
void IBOT::setFlamePin(int analogPin, int digitalPin)
{
  _flameAnalogPin = analogPin;
  _flameDigitalPin = digitalPin;
  pinMode(_flameAnalogPin, INPUT);
  pinMode(_flameDigitalPin, INPUT);
  _flameInitialized = true;
}

int IBOT::readFlameAnalog()
{
  if (_flameInitialized)
  {
    return analogRead(_flameAnalogPin);
  }
  else
  {
    return -1; // belum di-set
  }
}

bool IBOT::readFlameDigital()
{
  if (_flameInitialized)
  {
    return digitalRead(_flameDigitalPin) == LOW; // LOW = api terdeteksi
  }
  else
  {
    return false;
  }
}

void IBOT::setLFConfig(int baseSpeed, int maxSpeed) {
    _baseSpeed = baseSpeed;
    _maxSpeed = maxSpeed;
}

void IBOT::setPID(float kp, float ki, float kd) {
    _kp = kp;
    _ki = ki;
    _kd = kd;
}

void IBOT::setError(float errorValue) {
    _error = errorValue;
}

void IBOT::runLF() {
    // Rumus PID dari source [cite: 11, 12]
    _integral += _error;
    float derivative = _error - _lastError;
    float correction = (_kp * _error) + (_ki * _integral) + (_kd * derivative);
    _lastError = _error;

    // Kalkulasi kecepatan motor [cite: 13]
    int leftSpeed = constrain(_baseSpeed - correction, 0, _maxSpeed);
    int rightSpeed = constrain(_baseSpeed + correction, 0, _maxSpeed);

    motorKiri(leftSpeed, 0);
    motorKanan(rightSpeed, 0);
}