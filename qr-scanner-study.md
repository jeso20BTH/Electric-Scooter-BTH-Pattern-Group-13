# Technical study - Cordova plugin for scanning QR-code
This study is made to research the different plugins for Cordova, that can handle scanning of an QR-code.

## Limitations and presumptions
- Codrova project installed and working
- Plugin for Cordova
- Able to scan QR-code

## History
QR-code stands for quick response code was invented in 1994 by the Japanese company Denso Wave, according to [Wikipedia](https://en.wikipedia.org/wiki/QR_code).

![qr-code](https://upload.wikimedia.org/wikipedia/commons/1/1d/QR_Code_Structure_Example_3.svg)
This image shows how an QR code is structured.


### Standards
During the years several standards has been released
- 1997, AIM (Association for Automatic Identification and Mobility)
- 1999, JIS X 510
- 2000, ISO/IEC 18004:2000 Defines QR code of model 1 and 2 symbols (It is now withdrawn).
- 2006, ISO/IEC 18004:2006 Is an extension for QR code model 2, know as QR code 2005 (It is now withdrawn). [ISO-standard](https://www.iso.org/standard/43655.html)
- 2015, ISO/IEC 18004:2015 Renames the 2005 QR-code to QR- code and makes som clarifications. [ISO-standard](https://www.iso.org/standard/62021.html)

## Research
I make my research with the following quires to give myself a picture of what exists and how to use them.
- Cordova plugin
- Cordova plugin scanner
- Cordova plugin barcode scanner
- Cordova plugin qr scanner

## Result
With the help of my search queries where I able to get the bellow result. both for Cordova plugins as a whole, but also narrow it down to two plugins I wanna look closer at. The reason for selecting the plugins I did where their good documentation and the fact that the could scan QR codes, defined in my restrictions.

The two plugins I wanted to look closer at where:
- [Cordova barcode scanner](https://www.npmjs.com/package/cordova-plugin-barcodescanner) -
- [Cordova plugin qrscanner](https://github.com/bitpay/cordova-plugin-qrscanner)

### Cordova plugins
A common denominator despite what plugin you like to add is that you use the following command to add it to your project. `cordova plugin add <plugin-name>` and  `cordova plugin remove <plugin-name>` to remove an added plugin. It makes handling plugin simple.

### Cordova barcode scanner
It can handle numerous types of barcodes, QR code is one among them. It is simple plugin with just one method. That method is `scan()`, it will depending on if the scan is successful or not handle an error or an result. In this plugin you get an predefined layout for the barcode without any options. Bellow is an example of how you run an scan.   
``` js
cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
```

Worth notice is if you like to use it on an android application, are you needed to specify somethings about permissions and the hardware, in it's manifext `platforms/android/app/src/main/AndroidMainfest.xml`. The things you need to specify can be found bellow.
``` xml
<config-file target="AndroidManifest.xml" parent="/*" mode="merge">
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" />
    <uses-feature android:name="android.hardware.camera.autofocus" />
</config-file>
```

### Cordova plugin qrscanner
If I compare this plugin with the barcode scanner, is the first thing I notice that it has a lot more methods. Those are stated bellow.
- Prepare - It handles the request for using the camera, and preload the video to help speed things up.
- Scan - It starts the scan, it calls prepare if it has not been called manually.
- cancelScan - runs the error part of the scan method.
- Show - Shows the video preview, on mobile devices is the video preview needed to be visual to handle scanning.
- Hide - Hides the video preview.
- enableLight - Enable the lightning of the camera.
- disableLight - Disable the camera light.
- useFrontCamera / useBackCamera - Selects what camera to use.
- pausePreview/resumePreview - Handle the video preview.
- openSettings - Open the permissions settings for the application.
- getStatus - Get the status of the scanner, what is used an if the light is on.
- destroy - runs hide and cancelScan to return it to its startup state.

#### Usage example
The difference from the barcode scanner is that you got a lot more functions but no preset interface, you have to define your own. I have bellow made an example, I will not use prepare as it is above stated that the built in methods call it when needed. to access the QR-scanner you can use `window.QRScanner` as it is an global object.
Step by step setup from when you click an button starting the process.
##### 1. Hide elements
Hide the elements that are inside your body because the camera preview is placed in the background. I made that part with giving them an class and then add another class that had the following style `display: none;`. The bellow code example is the way is how I did it.
``` js
let element = document.getElementsByClassName('<class of the elements you wanna hide>');

for (var i = 0; i < element.length; i++) {
    element[i].classList.add('<class with above style>');
}
```

You also need to make the background of the body transparent in order to make the preview visual.
i made it with
``` js
document.getElementsByTagName("BODY")[0].setAttribute('style','background-color: transparent');
```
That is what is needed to set up the scan. If you have buttons you wanna show, this is a good point to make them visible as well. In my example did I put my buttons in an div with the class `qr-buttons`, with the standard style `visability: hidden;`. Making it easy to toggle its visibility. with the following line of code.
``` js
document.getElementsByClassName('qr-buttons')[0].setAttribute('style', 'visibility: visible;')
```

##### 2. Enable scan
When you have made the correct elements visible you need to call the method to start the scan `scan(callbackFunction)` and `show()` to make the video preview visible.

##### 3. Handle scan result
As stated above am I using an callback function to handle the result of the scan. The scan function will either return an error or the text, I therefore setup my callbackfunction according to that. `callbackFunction(err, text)`. My function reverse the style from above, by the following steps

First does I remove the class that had `display: none;` with the following steps.
``` js
let element = document.getElementsByClassName('<class of the hidden elements>');

for (var i = 0; i < element.length; i++) {
    element[i].classList.remove('<class with above style>');
}
```
The you need to bring the background of the body back.
``` js
document.getElementsByTagName("BODY")[0].removeAttribute('style');
```
Lastly I hide the buttons for the scanner
 ``` js
document.getElementsByClassName('qr-buttons')[0].setAttribute('style', 'visibility: hidden;')
 ```

It happens despite the outcome of the scan. Then I handle the result in by storing the result of the scan or print the error.

##### 4. Buttons during scan
I mentioned above that I had a div with the buttons shown during the scan. To make the buttons do the things they are intended I call the methods for that thing. for example does I have an button that exits the scan. When you click it it calls `cancelScan()`, it goes it to the scan method and return an error.

## Verdict
For my project I have choose the QR scanner due to its adaptability despite it being a bit harder to setup. But if all you need is av way to scan an barcode but doesn't car how it looks the I would recommend barcode scanner due to its simplicity.
