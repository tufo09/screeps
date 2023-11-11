// require creep role modules
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

// require other modules
const spawn = require('spawning');

// require prototype extension modules
require('roomFunctions');

// define pre-configured creep bodypart arrays as key/value pairs in an object
const spawnVariants = {
    'harvester300':
        [WORK, WORK, CARRY, MOVE],
    'harvester400':
        [WORK, WORK, WORK, CARRY, MOVE],
    'harvester500':
        [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    'harvester800':
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE],
    'harvester1000':
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    'collector300':
        [CARRY, CARRY, CARRY, MOVE, MOVE],
    'collector500':
        [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    'collector800':
        [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    'collector1000':
        [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE,MOVE, MOVE, MOVE],
    'upgrader300':
        [WORK, WORK, CARRY, MOVE],
    'upgrader500':
        [WORK, WORK, WORK, WORK, CARRY, MOVE],
    'upgrader550':
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    'upgrader800':
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    'upgrader1000':
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE,MOVE],
    'builder300':
        [WORK, WORK, CARRY, MOVE],
    'builder500':
        [WORK, WORK, WORK, WORK, CARRY, MOVE],
    'builder800':
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    'builder1000':
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    'builder1600':
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    'repairer300':
        [WORK, WORK, CARRY, MOVE],
    'repairer500':
        [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    'repairer800':
        [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    'repairer1000':
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    'repairer1400':
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    'runner300':
        [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
    'runner500':
        [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
    'runner800':
        [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
    'warrior520':
        [MOVE,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK]
}

// define working variant set for use in the main loop, assigned based on current energy capacity limits
let availableVariants = {
    'harvester': [],
    'collector': [],
    'upgrader': [],
    'builder': [],
    'repairer': [],
    'runner': [],
    'warrior': [],
    'remoteGuard': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
}

// declare creep counting integers for spawning purposes
let harvesterCount = 0;
let builderCount = 0;
let upgraderCount = 0;

// declare other global variables
let harvesterDying = false;
let builderDying = false;
let upgraderDying = false;





// Define Console Functions
global.print = function(obj) { console.log(JSON.stringify(obj, null, 2)) };
    // Usecase print(Game.rooms)




// main loop
module.exports.loop = function () {

        // generate pixels with extra CPU time
        if (Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel()
            console.log("CPU Bucket at limit, generating pixel! Pixel's in Store: " + JSON.stringify(Game.resources['pixel']))
        }

     // runs for each room in Memory   
    _.forEach(Game.rooms, function (room) {


        if (!room.memory.objects) {
            room.cacheObjects();
        }


        // clear memory
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {

            }
        }


        // run if the controller in the room is mine
        if (room && room.controller && room.controller.my) {


            // clear memory
            for (let name in Memory.creeps) {
                if(Game.creeps[name] == undefined) {
                    Memory.creeps[name] = undefined
                }
            }

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


            // Auto-Spawning
            const minNumberOfHarvesters = 6;
            const minNumberOfBuilders = 4;
            const minNumberOfUpgraders = 5;

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
            } else {
            let newcreepname = 'UPGRADER_'+Game.time.toString()
            const spawnResult = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newcreepname, {memory: {role: 'upgrader'}});
            //console.log(spawnResult);
            if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
            }
            }
        }
    })
}