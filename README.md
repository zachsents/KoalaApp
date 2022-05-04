
#  Koala 🐨 Mobile App

Koala is a companion mobile app for a collection of portable air quality monitors designed and built for our team's Electrical Engineering senior design project at CU Boulder.



## Project Team


| Name           | Contact                     | Role                          |
|----------------|-----------------------------|-------------------------------|
| **Zach Sents** | **zachsents@gmail.com**     | **App & Backend Development** |
| William Pryor  | william.pryor@colorado.edu  | Circuit & PCB Design          |
| Athena Parker  | athena.parker.@colorado.edu | Embedded Software Development |
| Ella Wawrzynek | ella.wawrzynek@colorado.edu | Embedded Software Development |
| Kat Edfors     | kat.edfors@colorado.edu     | App Development               |
| Sydney Evans   | sydney.evans@colorado.edu   | Mechanical Engineering        |

## Tech Stack

**Mobile App (this repo):**

<img src="https://user-images.githubusercontent.com/11147616/166837154-6561a624-4c5f-475c-8e4d-463cdab0a968.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166837106-99a84555-2bff-4a6b-8304-7fa560c492e1.png" width="23%"></img> 

**Server & Database:**

<img src="https://user-images.githubusercontent.com/11147616/166837633-e43f877a-c956-4360-b147-87341e561459.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166837683-c6dd4d37-d7ab-4685-bcb6-de6a5e0b5f02.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166837720-c17f5167-2ede-4f4a-bcae-760fcdb8325a.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166837855-75b0e017-a97b-413d-a6ec-ba9d4940e576.png" width="23%"></img> 


## Run Locally

Clone the project

```bash
  git clone https://github.com/zachsents/KoalaApp
```

Go to the project directory

```bash
  cd KoalaApp
```

Install dependencies

```bash
  npm install
```

Plug in an Android device via USB, then start the development server

```bash
  npm run android
```

**Note:** because of the lack of a common Bluetooth API for React Native, this app currently only functions on Android devices.
## Hardware

The hardware for the portable air quality monitors was designed custom. The onboard microcontroller unit has Bluetooth capabilities that allow it to pair to this mobile app and transfer measurement data wirelessly.

![image](https://user-images.githubusercontent.com/11147616/166838455-2bafdfc5-7185-4a48-bb6d-f7dae62b76fc.png)