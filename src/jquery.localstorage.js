/*
 * Copyright 2017 Jason Graves (GodLikeMouse/Collaboradev)
 * http://www.collaboradev.com
 *
 * This file is part of jquery.localstorage.js.
 *
 * The jquery.localstorage.js plugin is free software: you can redistribute it
 * and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *
 * The jquery.localstorage.js plugin is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with the jquery.localstorage.js plugin. If not, see http://www.gnu.org/licenses/.
 *
 */

$.localStorage = function(options){

    //extend default values
    options = $.extend(true, {
        key: document.location.toString(),
        default: function(){
            return {};
        },
        isValid: function(){
            return true;
        },
        stringify: function(obj){
            if(JSON && JSON.stringify)
                return JSON.stringify(obj);

            var t = typeof (obj);
            if (t != "object" || obj === null) {
                // simple data type
                if (t == "string") obj = '"' + obj + '"';
                return String(obj);
            } else {
                // recurse array or object
                var n, v, json = [], arr = (obj && obj.constructor == Array);

                for (n in obj) {
                    v = obj[n];
                    t = typeof(v);
                    if (obj.hasOwnProperty(n)) {
                        if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = stringify(v);
                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        },
        parseJSON: function(data){
            if(typeof data == "string")
                return $.parseJSON(data);
            return data;
        }

    }, options);

	var _instance = this;

	//resets the local storage
	_instance.reset = function(){
		return localStorage[options.key] = options.stringify(options.default());
	}

	//sets the local storage object
	_instance.set = function(storage){
		storage = options.stringify(storage);
		localStorage[options.key] = storage;
	}

	//returns the current local storage for the key
	//or a new default object
	_instance.get = function(){
		var storage = localStorage[options.key];

		try {
			storage = options.parseJSON(storage);

			if(!storage || !options.isValid(storage))
				throw "Invalid Storage";
		}
		catch(ex){
			storage = _instance.reset();
			storage = options.parseJSON(storage);
		}

		return storage;
	}

	return _instance;
}
