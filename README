jquery.localstorage.js
==================

jQuery local storage plugin allowing for object storage and retrieval to and from local storage.

## Compatibility

| Browser | Compatibility |
| ------- | ----- |
| Chrome | Perfect |
| Firefox | Perfect |
| Opera | Perfect |
| Safari | Perfect |
| Internet Explorer | Perfect |

## Usage

(Requires jQuery) Include the jquery.localstorage.js or jquery.localstorage.min.js file.
Create a script/template block, initialize the localstorage plugin specifying any options required by the implementing application.

## Quick Start

Initialize the local storage plugin with some default values. By default eh page location will be used unless the key is specified in the options.

	var storage = new $.localStorage({
        default: {

            //return a simple default object
            return {
                hello: "world"
            };
        }
    });

Retrieve the simple object from local storage.

	var simpleObject = storage.get();
    console.log(simpleObject); //displays the simple default object {hello: "world"}

Modify the simple object and storage back into local storage.

    simpleObject.newKey = "newValue";
    storage.set(simpleObject);

### A Bit More Complicated

Let's create a storage initializer complete with specified local storage key and validator.

    var storage = new $.localStorage({
        key: "my-local-storage",
        default: function(){

            //return a simple default object with a timestamp for validation
            return {
            timestamp: new Date().getTime(),
            hello: "world"
            };
        },
        isValid: function(storage){
            return storage.timestamp < new Date().getTime();
        }
    });

In the above example, the validator will fail if the timestamp of the value being retrieved is greater than the current time.  We have also specified a key to be used for local storage "my-local-storage".

    var simpleObject = storage.get(); //default object retrieved

    simpleObject.hello = "goodbye";
    storage.set(simpleObject); //storing modified object

    simpleObject = storage.get();
    console.log(simpleObject.hello); //displays "goodbye"

    simpleObject.timestamp += 1000000; //move time into the future
    storage.set(simpleObject); //still said "goodbye" at time of storage

    simpleObject = storage.get(); //validation fails
    console.log(simpleObject.hello); //falls back to default object and displays "world"

Due to setting the timestamp in the future, the next retrieval of the local storage object forced the validation to fail, resulting in the reset and retrieval of the default specified object.

### Multiple Storage Entries Per Page

By specifiying the unique keys, multiple objects can be stored and retrieved from local storage on the same page.

    var timeStorage = new $.localStorage({
        key: "time-storage",
        default: function(){
            return {
                time: new Date().getTime()
            };
        }
    });

    var helloStorage = new $.localStorage({
        key: "hello-storage",
        default: function(){
            return {
                hello: "world"
            };
        }
    });

    console.info( timeStorage.get() ); //displays {time: 1503705313903}
    console.info( helloStorage.get() ); //displays {hello: "world"}

## Constructor

    new $.localStorage(options)

| Argument | Description |
| -------- | ----------- |
| options | Specifies the options structure to be used. |

## Options

The following table specifies the options available to be used in conjunction with the plugin.

| Name | Description |
| ---- | ----------- |
| key | Specifies the key to use for the local storage (default: document.location.toString()) |
| default | Specifies a function for retrieving the default object (default: {}) |
| isValid | Specifies a function for determining if the current state of the object is valid, the argument is the current local storage object (default: function(){ return true; }) |
| stringify | Builtin stringification function for converting an object to a JSON string, the argument is the object to be stringified |
| parseJSON | Builtin convenience function for ensuring safe converstion of either a string or an object to a JSON object, the argument is the object or string to be transformed into a JSON object |

    var storage = new $.localStorage({
        key: "my-key",
        default: function(){
            return {
                hello: "world",
                valid: true
            };
        },
        isValid: function(storage){
            return storage.valid;
        },
        stringify: function(obj){
            //perform your own stringify
            return jsonString;
        },
        parseJSON: function(objectOrString){
            //perform your own safe parse JSON function
            return jsonObject;
        }
    });

## Community

Keep track of development and community news.

* Follow [@Collaboradev on Twitter](https://twitter.com/collaboradev).
* Follow the [Collaboradev Blog](http://www.collaboradev.com).

## License

jquery.localstorage.js is released under [GPL, version 2.0](http://www.gnu.org/licenses/gpl-2.0.html)
