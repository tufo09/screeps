var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawn = require('spawning');

// Define Console Functions
global.print = function(obj) { console.log(JSON.stringify(obj, null, 2)) };
    // Usecase print(Game.rooms)




// main loop
module.exports.loop = function () {
    _.forEach(Game.rooms, function (room) { console.log(room) 



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

    })
}