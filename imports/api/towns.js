import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Towns = new Mongo.Collection('towns');

if (Meteor.isServer) {
  Meteor.publish('towns', function townsPublication() {
    return Towns.find({});
  });


  Meteor.methods({
    InsertNewTown(town){
      Towns.insert({
        town,
      });
    },

    DeleteTown(townId){
      Towns.remove(townId);
    },
  })
}