import requests
import time


r = requests.get("http://localhost:3040/api/up/5");
print(r);
print(r.text);
time.sleep(2.5)


r = requests.get("http://localhost:3040/api/down/5");
print(r);
print(r.text);
time.sleep(2.5)

r = requests.get("http://localhost:3040/api/left/5");
print(r);
print(r.text);
time.sleep(2.5)

r = requests.get("http://localhost:3040/api/right/5");
print(r);
print(r.text);
time.sleep(2.5)

r = requests.get("http://localhost:3040/api/forward/5");
print(r);
print(r.text);
time.sleep(2.5)

r = requests.get("http://localhost:3040/api/back/5");
print(r);
print(r.text);
time.sleep(2.5)