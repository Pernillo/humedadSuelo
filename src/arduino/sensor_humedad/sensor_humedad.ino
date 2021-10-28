// sensor pins
byte humidity_sensor_pin = A0;
byte humidity_sensor_vcc = 6;
int relay_pin = 4;
int  humidity_value = 0;

void setup() {
  // Inicializar pines sensor humedad
  pinMode(humidity_sensor_vcc, OUTPUT);
  digitalWrite(humidity_sensor_vcc, LOW);
  //Incialiar pines relay
  pinMode(relay_pin, OUTPUT);
  digitalWrite(relay_pin, LOW);
  // Setup Serial
  while (!Serial);
  delay(1000);
  Serial.begin(9600);
}

int read_humidity_sensor() {
  digitalWrite(humidity_sensor_vcc, HIGH);
  delay(500);
  int value = analogRead(humidity_sensor_pin);
  int val = map(value, 0, 1023, 0, 100);
  digitalWrite(humidity_sensor_vcc, LOW);
  return  100 - val;
}

void loop() {
  humidity_value = read_humidity_sensor();
  Serial.print("value: ");
  Serial.println(humidity_value);

  //validar cuando prender la bomba
  if ( humidity_value < 5) {
    digitalWrite(relay_pin, HIGH);
  } else {
    digitalWrite(relay_pin, LOW );
  }
  //  tiempo de espera para la proxima lecutura
  delay(30000);

}