// require creep role modules
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

// require other modules
const spawning = require('spawning');

// require prototype extension modules
require('roomFunctions');

// define pre-configured creep bodypart arrays as key/value pairs in an object


// define working variant set for use in the main loop, assigned based on current energy capacity limits


// declare creep counting integers for spawning purposes
let harvesterCount = 0;
let builderCount = 0;
let upgraderCount = 0;

// declare other global variables
let tickCount
let harvesterDying = false;
let builderDying = false;
let upgraderDying = false;





// Define Console Functions
global.print = function(obj) { console.log(JSON.stringify(obj, null, 2)) };




// main loop
module.exports.loop = function () {

        // generate pixels with extra CPU time
        if (Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel()
            console.log("CPU Bucket at limit, generating pixel! Pixel's in Store: " + JSON.stringify(Game.resources['pixel'] + 1))
        }

        // runs for each room in Memory   
        _.forEach(Game.rooms, function (room) {
            // chache new rooms
            if (!room.memory.objects) {
                room.cacheObjects();
        }




        // clear memory
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                const role = Memory.creeps[name].role;
                Memory.creeps[name] = undefined
                console.log('Clearing nonexistent creep memory: ', name);
                // reset naming counter for type of creep that died
                switch (role) {
                    case 'harvester':
                        harvesterCount = 0;
                        break;
                    case 'builder':
                        builderCount = 0;
                        break;
                    case 'upgrader':
                        upgraderCount = 0;
                }
            }
        }


        // run if the controller in the room is mine
        if (room && room.controller && room.controller.my) {
            // recache room
            if (tickCount % 1000 == 0) {
                console.log('MAIN LOOP, CACHING OBJECTS EVERY 1000 TICKS --- Tick#: ' + tickCount);
                room.cacheObjects();
            }

            // define arrays of structures in the room
            const spawn = Game.getObjectById(room.memory.objects.spawns[0]);





            //spawn.run(room)
            




            for(let name in Game.creeps) {
                var creep = Game.creeps[name];
                if(creep.memory.role == 'harvester') {
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep);
                }
                if(creep.memory.role == 'builder') {
                    roleBuilder.run(creep);
                }
            }




            // spawn management
            let readySpawn = spawn;

            for (let i = 0; i < room.memory.objects.spawns.length; i++) {
                const thisSpawn = Game.getObjectById(room.memory.objects.spawns[i]);
                if (thisSpawn.spawning) continue;
                else readySpawn = thisSpawn;
            }






































            // Auto-Spawning
            const minNumberOfHarvesters = 3;
            const minNumberOfBuilders = 3;
            const minNumberOfUpgraders = 2;

            var numberOfHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
            var numberOfBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
            var numberOfUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;

            console.log("Harvesters: " + numberOfHarvesters + " Builders: " + numberOfBuilders + " Upgraders: " + numberOfUpgraders)



            if(numberOfHarvesters < minNumberOfHarvesters) {
                let newcreepname = 'HARVESTER_'+Game.time.toString()
                const spawnResult = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newcreepname, {memory: {role: 'harvester'}});
                //console.log(spawnResult);
                if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
                }
            } else if(numberOfBuilders < minNumberOfBuilders) {
                let newcreepname = 'BUILDER_'+Game.time.toString()
                const spawnResult = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newcreepname, {memory: {role: 'builder'}});
                //console.log(spawnResult);
                if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
                }
            } else if (numberOfUpgraders < minNumberOfUpgraders) {
                let newcreepname = 'UPGRADER_'+Game.time.toString()
                const spawnResult = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newcreepname, {memory: {role: 'upgrader'}});
                //console.log(spawnResult);
                if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
                }
            }
        }
    })
}