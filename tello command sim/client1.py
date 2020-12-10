import requests
import time

validCommands = ['up' , 'down', 'left', 'right', 'forward', 'back', 'UP' , 'DOWN', 'LEFT', 'RIGHT', 'FORWARD', 'BACK']

def apiCommand(command, value):
    if(command == "up" or command == "UP"):
        for i in range(value):
            r = requests.get("http://localhost:3040/api/up/1")
            print(r)
            print(r.text)
            time.sleep(0.5)
    elif(command == "down" or command == "DOWN"):
        for i in range(value):
            r = requests.get("http://localhost:3040/api/down/1")
            print(r)
            print(r.text)
            time.sleep(0.5)
    elif(command == "left" or command == "LEFT"):
        for i in range(value):
            r = requests.get("http://localhost:3040/api/left/1")
            print(r)
            print(r.text)
            time.sleep(0.5)
    elif(command == "right" or command == "RIGHT"):
        for i in range(value):
            r = requests.get("http://localhost:3040/api/right/1")
            print(r)
            print(r.text)
            time.sleep(0.5)
    elif(command == "forward" or command == "FORWARD"):
        for i in range(value):
            r = requests.get("http://localhost:3040/api/forward/1")
            print(r)
            print(r.text)
            time.sleep(0.5)
    elif(command == "back" or command == "BACK"):
        for i in range(value):
            r = requests.get("http://localhost:3040/api/back/1")
            print(r)
            print(r.text)
            time.sleep(0.5)

def main():
    while True:
        userInput = input("Tello Command: ")
        x = userInput.split()
        try:
            value = int(x[1])
        except:
            print("invalid value in command try again!")
            continue
        if x[0] in validCommands:
            apiCommand(x[0], value)
        else:
            print("invalid command try again!")
            continue
            

if __name__ == "__main__":
    main()