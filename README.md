# DadJokes [WIP]

A Dad Joke generator app built using [React NodeGui](https://react.nodegui.org). This app is a working proof of concept app to showcase how you can build and distribute a React NodeGui/NodeGui app to respective app stores.

<img alt="logo" src="https://github.com/master-atul/DadJokes/raw/master/assets/dadjoke.png" height="200" />

## Downloads

You can download the DadJokes app from the releases or from the App stores in Mac and Windows.

## To Develop

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install CMake
brew install cmake
# Install dependencies
npm install
# Run the dev server
npm run dev
# Open andother terminal and run the app
npm start
```

## Installation & Resources for learning React NodeGui

- [Documentation](https://react.nodegui.org) - all of React NodeGui's documentation.
- [NodeGui](https://nodegui.org) - all of NodeGui's documentation.

## Packaging app as a distributable

In order to distribute your finished app, you can use [@nodegui/packer](https://github.com/nodegui/packer)

### Step 1: (_**Run this command only once**_)

```sh
npx nodegui-packer --init MyAppName
```

This will produce the deploy directory containing the template. You can modify this to suite your needs. Like add icons, change the name, description and add other native features or dependencies. Make sure you commit this directory.

### Step 2: (_**Run this command every time you want to build a new distributable**_)

Next you can run the pack command:

```sh
npm run build
```

This will produce the js bundle along with assets inside the `./dist` directory

```sh
npx nodegui-packer --pack ./dist
```

This will build the distributable using @nodegui/packer based on your template. The output of the command is found under the build directory. You should gitignore the build directory.

More details about packer can be found here: https://github.com/nodegui/packer


## CodeSigning for MacOS

## Outside of Mac app store.

First step is to create a certificate for distribution

1. Open up apple developer site. 
https://developer.apple.com

2. Create a new app id if it doesnt exist already, for example `com.atulr.dadjokes`

3. Now open up Certificates tab (https://developer.apple.com/account/resources/certificates/list)

- Click on `+` icon to create a new certificate.
- Choose `Developer ID Application` if you want to deploy outside of mac app store and click on continue.
- Generate a CSR using keychain and upload it. 
- Once done you can download the certificate and install it onto your computer by double clicking it.

4.  Make sure you have these values:
- Your cert identity: You can check your keychain and find something like this: `Developer ID Application: Name (ascProviderID)` 
- Your apple email id you use to login to developer.apple.com
- You apple app specific password created for this app
- ascProvider: This is a unique identifier assigned to your organization or account. You can find it at https://developer.apple.com/account/#/membership/ . Look for Team ID


5. Now open up ./pack.sh and replace the necessary values. Run `./pack.sh`. This should create a packed and signed app.

6. Next step is to notarise the app. (https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution) 
- To do this open and edit notarise.sh to match your values. The run ./notarise.sh.
- This will give you a unique identifier that you can use to poll apple for status.
- Polling for status: `xcrun altool  --username "<email>" --password "<app_specific_password>" --notarization-info <notarization_id>`
- Once you get a success message. You need to staple your app. To do this run:
`xcrun stapler staple ./deploy/darwin/build/Yourapp.app`

Now you are ready to distribute your MacOS app.

## Onto the Mac app store.

First step is to create a certificate for app store

0. Make sure you have a valid icns icon for your app. Use the following guide: https://docs.unity3d.com/Manual/HOWTO-PortToAppleMacStore.html
1. Open up apple developer site. 
https://developer.apple.com

2. Create a new app id if it doesnt exist already, for example `com.atulr.dadjokes`

3. Now open up Certificates tab (https://developer.apple.com/account/resources/certificates/list)

- Click on `+` icon to create a new certificate.
- Choose `Mac App Distribution` and click on continue.
- Generate a CSR using keychain and upload it. 
- Once done you can download the certificate and install it onto your computer by double clicking it.

4.  Make sure you have these values:
- Your cert identity: You can check your keychain and find something like this: `3rd Party Mac Developer Application: Name (ascProviderId)` 
- Your apple email id you use to login to developer.apple.com
- You apple app specific password created for this app
- ascProvider: This is a unique identifier assigned to your organization or account. You can find it at https://developer.apple.com/account/#/membership/ . Look for Team ID


5. Now open up ./pack.sh and replace the necessary values. Run `./pack.sh`. This should create a packed and signed app. Test your app if it works fine.

6. You do not need to notarise your app if you are distributing via macos app store.

7. Open up App Store connect: https://appstoreconnect.apple.com/ and login with your apple id.
- Now go to `My Apps` and click `+`.
- Fill out the form and use `?` for help if needed. Then click on `create` button.
- Now fill out `App Information`, `Pricing and Availability` and `Prepare for Submission` forms.

8. Creating a .pkg installer. 
- Create a new certificate for the installer. This time choose `Mac Installer Distribution` while creating the cert and install it to your computer.
- Run productbuild to build a unsigned pkg file

```sh
productbuild --component ./DadJokes.app /Applications/ DadJokes.pkg
```
Now sign it

```sh
productsign --sign "3rd Party Mac Developer Installer: Your name (ID)" DadJokes.pkg DadJokesSigned.pkg
```

9.  Upload using these commands:

```xcrun altool  --username "your username" --password "your app specific password" --validate-app -f DadJokesSigned.pkg```

Fix any issue that is raised and retry until you succeed.

Then finally upload: 

```xcrun altool  --username "your username" --password "your app specific password" --upload-app -f DadJokesSigned.pkg```


Now you are ready to distribute your MacOS app.


## License

MIT
