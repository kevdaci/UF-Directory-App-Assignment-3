'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
    listings = require("./listings");

var entries = listings.entries;
var uri = config.db.uri;


/* Connect to your database */
mongoose.connect(uri);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
for(var i = 0; i < entries.length; i++){
  var entryCode = null,
      entryName = null,
      entryLat = null,
      entryLon = null,
      entryAddress = null;

  entryCode = entries[i].code;
  entryName = entries[i].name;

  if(entries[i].coordinates != null){
    entryLat = entries[i].coordinates.latitude;
    entryLon = entries[i].coordinates.longitude;
  }
  if(entries[i].address != null)
    entryAddress = entries[i].address


  var listingEntry = new Listing({
    code: entryCode,
    name: entryName,
    coordinates: {
      latitude: entryLat,
      longitude: entryLon
    },
    address: entryAddress
  });

  listingEntry.save(function(err){
    if (err) throw err;
    console.log("Listing added!");
  });
  /*console.log(entries[i].code);
  if(entries[i].coordinates != null){
    console.log(entries[i].coordinates.latitude);
    console.log(entries[i].coordinates.longitude);
  }
  console.log();*/
}


/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */