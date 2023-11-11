Room.prototype.cacheObjects = function cacheObjects() {
	// code by Random Encounter
	// declare storage array for objects to cache
	let storageArray = [];

	// search room for each object type
	const sources 			= this.find(FIND_SOURCES	);
	const minerals 			= this.find(FIND_MINERALS	);
	const deposits 			= this.find(FIND_DEPOSITS	);
	const allStructures = this.find(FIND_STRUCTURES, { filter: (i) => 								i.structureType == STRUCTURE_CONTROLLER ||	i.structureType == STRUCTURE_SPAWN 	||	i.structureType == STRUCTURE_EXTENSION 	|| i.structureType == STRUCTURE_TOWER 	|| i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE || 	i.structureType == STRUCTURE_RAMPART 		|| i.structureType == STRUCTURE_LINK 		|| i.structureType == STRUCTURE_EXTRACTOR || i.structureType == STRUCTURE_LAB 		|| 	i.structureType == STRUCTURE_TERMINAL 	|| i.structureType == STRUCTURE_FACTORY || i.structureType == STRUCTURE_OBSERVER 	|| i.structureType == STRUCTURE_NUKER 	|| 	i.structureType == STRUCTURE_POWER_SPAWN });
	
	const controller 	= _.filter(allStructures, { structureType: STRUCTURE_CONTROLLER }	);
	const spawns 			= _.filter(allStructures, { structureType: STRUCTURE_SPAWN 			} );
	const extensions 	= _.filter(allStructures, { structureType: STRUCTURE_EXTENSION 	} );
	const towers 			= _.filter(allStructures, { structureType: STRUCTURE_TOWER 			} );
	const containers 	= _.filter(allStructures, { structureType: STRUCTURE_CONTAINER 	} );
	const storage 		= _.filter(allStructures, { structureType: STRUCTURE_STORAGE 		} );
	const ramparts 		= _.filter(allStructures, { structureType: STRUCTURE_RAMPART 		} );
  const links 			= _.filter(allStructures, { structureType: STRUCTURE_LINK				} );
	const extractor 	= _.filter(allStructures, { structureType: STRUCTURE_EXTRACTOR 	} );
	const labs 				= _.filter(allStructures, { structureType: STRUCTURE_LAB 				} );
	const terminal 		= _.filter(allStructures, { structureType: STRUCTURE_TERMINAL 	} );
	const factory 		= _.filter(allStructures, { structureType: STRUCTURE_FACTORY 		} );
	const observer 		= _.filter(allStructures, { structureType: STRUCTURE_OBSERVER 	} );
	const powerspawn 	= _.filter(allStructures, { structureType: STRUCTURE_POWER_SPAWN} );
	const nuker 			= _.filter(allStructures, { structureType: STRUCTURE_NUKER 			} );

	// check if the 'objects' object exists in room memory & create it if not
	if (!this.memory.objects) {
		this.memory.objects = {};
	}
	// if sources are found, add their IDs to array and add array to room's 'objects' memory
	if (sources) {
		for (i = 0; i < sources.length; i++)
			storageArray.push(sources[i].id);
		if (storageArray.length) {
			this.memory.objects.sources = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' sources.');
			else
				console.log('Cached 1 source.');
		}
		storageArray = [];
	}
	// if minerals are found, add their IDs to array and add array to room's 'objects' memory
	if (minerals) {
		for (i = 0; i < minerals.length; i++)
			storageArray.push(minerals[i].id);
		if (storageArray.length) {
			this.memory.objects.minerals = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' minerals.');
			else
				console.log('Cached 1 mineral.');
		}
		storageArray = [];
	}
	// if deposits are found, add their IDs to array and add array to room's 'objects' memory
	if (deposits) {
		for (i = 0; i < deposits.length; i++)
			storageArray.push(deposits[i].id);
		if (storageArray.length) {
			this.memory.objects.deposits = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' deposits.');
			else
				console.log('Cached 1 deposit.');
		}
		storageArray = [];
	}
	// if a controller is found, add its ID to array and add array to room's 'objects' memory
	if (controller) {
		for (i = 0; i < controller.length; i++)
			storageArray.push(controller[i].id);
		if (storageArray.length) {
			this.memory.objects.controller = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + '  controllers.');
			else
				console.log('Cached 1 controller.');
		}
		storageArray = [];
	}
	// if a spawn is found, add its ID to array and add array to room's 'objects' memory
	if (spawns) {
		for (i = 0; i < spawns.length; i++)
			storageArray.push(spawns[i].id);
		if (storageArray.length) {
			this.memory.objects.spawns = storageArray;
			if (storageArray.length > 1) 
				console.log('Cached ' + storageArray.length + ' spawns.');
			else 
				console.log('Cached 1 spawn.');
		}
		storageArray = [];
	}	
	// if an extension is found, add its ID to array and add array to room's 'objects' memory
	if (extensions) {
		for (i = 0; i < extensions.length; i++)
			storageArray.push(extensions[i].id);
		if (storageArray.length) {
			this.memory.objects.extensions = storageArray;
			if (storageArray.length > 1) 
				console.log('Cached ' + storageArray.length + ' extensions.');
			else 
				console.log('Cached 1 extebsion.');
		}
		storageArray = [];
	}	
	// if towers are found, add their IDs to array and add array to room's 'objects' memory
	if (towers) {
		for (i = 0; i < towers.length; i++)
			storageArray.push(towers[i].id);
		if (storageArray.length) {
			this.memory.objects.towers = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' towers.');
			else
				console.log('Cached 1 tower.');
		}
		storageArray = [];
	}
	// if containers are found, add their IDs to array and add array to room's 'objects' memory
	if (containers) {
		for (i = 0; i < containers.length; i++)
			storageArray.push(containers[i].id);
		if (storageArray.length) {
			this.memory.objects.containers = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' containers.');
			else
				console.log('Cached 1 container.');
		}
		storageArray = [];
	}
	// if storage is found, add its ID to array and add array to room's 'objects' memory
	if (storage) {
		for (i = 0; i < storage.length; i++)
			storageArray.push(storage[i].id);
		if (storageArray.length) {
			this.memory.objects.storage = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' storages.');
			else
				console.log('Cached 1 storage.');
		}
		storageArray = [];
	}
	// if ramparts are found, add their IDs to array and add array to room's 'objects' memory
	if (ramparts) {
		for (i = 0; i < ramparts.length; i++)
			storageArray.push(ramparts[i].id);
		if (storageArray.length) {
			this.memory.objects.ramparts = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' ramparts.');
			else
				console.log('Cached 1 rampart.');
		}
		storageArray = [];
	}
	// if links are found, add their IDs to array and add array to room's 'objects' memory
	if (links) {
		for (i = 0; i < links.length; i++)
			storageArray.push(links[i].id);
		if (storageArray.length) {
			this.memory.objects.links = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' links.');
			else
				console.log('Cached 1 link.');
		}
		storageArray = [];
	}
	// if extractors are found, add their IDs to array and add array to room's 'objects' memory
	if (extractor) {
		for (i = 0; i < extractor.length; i++)
			storageArray.push(extractor[i].id);
		if (storageArray.length) {
			this.memory.objects.extractor = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' extractors.');
			else
				console.log('Cached 1 extractor.');
		}
		storageArray = [];
	}
	// if labs are found, add their IDs to array and add array to room's 'objects' memory
	if (labs) {
		for (i = 0; i < labs.length; i++)
			storageArray.push(labs[i].id);
		if (storageArray.length) {
			this.memory.objects.labs = storageArray;
			if (storageArray.length > 1)
				console.log('Cached ' + storageArray.length + ' labs.');
			else
				console.log('Cached 1 lab.');
		}
		storageArray = [];
	}
	// if terminals are found, add their IDs to array and add array to room's 'objects' memory
	if (terminal) {
		for (i = 0; i < terminal.length; i++)
			storageArray.push(terminal[i].id);
		if (storageArray.length) {
			this.memory.objects.terminal = storageArray;
			if (storageArray.length >= 1)
				console.log('Cached 1 terminal.');
		}
		storageArray = [];
	}
	// if factory are found, add their IDs to array and add array to room's 'objects' memory
	if (factory) {
		for (i = 0; i < factory.length; i++)
			storageArray.push(factory[i].id);
		if (storageArray.length) {
			this.memory.objects.factory = storageArray;
			if (storageArray.length >= 1)
				console.log('Cached 1 factory.');
		}
		storageArray = [];
	}
	// if observers are found, add their IDs to array and add array to room's 'objects' memory
	if (observer) {
		for (i = 0; i < observer.length; i++)
			storageArray.push(observer[i].id);
		if (storageArray.length) {
			this.memory.objects.observer = storageArray;
			if (storageArray.length >= 1)
				console.log('Cached 1 observer.');
		}
		storageArray = [];
	}
	// if power spawns are found, add their IDs to array and add array to room's 'objects' memory
	if (powerspawn) {
		for (i = 0; i < powerspawn.length; i++)
			storageArray.push(powerspawn[i].id);
		if (storageArray.length) {
			this.memory.objects.powerspawn = storageArray;
			if (storageArray.length >= 1)
				console.log('Cached 1 power spawn.');
		}
		storageArray = [];
	}
	// if nukers are found, add their IDs to array and add array to room's 'objects' memory
	if (nuker) {
		for (i = 0; i < nuker.length; i++)
			storageArray.push(nuker[i].id);
		if (storageArray.length) {
			this.memory.objects.nuker = storageArray;
			if (storageArray.length >= 1)
				console.log('Cached 1 nuker.');
		}
		storageArray = [];
	}

	return 'Caching objects for room ' + this.name + ' completed.';
}