export type FactorioManufacturingTypes =
    'crafting'
    | 'chemistry'
    | 'oil-processing'
    | 'crafting-with-fluid'
    | 'smelting'
    | 'advanced-crafting'
    | 'centrifuging'
    | 'rocket-building';

export type FactorioRecipe = {
    name: string, //
    ingredients: { amount: number, name: string }[], //
    energy_required: number, // 
    category: FactorioManufacturingTypes
} & any;

export const factorioRecipes: { [key: string]: FactorioRecipe } = {
    'accumulator': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 0,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 2,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'battery',
            },
        ],
        'localized_name': {
            'en': 'Accumulator',
        },
        'name': 'accumulator',
        'order': 'e[accumulator]-a[accumulator]',
        'results': [
            {
                'amount': 1,
                'name': 'accumulator',
            },
        ],
        'subgroup': 'energy',
        'type': 'recipe',
    },
    'advanced-circuit': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 6,
        'icon_col': 1,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 2,
                'name': 'electronic-circuit',
            }, {
                'amount': 2,
                'name': 'plastic-bar',
            }, {
                'amount': 4,
                'name': 'copper-cable',
            },
        ],
        'localized_name': {
            'en': 'Advanced circuit',
        },
        'name': 'advanced-circuit',
        'order': 'f[advanced-circuit]',
        'results': [
            {
                'amount': 1,
                'name': 'advanced-circuit',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'advanced-oil-processing': {
        'category': 'oil-processing',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 2,
        'icon_mipmaps': 4,
        'icon_row': 0,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 50,
                'name': 'water',
                'type': 'fluid',
            }, {
                'amount': 100,
                'name': 'crude-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Advanced oil processing',
        },
        'name': 'advanced-oil-processing',
        'order': 'a[oil-processing]-b[advanced-oil-processing]',
        'results': [
            {
                'amount': 25,
                'name': 'heavy-oil',
                'type': 'fluid',
            }, {
                'amount': 45,
                'name': 'light-oil',
                'type': 'fluid',
            }, {
                'amount': 55,
                'name': 'petroleum-gas',
                'type': 'fluid',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'arithmetic-combinator': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 3,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 5,
                'name': 'copper-cable',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Arithmetic combinator',
        },
        'name': 'arithmetic-combinator',
        'order': 'c[combinators]-a[arithmetic-combinator]',
        'results': [
            {
                'amount': 1,
                'name': 'arithmetic-combinator',
            },
        ],
        'subgroup': 'circuit-network',
        'type': 'recipe',
    },
    'artillery-shell': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 4,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 4,
                'name': 'explosive-cannon-shell',
            }, {
                'amount': 1,
                'name': 'radar',
            }, {
                'amount': 8,
                'name': 'explosives',
            },
        ],
        'localized_name': {
            'en': 'Artillery shell',
        },
        'name': 'artillery-shell',
        'order': 'd[explosive-cannon-shell]-d[artillery]',
        'results': [
            {
                'amount': 1,
                'name': 'artillery-shell',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'artillery-targeting-remote': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 5,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 1,
                'name': 'processing-unit',
            }, {
                'amount': 1,
                'name': 'radar',
            },
        ],
        'localized_name': {
            'en': 'Artillery targeting remote',
        },
        'name': 'artillery-targeting-remote',
        'order': 'b[turret]-d[artillery-turret]-b[remote]',
        'results': [
            {
                'amount': 1,
                'name': 'artillery-targeting-remote',
            },
        ],
        'subgroup': 'defensive-structure',
        'type': 'recipe',
    },
    'artillery-turret': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 40,
        'icon_col': 6,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 60,
                'name': 'steel-plate',
            }, {
                'amount': 60,
                'name': 'concrete',
            }, {
                'amount': 40,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 20,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Artillery turret',
        },
        'name': 'artillery-turret',
        'order': 'b[turret]-d[artillery-turret]-a[turret]',
        'results': [
            {
                'amount': 1,
                'name': 'artillery-turret',
            },
        ],
        'subgroup': 'defensive-structure',
        'type': 'recipe',
    },
    'artillery-wagon': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 4,
        'icon_col': 7,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 64,
                'name': 'engine-unit',
            }, {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 40,
                'name': 'steel-plate',
            }, {
                'amount': 16,
                'name': 'pipe',
            }, {
                'amount': 20,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Artillery wagon',
        },
        'name': 'artillery-wagon',
        'order': 'a[train-system]-i[artillery-wagon]',
        'results': [
            {
                'amount': 1,
                'name': 'artillery-wagon',
            },
        ],
        'subgroup': 'train-transport',
        'type': 'recipe',
    },
    'assembling-machine-1': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 8,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 9,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Assembling machine 1',
        },
        'name': 'assembling-machine-1',
        'order': 'a[assembling-machine-1]',
        'results': [
            {
                'amount': 1,
                'name': 'assembling-machine-1',
            },
        ],
        'subgroup': 'production-machine',
        'type': 'recipe',
    },
    'assembling-machine-2': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 9,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 2,
                'name': 'steel-plate',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 1,
                'name': 'assembling-machine-1',
            },
        ],
        'localized_name': {
            'en': 'Assembling machine 2',
        },
        'name': 'assembling-machine-2',
        'order': 'b[assembling-machine-2]',
        'results': [
            {
                'amount': 1,
                'name': 'assembling-machine-2',
            },
        ],
        'subgroup': 'production-machine',
        'type': 'recipe',
    },
    'assembling-machine-3': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 10,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 4,
                'name': 'speed-module',
            }, {
                'amount': 2,
                'name': 'assembling-machine-2',
            },
        ],
        'localized_name': {
            'en': 'Assembling machine 3',
        },
        'name': 'assembling-machine-3',
        'order': 'c[assembling-machine-3]',
        'results': [
            {
                'amount': 1,
                'name': 'assembling-machine-3',
            },
        ],
        'subgroup': 'production-machine',
        'type': 'recipe',
    },
    'atomic-bomb': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 50,
        'icon_col': 11,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 10,
                'name': 'rocket-control-unit',
            }, {
                'amount': 10,
                'name': 'explosives',
            }, {
                'amount': 30,
                'name': 'uranium-235',
            },
        ],
        'localized_name': {
            'en': 'Atomic bomb',
        },
        'name': 'atomic-bomb',
        'order': 'd[rocket-launcher]-c[atomic-bomb]',
        'results': [
            {
                'amount': 1,
                'name': 'atomic-bomb',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'automation-science-pack': {
        'category': 'crafting',
        'energy_required': 5,
        'icon_col': 12,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 1,
                'name': 'copper-plate',
            }, {
                'amount': 1,
                'name': 'iron-gear-wheel',
            },
        ],
        'localized_name': {
            'en': 'Automation science pack',
        },
        'name': 'automation-science-pack',
        'order': 'a[automation-science-pack]',
        'results': [
            {
                'amount': 1,
                'name': 'automation-science-pack',
            },
        ],
        'subgroup': 'science-pack',
        'type': 'recipe',
    },
    'basic-oil-processing': {
        'category': 'oil-processing',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 13,
        'icon_mipmaps': 4,
        'icon_row': 0,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 100,
                'fluidbox_index': 2,
                'name': 'crude-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Basic oil processing',
        },
        'main_product': '',
        'name': 'basic-oil-processing',
        'order': 'a[oil-processing]-a[basic-oil-processing]',
        'results': [
            {
                'amount': 45,
                'fluidbox_index': 3,
                'name': 'petroleum-gas',
                'type': 'fluid',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'battery': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.338,
                'g': 0.482,
                'r': 0.965,
            },
            'quaternary': {
                'a': 1,
                'b': 0.191,
                'g': 0.763,
                'r': 0.939,
            },
            'secondary': {
                'a': 1,
                'b': 0.222,
                'g': 0.56,
                'r': 0.831,
            },
            'tertiary': {
                'a': 1,
                'b': 0.443,
                'g': 0.818,
                'r': 0.728,
            },
        },
        'enabled': false,
        'energy_required': 4,
        'icon_col': 14,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 20,
                'name': 'sulfuric-acid',
                'type': 'fluid',
            }, {
                'amount': 1,
                'name': 'iron-plate',
            }, {
                'amount': 1,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Battery',
        },
        'name': 'battery',
        'order': 'h[battery]',
        'results': [
            {
                'amount': 1,
                'name': 'battery',
            },
        ],
        'subgroup': 'raw-material',
        'type': 'recipe',
    },
    'battery-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 0,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 5,
                'name': 'battery',
            }, {
                'amount': 10,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Personal battery',
        },
        'name': 'battery-equipment',
        'order': 'b[battery]-a[battery-equipment]',
        'results': [
            {
                'amount': 1,
                'name': 'battery-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'battery-mk2-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 1,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 10,
                'name': 'battery-equipment',
            }, {
                'amount': 15,
                'name': 'processing-unit',
            }, {
                'amount': 5,
                'name': 'low-density-structure',
            },
        ],
        'localized_name': {
            'en': 'Personal battery MK2',
        },
        'name': 'battery-mk2-equipment',
        'order': 'b[battery]-b[battery-equipment-mk2]',
        'results': [
            {
                'amount': 1,
                'name': 'battery-mk2-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'beacon': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 2,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 20,
                'name': 'electronic-circuit',
            }, {
                'amount': 20,
                'name': 'advanced-circuit',
            }, {
                'amount': 10,
                'name': 'steel-plate',
            }, {
                'amount': 10,
                'name': 'copper-cable',
            },
        ],
        'localized_name': {
            'en': 'Beacon',
        },
        'name': 'beacon',
        'order': 'a[beacon]',
        'results': [
            {
                'amount': 1,
                'name': 'beacon',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'belt-immunity-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 3,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 10,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Belt immunity equipment',
        },
        'name': 'belt-immunity-equipment',
        'order': 'c[belt-immunity]-a[belt-immunity]',
        'results': [
            {
                'amount': 1,
                'name': 'belt-immunity-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'big-electric-pole': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 4,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 8,
                'name': 'iron-stick',
            }, {
                'amount': 5,
                'name': 'steel-plate',
            }, {
                'amount': 5,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Big electric pole',
        },
        'name': 'big-electric-pole',
        'order': 'a[energy]-c[big-electric-pole]',
        'results': [
            {
                'amount': 1,
                'name': 'big-electric-pole',
            },
        ],
        'subgroup': 'energy-pipe-distribution',
        'type': 'recipe',
    },
    'boiler': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 7,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 1,
                'name': 'stone-furnace',
            }, {
                'amount': 4,
                'name': 'pipe',
            },
        ],
        'localized_name': {
            'en': 'Boiler',
        },
        'name': 'boiler',
        'order': 'b[steam-power]-a[boiler]',
        'results': [
            {
                'amount': 1,
                'name': 'boiler',
            },
        ],
        'subgroup': 'energy',
        'type': 'recipe',
    },
    'burner-inserter': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 8,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 1,
                'name': 'iron-plate',
            }, {
                'amount': 1,
                'name': 'iron-gear-wheel',
            },
        ],
        'localized_name': {
            'en': 'Burner inserter',
        },
        'name': 'burner-inserter',
        'order': 'a[burner-inserter]',
        'results': [
            {
                'amount': 1,
                'name': 'burner-inserter',
            },
        ],
        'subgroup': 'inserter',
        'type': 'recipe',
    },
    'burner-mining-drill': {
        'category': 'crafting',
        'energy_required': 2,
        'icon_col': 9,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 3,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 1,
                'name': 'stone-furnace',
            }, {
                'amount': 3,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Burner mining drill',
        },
        'name': 'burner-mining-drill',
        'order': 'a[items]-a[burner-mining-drill]',
        'results': [
            {
                'amount': 1,
                'name': 'burner-mining-drill',
            },
        ],
        'subgroup': 'extraction-machine',
        'type': 'recipe',
    },
    'cannon-shell': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 10,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 2,
                'name': 'steel-plate',
            }, {
                'amount': 2,
                'name': 'plastic-bar',
            }, {
                'amount': 1,
                'name': 'explosives',
            },
        ],
        'localized_name': {
            'en': 'Cannon shell',
        },
        'name': 'cannon-shell',
        'order': 'd[cannon-shell]-a[basic]',
        'results': [
            {
                'amount': 1,
                'name': 'cannon-shell',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'car': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 2,
        'icon_col': 11,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 8,
                'name': 'engine-unit',
            }, {
                'amount': 20,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Car',
        },
        'name': 'car',
        'order': 'b[personal-transport]-a[car]',
        'results': [
            {
                'amount': 1,
                'name': 'car',
            },
        ],
        'subgroup': 'transport',
        'type': 'recipe',
    },
    'cargo-wagon': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 1,
        'icon_col': 12,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 20,
                'name': 'iron-plate',
            }, {
                'amount': 20,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Cargo wagon',
        },
        'name': 'cargo-wagon',
        'order': 'a[train-system]-g[cargo-wagon]',
        'results': [
            {
                'amount': 1,
                'name': 'cargo-wagon',
            },
        ],
        'subgroup': 'train-transport',
        'type': 'recipe',
    },
    'centrifuge': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 4,
        'icon_col': 13,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 100,
                'name': 'concrete',
            }, {
                'amount': 50,
                'name': 'steel-plate',
            }, {
                'amount': 100,
                'name': 'advanced-circuit',
            }, {
                'amount': 100,
                'name': 'iron-gear-wheel',
            },
        ],
        'localized_name': {
            'en': 'Centrifuge',
        },
        'name': 'centrifuge',
        'order': 'g[centrifuge]',
        'requester_paste_multiplier': 10,
        'results': [
            {
                'amount': 1,
                'name': 'centrifuge',
            },
        ],
        'subgroup': 'production-machine',
        'type': 'recipe',
    },
    'chemical-plant': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 14,
        'icon_row': 1,
        'ingredients': [
            {
                'amount': 5,
                'name': 'steel-plate',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'pipe',
            },
        ],
        'localized_name': {
            'en': 'Chemical plant',
        },
        'name': 'chemical-plant',
        'order': 'e[chemical-plant]',
        'results': [
            {
                'amount': 1,
                'name': 'chemical-plant',
            },
        ],
        'subgroup': 'production-machine',
        'type': 'recipe',
    },
    'chemical-science-pack': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 24,
        'icon_col': 0,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 2,
                'name': 'engine-unit',
            }, {
                'amount': 3,
                'name': 'advanced-circuit',
            }, {
                'amount': 1,
                'name': 'sulfur',
            },
        ],
        'localized_name': {
            'en': 'Chemical science pack',
        },
        'name': 'chemical-science-pack',
        'order': 'd[chemical-science-pack]',
        'results': [
            {
                'amount': 2,
                'name': 'chemical-science-pack',
            },
        ],
        'subgroup': 'science-pack',
        'type': 'recipe',
    },
    'cliff-explosives': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 1,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 10,
                'name': 'explosives',
            }, {
                'amount': 1,
                'name': 'grenade',
            }, {
                'amount': 1,
                'name': 'empty-barrel',
            },
        ],
        'localized_name': {
            'en': 'Cliff explosives',
        },
        'name': 'cliff-explosives',
        'order': 'd[cliff-explosives]',
        'results': [
            {
                'amount': 1,
                'name': 'cliff-explosives',
            },
        ],
        'subgroup': 'terrain',
        'type': 'recipe',
    },
    'cluster-grenade': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 3,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 7,
                'name': 'grenade',
            }, {
                'amount': 5,
                'name': 'explosives',
            }, {
                'amount': 5,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Cluster grenade',
        },
        'name': 'cluster-grenade',
        'order': 'a[grenade]-b[cluster]',
        'results': [
            {
                'amount': 1,
                'name': 'cluster-grenade',
            },
        ],
        'subgroup': 'capsule',
        'type': 'recipe',
    },
    'coal-liquefaction': {
        'allow_decomposition': false,
        'category': 'oil-processing',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 5,
        'icon_mipmaps': 4,
        'icon_row': 2,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 10,
                'name': 'coal',
                'type': 'item',
            }, {
                'amount': 25,
                'name': 'heavy-oil',
                'type': 'fluid',
            }, {
                'amount': 50,
                'name': 'steam',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Coal liquefaction',
        },
        'name': 'coal-liquefaction',
        'order': 'a[oil-processing]-c[coal-liquefaction]',
        'results': [
            {
                'amount': 90,
                'name': 'heavy-oil',
                'type': 'fluid',
            }, {
                'amount': 20,
                'name': 'light-oil',
                'type': 'fluid',
            }, {
                'amount': 10,
                'name': 'petroleum-gas',
                'type': 'fluid',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'combat-shotgun': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 7,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 15,
                'name': 'steel-plate',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'copper-plate',
            }, {
                'amount': 10,
                'name': 'wood',
            },
        ],
        'localized_name': {
            'en': 'Combat shotgun',
        },
        'name': 'combat-shotgun',
        'order': 'b[shotgun]-a[combat]',
        'results': [
            {
                'amount': 1,
                'name': 'combat-shotgun',
            },
        ],
        'subgroup': 'gun',
        'type': 'recipe',
    },
    'concrete': {
        'category': 'crafting-with-fluid',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 8,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 5,
                'name': 'stone-brick',
            }, {
                'amount': 1,
                'name': 'iron-ore',
            }, {
                'amount': 100,
                'name': 'water',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Concrete',
        },
        'name': 'concrete',
        'order': 'b[concrete]-a[plain]',
        'results': [
            {
                'amount': 10,
                'name': 'concrete',
            },
        ],
        'subgroup': 'terrain',
        'type': 'recipe',
    },
    'constant-combinator': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 9,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 5,
                'name': 'copper-cable',
            }, {
                'amount': 2,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Constant combinator',
        },
        'name': 'constant-combinator',
        'order': 'c[combinators]-c[constant-combinator]',
        'results': [
            {
                'amount': 1,
                'name': 'constant-combinator',
            },
        ],
        'subgroup': 'circuit-network',
        'type': 'recipe',
    },
    'construction-robot': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 10,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 1,
                'name': 'flying-robot-frame',
            }, {
                'amount': 2,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Construction robot',
        },
        'name': 'construction-robot',
        'order': 'a[robot]-b[construction-robot]',
        'results': [
            {
                'amount': 1,
                'name': 'construction-robot',
            },
        ],
        'subgroup': 'logistic-network',
        'type': 'recipe',
    },
    'copper-cable': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 11,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 1,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Copper cable',
        },
        'name': 'copper-cable',
        'order': 'a[copper-cable]',
        'results': [
            {
                'amount': 2,
                'name': 'copper-cable',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'copper-plate': {
        'category': 'smelting',
        'energy_required': 3.2,
        'icon_col': 13,
        'icon_row': 2,
        'ingredients': [
            {
                'amount': 1,
                'name': 'copper-ore',
            },
        ],
        'localized_name': {
            'en': 'Copper plate',
        },
        'name': 'copper-plate',
        'order': 'c[copper-plate]',
        'results': [
            {
                'amount': 1,
                'name': 'copper-plate',
            },
        ],
        'subgroup': 'raw-material',
        'type': 'recipe',
    },
    'decider-combinator': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 1,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 5,
                'name': 'copper-cable',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Decider combinator',
        },
        'name': 'decider-combinator',
        'order': 'c[combinators]-b[decider-combinator]',
        'results': [
            {
                'amount': 1,
                'name': 'decider-combinator',
            },
        ],
        'subgroup': 'circuit-network',
        'type': 'recipe',
    },
    'defender-capsule': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 3,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 3,
                'name': 'piercing-rounds-magazine',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 3,
                'name': 'iron-gear-wheel',
            },
        ],
        'localized_name': {
            'en': 'Defender capsule',
        },
        'name': 'defender-capsule',
        'order': 'd[defender-capsule]',
        'results': [
            {
                'amount': 1,
                'name': 'defender-capsule',
            },
        ],
        'subgroup': 'capsule',
        'type': 'recipe',
    },
    'destroyer-capsule': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 4,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 4,
                'name': 'distractor-capsule',
            }, {
                'amount': 1,
                'name': 'speed-module',
            },
        ],
        'localized_name': {
            'en': 'Destroyer capsule',
        },
        'name': 'destroyer-capsule',
        'order': 'f[destroyer-capsule]',
        'results': [
            {
                'amount': 1,
                'name': 'destroyer-capsule',
            },
        ],
        'subgroup': 'capsule',
        'type': 'recipe',
    },
    'discharge-defense-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 5,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 5,
                'name': 'processing-unit',
            }, {
                'amount': 20,
                'name': 'steel-plate',
            }, {
                'amount': 10,
                'name': 'laser-turret',
            },
        ],
        'localized_name': {
            'en': 'Discharge defense',
        },
        'name': 'discharge-defense-equipment',
        'order': 'b[active-defense]-b[discharge-defense-equipment]-a[equipment]',
        'results': [
            {
                'amount': 1,
                'name': 'discharge-defense-equipment',
            },
        ],
        'subgroup': 'military-equipment',
        'type': 'recipe',
    },
    'discharge-defense-remote': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 6,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Discharge defense remote',
        },
        'name': 'discharge-defense-remote',
        'order': 'b[active-defense]-b[discharge-defense-equipment]-b[remote]',
        'results': [
            {
                'amount': 1,
                'name': 'discharge-defense-remote',
            },
        ],
        'subgroup': 'military-equipment',
        'type': 'recipe',
    },
    'distractor-capsule': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 7,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 4,
                'name': 'defender-capsule',
            }, {
                'amount': 3,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Distractor capsule',
        },
        'name': 'distractor-capsule',
        'order': 'e[defender-capsule]',
        'results': [
            {
                'amount': 1,
                'name': 'distractor-capsule',
            },
        ],
        'subgroup': 'capsule',
        'type': 'recipe',
    },
    'effectivity-module': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 8,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Efficiency module',
        },
        'name': 'effectivity-module',
        'order': 'c[effectivity]-a[effectivity-module-1]',
        'results': [
            {
                'amount': 1,
                'name': 'effectivity-module',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'effectivity-module-2': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 30,
        'icon_col': 9,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 4,
                'name': 'effectivity-module',
            }, {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'processing-unit',
            },
        ],
        'localized_name': {
            'en': 'Efficiency module 2',
        },
        'name': 'effectivity-module-2',
        'order': 'c[effectivity]-b[effectivity-module-2]',
        'results': [
            {
                'amount': 1,
                'name': 'effectivity-module-2',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'effectivity-module-3': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 60,
        'icon_col': 10,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 5,
                'name': 'effectivity-module-2',
            }, {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'processing-unit',
            },
        ],
        'localized_name': {
            'en': 'Efficiency module 3',
        },
        'name': 'effectivity-module-3',
        'order': 'c[effectivity]-c[effectivity-module-3]',
        'results': [
            {
                'amount': 1,
                'name': 'effectivity-module-3',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'electric-energy-interface': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 0,
        'icon_row': 0,
        'ingredients': [
            {
                'amount': 2,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Electric energy interface',
        },
        'name': 'electric-energy-interface',
        'order': 'a[electric-energy-interface]-b[electric-energy-interface]',
        'results': [
            {
                'amount': 1,
                'name': 'electric-energy-interface',
            },
        ],
        'subgroup': 'other',
        'type': 'recipe',
    },
    'electric-engine-unit': {
        'category': 'crafting-with-fluid',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 11,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 1,
                'name': 'engine-unit',
            }, {
                'amount': 15,
                'name': 'lubricant',
                'type': 'fluid',
            }, {
                'amount': 2,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Electric engine unit',
        },
        'name': 'electric-engine-unit',
        'order': 'i[electric-engine-unit]',
        'results': [
            {
                'amount': 1,
                'name': 'electric-engine-unit',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'electric-furnace': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 12,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 10,
                'name': 'steel-plate',
            }, {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 10,
                'name': 'stone-brick',
            },
        ],
        'localized_name': {
            'en': 'Electric furnace',
        },
        'name': 'electric-furnace',
        'order': 'c[electric-furnace]',
        'results': [
            {
                'amount': 1,
                'name': 'electric-furnace',
            },
        ],
        'subgroup': 'smelting-machine',
        'type': 'recipe',
    },
    'electric-mining-drill': {
        'category': 'crafting',
        'energy_required': 2,
        'icon_col': 13,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Electric mining drill',
        },
        'name': 'electric-mining-drill',
        'order': 'a[items]-b[electric-mining-drill]',
        'results': [
            {
                'amount': 1,
                'name': 'electric-mining-drill',
            },
        ],
        'subgroup': 'extraction-machine',
        'type': 'recipe',
    },
    'electronic-circuit': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 14,
        'icon_row': 3,
        'ingredients': [
            {
                'amount': 1,
                'name': 'iron-plate',
            }, {
                'amount': 3,
                'name': 'copper-cable',
            },
        ],
        'localized_name': {
            'en': 'Electronic circuit',
        },
        'name': 'electronic-circuit',
        'order': 'e[electronic-circuit]',
        'results': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'empty-barrel': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 1,
        'icon_col': 0,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 1,
                'name': 'steel-plate',
                'type': 'item',
            },
        ],
        'localized_name': {
            'en': 'Empty barrel',
        },
        'name': 'empty-barrel',
        'order': 'd[empty-barrel]',
        'results': [
            {
                'amount': 1,
                'name': 'empty-barrel',
                'type': 'item',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'energy-shield-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 1,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 10,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Energy shield',
        },
        'name': 'energy-shield-equipment',
        'order': 'a[shield]-a[energy-shield-equipment]',
        'results': [
            {
                'amount': 1,
                'name': 'energy-shield-equipment',
            },
        ],
        'subgroup': 'military-equipment',
        'type': 'recipe',
    },
    'energy-shield-mk2-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 2,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 10,
                'name': 'energy-shield-equipment',
            }, {
                'amount': 5,
                'name': 'processing-unit',
            }, {
                'amount': 5,
                'name': 'low-density-structure',
            },
        ],
        'localized_name': {
            'en': 'Energy shield MK2',
        },
        'name': 'energy-shield-mk2-equipment',
        'order': 'a[shield]-b[energy-shield-equipment-mk2]',
        'results': [
            {
                'amount': 1,
                'name': 'energy-shield-mk2-equipment',
            },
        ],
        'subgroup': 'military-equipment',
        'type': 'recipe',
    },
    'engine-unit': {
        'category': 'advanced-crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 3,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 1,
                'name': 'steel-plate',
            }, {
                'amount': 1,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 2,
                'name': 'pipe',
            },
        ],
        'localized_name': {
            'en': 'Engine unit',
        },
        'name': 'engine-unit',
        'order': 'h[engine-unit]',
        'results': [
            {
                'amount': 1,
                'name': 'engine-unit',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'exoskeleton-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 4,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 10,
                'name': 'processing-unit',
            }, {
                'amount': 30,
                'name': 'electric-engine-unit',
            }, {
                'amount': 20,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Exoskeleton',
        },
        'name': 'exoskeleton-equipment',
        'order': 'd[exoskeleton]-a[exoskeleton-equipment]',
        'results': [
            {
                'amount': 1,
                'name': 'exoskeleton-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'explosive-cannon-shell': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 5,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 2,
                'name': 'steel-plate',
            }, {
                'amount': 2,
                'name': 'plastic-bar',
            }, {
                'amount': 2,
                'name': 'explosives',
            },
        ],
        'localized_name': {
            'en': 'Explosive cannon shell',
        },
        'name': 'explosive-cannon-shell',
        'order': 'd[cannon-shell]-c[explosive]',
        'results': [
            {
                'amount': 1,
                'name': 'explosive-cannon-shell',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'explosive-rocket': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 6,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 1,
                'name': 'rocket',
            }, {
                'amount': 2,
                'name': 'explosives',
            },
        ],
        'localized_name': {
            'en': 'Explosive rocket',
        },
        'name': 'explosive-rocket',
        'order': 'd[rocket-launcher]-b[explosive]',
        'results': [
            {
                'amount': 1,
                'name': 'explosive-rocket',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'explosive-uranium-cannon-shell': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 12,
        'icon_col': 7,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 1,
                'name': 'explosive-cannon-shell',
            }, {
                'amount': 1,
                'name': 'uranium-238',
            },
        ],
        'localized_name': {
            'en': 'Explosive uranium cannon shell',
        },
        'name': 'explosive-uranium-cannon-shell',
        'order': 'd[explosive-cannon-shell]-c[uranium]',
        'results': [
            {
                'amount': 1,
                'name': 'explosive-uranium-cannon-shell',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'explosives': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.259,
                'g': 0.381,
                'r': 0.968,
            },
            'quaternary': {
                'a': 1,
                'b': 0.013,
                'g': 0.17,
                'r': 0.21,
            },
            'secondary': {
                'a': 1,
                'b': 0.534,
                'g': 0.664,
                'r': 0.892,
            },
            'tertiary': {
                'a': 1,
                'b': 0.513,
                'g': 0.978,
                'r': 1,
            },
        },
        'enabled': false,
        'energy_required': 4,
        'icon_col': 8,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 1,
                'name': 'sulfur',
                'type': 'item',
            }, {
                'amount': 1,
                'name': 'coal',
                'type': 'item',
            }, {
                'amount': 10,
                'name': 'water',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Explosives',
        },
        'name': 'explosives',
        'order': 'j[explosives]',
        'results': [
            {
                'amount': 2,
                'name': 'explosives',
            },
        ],
        'subgroup': 'raw-material',
        'type': 'recipe',
    },
    'express-loader': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'hidden': true,
        'icon_col': 9,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 5,
                'name': 'express-transport-belt',
            }, {
                'amount': 1,
                'name': 'fast-loader',
            },
        ],
        'localized_name': {
            'en': 'Express loader',
        },
        'name': 'express-loader',
        'order': 'd[loader]-c[express-loader]',
        'results': [
            {
                'amount': 1,
                'name': 'express-loader',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'express-splitter': {
        'category': 'crafting-with-fluid',
        'enabled': false,
        'energy_required': 2,
        'icon_col': 10,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 1,
                'name': 'fast-splitter',
            }, {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'advanced-circuit',
            }, {
                'amount': 80,
                'name': 'lubricant',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Express splitter',
        },
        'name': 'express-splitter',
        'order': 'c[splitter]-c[express-splitter]',
        'results': [
            {
                'amount': 1,
                'name': 'express-splitter',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'express-transport-belt': {
        'category': 'crafting-with-fluid',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 11,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 1,
                'name': 'fast-transport-belt',
            }, {
                'amount': 20,
                'name': 'lubricant',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Express transport belt',
        },
        'name': 'express-transport-belt',
        'order': 'a[transport-belt]-c[express-transport-belt]',
        'results': [
            {
                'amount': 1,
                'name': 'express-transport-belt',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'express-underground-belt': {
        'category': 'crafting-with-fluid',
        'enabled': false,
        'energy_required': 2,
        'icon_col': 12,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 80,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 2,
                'name': 'fast-underground-belt',
            }, {
                'amount': 40,
                'name': 'lubricant',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Express underground belt',
        },
        'name': 'express-underground-belt',
        'order': 'b[underground-belt]-c[express-underground-belt]',
        'results': [
            {
                'amount': 2,
                'name': 'express-underground-belt',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'fast-inserter': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 13,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 2,
                'name': 'electronic-circuit',
            }, {
                'amount': 2,
                'name': 'iron-plate',
            }, {
                'amount': 1,
                'name': 'inserter',
            },
        ],
        'localized_name': {
            'en': 'Fast inserter',
        },
        'name': 'fast-inserter',
        'order': 'd[fast-inserter]',
        'results': [
            {
                'amount': 1,
                'name': 'fast-inserter',
            },
        ],
        'subgroup': 'inserter',
        'type': 'recipe',
    },
    'fast-loader': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 3,
        'hidden': true,
        'icon_col': 14,
        'icon_row': 4,
        'ingredients': [
            {
                'amount': 5,
                'name': 'fast-transport-belt',
            }, {
                'amount': 1,
                'name': 'loader',
            },
        ],
        'localized_name': {
            'en': 'Fast loader',
        },
        'name': 'fast-loader',
        'order': 'd[loader]-b[fast-loader]',
        'results': [
            {
                'amount': 1,
                'name': 'fast-loader',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'fast-splitter': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 2,
        'icon_col': 0,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 1,
                'name': 'splitter',
            }, {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Fast splitter',
        },
        'name': 'fast-splitter',
        'order': 'c[splitter]-b[fast-splitter]',
        'results': [
            {
                'amount': 1,
                'name': 'fast-splitter',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'fast-transport-belt': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 1,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 1,
                'name': 'transport-belt',
            },
        ],
        'localized_name': {
            'en': 'Fast transport belt',
        },
        'name': 'fast-transport-belt',
        'order': 'a[transport-belt]-b[fast-transport-belt]',
        'results': [
            {
                'amount': 1,
                'name': 'fast-transport-belt',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'fast-underground-belt': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 2,
        'icon_col': 2,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 40,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 2,
                'name': 'underground-belt',
            },
        ],
        'localized_name': {
            'en': 'Fast underground belt',
        },
        'name': 'fast-underground-belt',
        'order': 'b[underground-belt]-b[fast-underground-belt]',
        'results': [
            {
                'amount': 2,
                'name': 'fast-underground-belt',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'filter-inserter': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 3,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 1,
                'name': 'fast-inserter',
            }, {
                'amount': 4,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Filter inserter',
        },
        'name': 'filter-inserter',
        'order': 'e[filter-inserter]',
        'results': [
            {
                'amount': 1,
                'name': 'filter-inserter',
            },
        ],
        'subgroup': 'inserter',
        'type': 'recipe',
    },
    'firearm-magazine': {
        'category': 'crafting',
        'energy_required': 1,
        'icon_col': 4,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 4,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Firearm magazine',
        },
        'name': 'firearm-magazine',
        'order': 'a[basic-clips]-a[firearm-magazine]',
        'results': [
            {
                'amount': 1,
                'name': 'firearm-magazine',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'flamethrower': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 6,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 5,
                'name': 'steel-plate',
            }, {
                'amount': 10,
                'name': 'iron-gear-wheel',
            },
        ],
        'localized_name': {
            'en': 'Flamethrower',
        },
        'name': 'flamethrower',
        'order': 'e[flamethrower]',
        'results': [
            {
                'amount': 1,
                'name': 'flamethrower',
            },
        ],
        'subgroup': 'gun',
        'type': 'recipe',
    },
    'flamethrower-ammo': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.643,
                'g': 0.735,
                'r': 1,
            },
            'quaternary': {
                'a': 1,
                'b': 0.283,
                'g': 0.283,
                'r': 0.283,
            },
            'secondary': {
                'a': 1,
                'b': 0.49,
                'g': 0.557,
                'r': 0.749,
            },
            'tertiary': {
                'a': 1,
                'b': 0.637,
                'g': 0.637,
                'r': 0.637,
            },
        },
        'enabled': false,
        'energy_required': 6,
        'icon_col': 7,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 5,
                'name': 'steel-plate',
                'type': 'item',
            }, {
                'amount': 100,
                'name': 'crude-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Flamethrower ammo',
        },
        'name': 'flamethrower-ammo',
        'order': 'e[flamethrower]',
        'results': [
            {
                'amount': 1,
                'name': 'flamethrower-ammo',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'flamethrower-turret': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 20,
        'icon_col': 8,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 30,
                'name': 'steel-plate',
            }, {
                'amount': 15,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'pipe',
            }, {
                'amount': 5,
                'name': 'engine-unit',
            },
        ],
        'localized_name': {
            'en': 'Flamethrower turret',
        },
        'name': 'flamethrower-turret',
        'order': 'b[turret]-c[flamethrower-turret]',
        'results': [
            {
                'amount': 1,
                'name': 'flamethrower-turret',
            },
        ],
        'subgroup': 'defensive-structure',
        'type': 'recipe',
    },
    'fluid-wagon': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 1.5,
        'icon_col': 9,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 16,
                'name': 'steel-plate',
            }, {
                'amount': 8,
                'name': 'pipe',
            }, {
                'amount': 1,
                'name': 'storage-tank',
            },
        ],
        'localized_name': {
            'en': 'Fluid wagon',
        },
        'name': 'fluid-wagon',
        'order': 'a[train-system]-h[fluid-wagon]',
        'results': [
            {
                'amount': 1,
                'name': 'fluid-wagon',
            },
        ],
        'subgroup': 'train-transport',
        'type': 'recipe',
    },
    'flying-robot-frame': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 20,
        'icon_col': 10,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electric-engine-unit',
            }, {
                'amount': 2,
                'name': 'battery',
            }, {
                'amount': 1,
                'name': 'steel-plate',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Flying robot frame',
        },
        'name': 'flying-robot-frame',
        'order': 'l[flying-robot-frame]',
        'results': [
            {
                'amount': 1,
                'name': 'flying-robot-frame',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'fusion-reactor-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 11,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 200,
                'name': 'processing-unit',
            }, {
                'amount': 50,
                'name': 'low-density-structure',
            },
        ],
        'localized_name': {
            'en': 'Portable fusion reactor',
        },
        'name': 'fusion-reactor-equipment',
        'order': 'a[energy-source]-b[fusion-reactor]',
        'results': [
            {
                'amount': 1,
                'name': 'fusion-reactor-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'gate': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 12,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 1,
                'name': 'stone-wall',
            }, {
                'amount': 2,
                'name': 'steel-plate',
            }, {
                'amount': 2,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Gate',
        },
        'name': 'gate',
        'order': 'a[wall]-b[gate]',
        'results': [
            {
                'amount': 1,
                'name': 'gate',
            },
        ],
        'subgroup': 'defensive-structure',
        'type': 'recipe',
    },
    'green-wire': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 13,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'copper-cable',
            },
        ],
        'localized_name': {
            'en': 'Green wire',
        },
        'name': 'green-wire',
        'order': 'b[wires]-b[green-wire]',
        'results': [
            {
                'amount': 1,
                'name': 'green-wire',
            },
        ],
        'subgroup': 'circuit-network',
        'type': 'recipe',
    },
    'grenade': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 14,
        'icon_row': 5,
        'ingredients': [
            {
                'amount': 5,
                'name': 'iron-plate',
            }, {
                'amount': 10,
                'name': 'coal',
            },
        ],
        'localized_name': {
            'en': 'Grenade',
        },
        'name': 'grenade',
        'order': 'a[grenade]-a[normal]',
        'results': [
            {
                'amount': 1,
                'name': 'grenade',
            },
        ],
        'subgroup': 'capsule',
        'type': 'recipe',
    },
    'gun-turret': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 0,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'copper-plate',
            }, {
                'amount': 20,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Gun turret',
        },
        'name': 'gun-turret',
        'order': 'b[turret]-a[gun-turret]',
        'results': [
            {
                'amount': 1,
                'name': 'gun-turret',
            },
        ],
        'subgroup': 'defensive-structure',
        'type': 'recipe',
    },
    'hazard-concrete': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.25,
        'icon_col': 1,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 10,
                'name': 'concrete',
            },
        ],
        'localized_name': {
            'en': 'Hazard concrete',
        },
        'name': 'hazard-concrete',
        'order': 'b[concrete]-b[hazard]',
        'results': [
            {
                'amount': 10,
                'name': 'hazard-concrete',
            },
        ],
        'subgroup': 'terrain',
        'type': 'recipe',
    },
    'heat-exchanger': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 3,
        'icon_col': 2,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 10,
                'name': 'steel-plate',
            }, {
                'amount': 100,
                'name': 'copper-plate',
            }, {
                'amount': 10,
                'name': 'pipe',
            },
        ],
        'localized_name': {
            'en': 'Heat exchanger',
        },
        'name': 'heat-exchanger',
        'order': 'f[nuclear-energy]-c[heat-exchanger]',
        'results': [
            {
                'amount': 1,
                'name': 'heat-exchanger',
            },
        ],
        'subgroup': 'energy',
        'type': 'recipe',
    },
    'heat-pipe': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 1,
        'icon_col': 4,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 10,
                'name': 'steel-plate',
            }, {
                'amount': 20,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Heat pipe',
        },
        'name': 'heat-pipe',
        'order': 'f[nuclear-energy]-b[heat-pipe]',
        'results': [
            {
                'amount': 1,
                'name': 'heat-pipe',
            },
        ],
        'subgroup': 'energy',
        'type': 'recipe',
    },
    'heavy-armor': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 5,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 100,
                'name': 'copper-plate',
            }, {
                'amount': 50,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Heavy armor',
        },
        'name': 'heavy-armor',
        'order': 'b[heavy-armor]',
        'results': [
            {
                'amount': 1,
                'name': 'heavy-armor',
            },
        ],
        'subgroup': 'armor',
        'type': 'recipe',
    },
    'heavy-oil-cracking': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.261,
                'g': 0.642,
                'r': 1,
            },
            'quaternary': {
                'a': 1,
                'b': 0.271,
                'g': 0.494,
                'r': 1,
            },
            'secondary': {
                'a': 1,
                'b': 0.376,
                'g': 0.722,
                'r': 1,
            },
            'tertiary': {
                'a': 1,
                'b': 0.576,
                'g': 0.659,
                'r': 0.854,
            },
        },
        'enabled': false,
        'energy_required': 2,
        'icon_col': 7,
        'icon_mipmaps': 4,
        'icon_row': 6,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 30,
                'name': 'water',
                'type': 'fluid',
            }, {
                'amount': 40,
                'name': 'heavy-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Heavy oil cracking to light oil',
        },
        'main_product': '',
        'name': 'heavy-oil-cracking',
        'order': 'b[fluid-chemistry]-a[heavy-oil-cracking]',
        'results': [
            {
                'amount': 30,
                'name': 'light-oil',
                'type': 'fluid',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'inserter': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 9,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 1,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Inserter',
        },
        'name': 'inserter',
        'order': 'b[inserter]',
        'results': [
            {
                'amount': 1,
                'name': 'inserter',
            },
        ],
        'subgroup': 'inserter',
        'type': 'recipe',
    },
    'iron-chest': {
        'category': 'crafting',
        'enabled': true,
        'energy_required': 0.5,
        'icon_col': 10,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 8,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Iron chest',
        },
        'name': 'iron-chest',
        'order': 'a[items]-b[iron-chest]',
        'results': [
            {
                'amount': 1,
                'name': 'iron-chest',
            },
        ],
        'subgroup': 'storage',
        'type': 'recipe',
    },
    'iron-gear-wheel': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 11,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 2,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Iron gear wheel',
        },
        'name': 'iron-gear-wheel',
        'order': 'c[iron-gear-wheel]',
        'results': [
            {
                'amount': 1,
                'name': 'iron-gear-wheel',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'iron-plate': {
        'category': 'smelting',
        'energy_required': 3.2,
        'icon_col': 13,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 1,
                'name': 'iron-ore',
            },
        ],
        'localized_name': {
            'en': 'Iron plate',
        },
        'name': 'iron-plate',
        'order': 'b[iron-plate]',
        'results': [
            {
                'amount': 1,
                'name': 'iron-plate',
            },
        ],
        'subgroup': 'raw-material',
        'type': 'recipe',
    },
    'iron-stick': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 14,
        'icon_row': 6,
        'ingredients': [
            {
                'amount': 1,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Iron stick',
        },
        'name': 'iron-stick',
        'order': 'b[iron-stick]',
        'results': [
            {
                'amount': 2,
                'name': 'iron-stick',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'kovarex-enrichment-process': {
        'allow_decomposition': false,
        'category': 'centrifuging',
        'enabled': false,
        'energy_required': 60,
        'icon_col': 0,
        'icon_mipmaps': 4,
        'icon_row': 7,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 40,
                'name': 'uranium-235',
            }, {
                'amount': 5,
                'name': 'uranium-238',
            },
        ],
        'localized_name': {
            'en': 'Kovarex enrichment process',
        },
        'main_product': '',
        'name': 'kovarex-enrichment-process',
        'order': 'r[uranium-processing]-c[kovarex-enrichment-process]',
        'results': [
            {
                'amount': 41,
                'name': 'uranium-235',
            }, {
                'amount': 2,
                'name': 'uranium-238',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'lab': {
        'category': 'crafting',
        'energy_required': 2,
        'icon_col': 1,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 10,
                'name': 'electronic-circuit',
            }, {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 4,
                'name': 'transport-belt',
            },
        ],
        'localized_name': {
            'en': 'Lab',
        },
        'name': 'lab',
        'order': 'g[lab]',
        'results': [
            {
                'amount': 1,
                'name': 'lab',
            },
        ],
        'subgroup': 'production-machine',
        'type': 'recipe',
    },
    'land-mine': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 2,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 1,
                'name': 'steel-plate',
            }, {
                'amount': 2,
                'name': 'explosives',
            },
        ],
        'localized_name': {
            'en': 'Land mine',
        },
        'name': 'land-mine',
        'order': 'f[land-mine]',
        'results': [
            {
                'amount': 4,
                'name': 'land-mine',
            },
        ],
        'subgroup': 'gun',
        'type': 'recipe',
    },
    'landfill': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 3,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 20,
                'name': 'stone',
            },
        ],
        'localized_name': {
            'en': 'Landfill',
        },
        'name': 'landfill',
        'order': 'c[landfill]-a[dirt]',
        'results': [
            {
                'amount': 1,
                'name': 'landfill',
            },
        ],
        'subgroup': 'terrain',
        'type': 'recipe',
    },
    'laser-turret': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 20,
        'icon_col': 4,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 20,
                'name': 'steel-plate',
            }, {
                'amount': 20,
                'name': 'electronic-circuit',
            }, {
                'amount': 12,
                'name': 'battery',
            },
        ],
        'localized_name': {
            'en': 'Laser turret',
        },
        'name': 'laser-turret',
        'order': 'b[turret]-b[laser-turret]',
        'results': [
            {
                'amount': 1,
                'name': 'laser-turret',
            },
        ],
        'subgroup': 'defensive-structure',
        'type': 'recipe',
    },
    'light-armor': {
        'category': 'crafting',
        'enabled': true,
        'energy_required': 3,
        'icon_col': 5,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 40,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Light armor',
        },
        'name': 'light-armor',
        'order': 'a[light-armor]',
        'results': [
            {
                'amount': 1,
                'name': 'light-armor',
            },
        ],
        'subgroup': 'armor',
        'type': 'recipe',
    },
    'light-oil-cracking': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.78,
                'g': 0.596,
                'r': 0.764,
            },
            'quaternary': {
                'a': 1,
                'b': 0.29,
                'g': 0.734,
                'r': 1,
            },
            'secondary': {
                'a': 1,
                'b': 0.844,
                'g': 0.551,
                'r': 0.762,
            },
            'tertiary': {
                'a': 1,
                'b': 0.596,
                'g': 0.773,
                'r': 0.895,
            },
        },
        'enabled': false,
        'energy_required': 2,
        'icon_col': 7,
        'icon_mipmaps': 4,
        'icon_row': 7,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 30,
                'name': 'water',
                'type': 'fluid',
            }, {
                'amount': 30,
                'name': 'light-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Light oil cracking to petroleum gas',
        },
        'main_product': '',
        'name': 'light-oil-cracking',
        'order': 'b[fluid-chemistry]-b[light-oil-cracking]',
        'results': [
            {
                'amount': 20,
                'name': 'petroleum-gas',
                'type': 'fluid',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'loader': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 1,
        'hidden': true,
        'icon_col': 10,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 5,
                'name': 'inserter',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 5,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'transport-belt',
            },
        ],
        'localized_name': {
            'en': 'Loader',
        },
        'name': 'loader',
        'order': 'd[loader]-a[basic-loader]',
        'results': [
            {
                'amount': 1,
                'name': 'loader',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'locomotive': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 4,
        'icon_col': 11,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 20,
                'name': 'engine-unit',
            }, {
                'amount': 10,
                'name': 'electronic-circuit',
            }, {
                'amount': 30,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Locomotive',
        },
        'name': 'locomotive',
        'order': 'a[train-system]-f[locomotive]',
        'results': [
            {
                'amount': 1,
                'name': 'locomotive',
            },
        ],
        'subgroup': 'train-transport',
        'type': 'recipe',
    },
    'logistic-chest-active-provider': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 12,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 1,
                'name': 'steel-chest',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Active provider chest',
        },
        'name': 'logistic-chest-active-provider',
        'order': 'b[storage]-c[logistic-chest-active-provider]',
        'results': [
            {
                'amount': 1,
                'name': 'logistic-chest-active-provider',
            },
        ],
        'subgroup': 'logistic-network',
        'type': 'recipe',
    },
    'logistic-chest-buffer': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 13,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 1,
                'name': 'steel-chest',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Buffer chest',
        },
        'name': 'logistic-chest-buffer',
        'order': 'b[storage]-d[logistic-chest-buffer]',
        'results': [
            {
                'amount': 1,
                'name': 'logistic-chest-buffer',
            },
        ],
        'subgroup': 'logistic-network',
        'type': 'recipe',
    },
    'logistic-chest-passive-provider': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 14,
        'icon_row': 7,
        'ingredients': [
            {
                'amount': 1,
                'name': 'steel-chest',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Passive provider chest',
        },
        'name': 'logistic-chest-passive-provider',
        'order': 'b[storage]-c[logistic-chest-passive-provider]',
        'results': [
            {
                'amount': 1,
                'name': 'logistic-chest-passive-provider',
            },
        ],
        'subgroup': 'logistic-network',
        'type': 'recipe',
    },
    'logistic-chest-requester': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 0,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 1,
                'name': 'steel-chest',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Requester chest',
        },
        'name': 'logistic-chest-requester',
        'order': 'b[storage]-e[logistic-chest-requester]',
        'results': [
            {
                'amount': 1,
                'name': 'logistic-chest-requester',
            },
        ],
        'subgroup': 'logistic-network',
        'type': 'recipe',
    },
    'logistic-chest-storage': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 1,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 1,
                'name': 'steel-chest',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Storage chest',
        },
        'name': 'logistic-chest-storage',
        'order': 'b[storage]-c[logistic-chest-storage]',
        'results': [
            {
                'amount': 1,
                'name': 'logistic-chest-storage',
            },
        ],
        'subgroup': 'logistic-network',
        'type': 'recipe',
    },
    'logistic-robot': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 2,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 1,
                'name': 'flying-robot-frame',
            }, {
                'amount': 2,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Logistic robot',
        },
        'name': 'logistic-robot',
        'order': 'a[robot]-a[logistic-robot]',
        'results': [
            {
                'amount': 1,
                'name': 'logistic-robot',
            },
        ],
        'subgroup': 'logistic-network',
        'type': 'recipe',
    },
    'logistic-science-pack': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 6,
        'icon_col': 3,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 1,
                'name': 'inserter',
            }, {
                'amount': 1,
                'name': 'transport-belt',
            },
        ],
        'localized_name': {
            'en': 'Logistic science pack',
        },
        'name': 'logistic-science-pack',
        'order': 'b[logistic-science-pack]',
        'results': [
            {
                'amount': 1,
                'name': 'logistic-science-pack',
            },
        ],
        'subgroup': 'science-pack',
        'type': 'recipe',
    },
    'long-handed-inserter': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 4,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 1,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 1,
                'name': 'iron-plate',
            }, {
                'amount': 1,
                'name': 'inserter',
            },
        ],
        'localized_name': {
            'en': 'Long-handed inserter',
        },
        'name': 'long-handed-inserter',
        'order': 'c[long-handed-inserter]',
        'results': [
            {
                'amount': 1,
                'name': 'long-handed-inserter',
            },
        ],
        'subgroup': 'inserter',
        'type': 'recipe',
    },
    'low-density-structure': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 20,
        'icon_col': 5,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 2,
                'name': 'steel-plate',
            }, {
                'amount': 20,
                'name': 'copper-plate',
            }, {
                'amount': 5,
                'name': 'plastic-bar',
            },
        ],
        'localized_name': {
            'en': 'Low density structure',
        },
        'name': 'low-density-structure',
        'order': 'o[low-density-structure]',
        'results': [
            {
                'amount': 1,
                'name': 'low-density-structure',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'lubricant': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.223,
                'g': 0.723,
                'r': 0.268,
            },
            'quaternary': {
                'a': 1,
                'b': 0.127,
                'g': 0.395,
                'r': 1,
            },
            'secondary': {
                'a': 1,
                'b': 0.386,
                'g': 0.793,
                'r': 0.432,
            },
            'tertiary': {
                'a': 1,
                'b': 0.396,
                'g': 0.471,
                'r': 0.647,
            },
        },
        'enabled': false,
        'energy_required': 1,
        'icon_col': 6,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 10,
                'name': 'heavy-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Lubricant',
        },
        'name': 'lubricant',
        'order': 'e[lubricant]',
        'results': [
            {
                'amount': 10,
                'name': 'lubricant',
                'type': 'fluid',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'medium-electric-pole': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 7,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 4,
                'name': 'iron-stick',
            }, {
                'amount': 2,
                'name': 'steel-plate',
            }, {
                'amount': 2,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Medium electric pole',
        },
        'name': 'medium-electric-pole',
        'order': 'a[energy]-b[medium-electric-pole]',
        'results': [
            {
                'amount': 1,
                'name': 'medium-electric-pole',
            },
        ],
        'subgroup': 'energy-pipe-distribution',
        'type': 'recipe',
    },
    'military-science-pack': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 8,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 1,
                'name': 'piercing-rounds-magazine',
            }, {
                'amount': 1,
                'name': 'grenade',
            }, {
                'amount': 2,
                'name': 'stone-wall',
            },
        ],
        'localized_name': {
            'en': 'Military science pack',
        },
        'name': 'military-science-pack',
        'order': 'c[military-science-pack]',
        'results': [
            {
                'amount': 2,
                'name': 'military-science-pack',
            },
        ],
        'subgroup': 'science-pack',
        'type': 'recipe',
    },
    'modular-armor': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 9,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 30,
                'name': 'advanced-circuit',
            }, {
                'amount': 50,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Modular armor',
        },
        'name': 'modular-armor',
        'order': 'c[modular-armor]',
        'results': [
            {
                'amount': 1,
                'name': 'modular-armor',
            },
        ],
        'subgroup': 'armor',
        'type': 'recipe',
    },
    'night-vision-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 10,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 10,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Nightvision',
        },
        'name': 'night-vision-equipment',
        'order': 'f[night-vision]-a[night-vision-equipment]',
        'results': [
            {
                'amount': 1,
                'name': 'night-vision-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'nuclear-fuel': {
        'category': 'centrifuging',
        'enabled': false,
        'energy_required': 90,
        'icon_col': 11,
        'icon_mipmaps': 4,
        'icon_row': 8,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 1,
                'name': 'uranium-235',
            }, {
                'amount': 1,
                'name': 'rocket-fuel',
            },
        ],
        'localized_name': {
            'en': 'Nuclear fuel',
        },
        'name': 'nuclear-fuel',
        'order': 'q[uranium-rocket-fuel]',
        'results': [
            {
                'amount': 1,
                'name': 'nuclear-fuel',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'nuclear-fuel-reprocessing': {
        'allow_decomposition': false,
        'category': 'centrifuging',
        'enabled': false,
        'energy_required': 60,
        'icon_col': 12,
        'icon_mipmaps': 4,
        'icon_row': 8,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 5,
                'name': 'used-up-uranium-fuel-cell',
            },
        ],
        'localized_name': {
            'en': 'Nuclear fuel reprocessing',
        },
        'main_product': '',
        'name': 'nuclear-fuel-reprocessing',
        'order': 'r[uranium-processing]-b[nuclear-fuel-reprocessing]',
        'results': [
            {
                'amount': 3,
                'name': 'uranium-238',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'nuclear-reactor': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 13,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 500,
                'name': 'concrete',
            }, {
                'amount': 500,
                'name': 'steel-plate',
            }, {
                'amount': 500,
                'name': 'advanced-circuit',
            }, {
                'amount': 500,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Nuclear reactor',
        },
        'name': 'nuclear-reactor',
        'order': 'f[nuclear-energy]-a[reactor]',
        'requester_paste_multiplier': 1,
        'results': [
            {
                'amount': 1,
                'name': 'nuclear-reactor',
            },
        ],
        'subgroup': 'energy',
        'type': 'recipe',
    },
    'offshore-pump': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 14,
        'icon_row': 8,
        'ingredients': [
            {
                'amount': 2,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'pipe',
            }, {
                'amount': 1,
                'name': 'iron-gear-wheel',
            },
        ],
        'localized_name': {
            'en': 'Offshore pump',
        },
        'name': 'offshore-pump',
        'order': 'b[fluids]-a[offshore-pump]',
        'results': [
            {
                'amount': 1,
                'name': 'offshore-pump',
            },
        ],
        'subgroup': 'extraction-machine',
        'type': 'recipe',
    },
    'oil-refinery': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 0,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 15,
                'name': 'steel-plate',
            }, {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'stone-brick',
            }, {
                'amount': 10,
                'name': 'electronic-circuit',
            }, {
                'amount': 10,
                'name': 'pipe',
            },
        ],
        'localized_name': {
            'en': 'Oil refinery',
        },
        'name': 'oil-refinery',
        'order': 'd[refinery]',
        'results': [
            {
                'amount': 1,
                'name': 'oil-refinery',
            },
        ],
        'subgroup': 'production-machine',
        'type': 'recipe',
    },
    'personal-laser-defense-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 1,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 20,
                'name': 'processing-unit',
            }, {
                'amount': 5,
                'name': 'low-density-structure',
            }, {
                'amount': 5,
                'name': 'laser-turret',
            },
        ],
        'localized_name': {
            'en': 'Personal laser defense',
        },
        'name': 'personal-laser-defense-equipment',
        'order': 'b[active-defense]-a[personal-laser-defense-equipment]',
        'results': [
            {
                'amount': 1,
                'name': 'personal-laser-defense-equipment',
            },
        ],
        'subgroup': 'military-equipment',
        'type': 'recipe',
    },
    'personal-roboport-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 2,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 10,
                'name': 'advanced-circuit',
            }, {
                'amount': 40,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 20,
                'name': 'steel-plate',
            }, {
                'amount': 45,
                'name': 'battery',
            },
        ],
        'localized_name': {
            'en': 'Personal roboport',
        },
        'name': 'personal-roboport-equipment',
        'order': 'e[robotics]-a[personal-roboport-equipment]',
        'results': [
            {
                'amount': 1,
                'name': 'personal-roboport-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'personal-roboport-mk2-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 20,
        'icon_col': 3,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 5,
                'name': 'personal-roboport-equipment',
            }, {
                'amount': 100,
                'name': 'processing-unit',
            }, {
                'amount': 20,
                'name': 'low-density-structure',
            },
        ],
        'localized_name': {
            'en': 'Personal roboport MK2',
        },
        'name': 'personal-roboport-mk2-equipment',
        'order': 'e[robotics]-b[personal-roboport-mk2-equipment]',
        'results': [
            {
                'amount': 1,
                'name': 'personal-roboport-mk2-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'piercing-rounds-magazine': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 3,
        'icon_col': 5,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 1,
                'name': 'firearm-magazine',
            }, {
                'amount': 1,
                'name': 'steel-plate',
            }, {
                'amount': 5,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Piercing rounds magazine',
        },
        'name': 'piercing-rounds-magazine',
        'order': 'a[basic-clips]-b[piercing-rounds-magazine]',
        'results': [
            {
                'amount': 1,
                'name': 'piercing-rounds-magazine',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'piercing-shotgun-shell': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 6,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 2,
                'name': 'shotgun-shell',
            }, {
                'amount': 5,
                'name': 'copper-plate',
            }, {
                'amount': 2,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Piercing shotgun shells',
        },
        'name': 'piercing-shotgun-shell',
        'order': 'b[shotgun]-b[piercing]',
        'results': [
            {
                'amount': 1,
                'name': 'piercing-shotgun-shell',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'pipe': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 7,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 1,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Pipe',
        },
        'name': 'pipe',
        'order': 'a[pipe]-a[pipe]',
        'results': [
            {
                'amount': 1,
                'name': 'pipe',
            },
        ],
        'subgroup': 'energy-pipe-distribution',
        'type': 'recipe',
    },
    'pipe-to-ground': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 8,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 10,
                'name': 'pipe',
            }, {
                'amount': 5,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Pipe to ground',
        },
        'name': 'pipe-to-ground',
        'order': 'a[pipe]-b[pipe-to-ground]',
        'results': [
            {
                'amount': 2,
                'name': 'pipe-to-ground',
            },
        ],
        'subgroup': 'energy-pipe-distribution',
        'type': 'recipe',
    },
    'pistol': {
        'category': 'crafting',
        'energy_required': 5,
        'icon_col': 9,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 5,
                'name': 'copper-plate',
            }, {
                'amount': 5,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Pistol',
        },
        'name': 'pistol',
        'order': 'a[basic-clips]-a[pistol]',
        'results': [
            {
                'amount': 1,
                'name': 'pistol',
            },
        ],
        'subgroup': 'gun',
        'type': 'recipe',
    },
    'plastic-bar': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 1,
                'g': 1,
                'r': 1,
            },
            'quaternary': {
                'a': 1,
                'b': 0,
                'g': 0,
                'r': 0,
            },
            'secondary': {
                'a': 1,
                'b': 0.771,
                'g': 0.771,
                'r': 0.771,
            },
            'tertiary': {
                'a': 1,
                'b': 0.762,
                'g': 0.665,
                'r': 0.768,
            },
        },
        'enabled': false,
        'energy_required': 1,
        'icon_col': 10,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 20,
                'name': 'petroleum-gas',
                'type': 'fluid',
            }, {
                'amount': 1,
                'name': 'coal',
                'type': 'item',
            },
        ],
        'localized_name': {
            'en': 'Plastic bar',
        },
        'name': 'plastic-bar',
        'order': 'f[plastic-bar]',
        'results': [
            {
                'amount': 2,
                'name': 'plastic-bar',
                'type': 'item',
            },
        ],
        'subgroup': 'raw-material',
        'type': 'recipe',
    },
    'poison-capsule': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 12,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 3,
                'name': 'steel-plate',
            }, {
                'amount': 3,
                'name': 'electronic-circuit',
            }, {
                'amount': 10,
                'name': 'coal',
            },
        ],
        'localized_name': {
            'en': 'Poison capsule',
        },
        'name': 'poison-capsule',
        'order': 'b[poison-capsule]',
        'results': [
            {
                'amount': 1,
                'name': 'poison-capsule',
            },
        ],
        'subgroup': 'capsule',
        'type': 'recipe',
    },
    'power-armor': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 20,
        'icon_col': 13,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 40,
                'name': 'processing-unit',
            }, {
                'amount': 20,
                'name': 'electric-engine-unit',
            }, {
                'amount': 40,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Power armor',
        },
        'name': 'power-armor',
        'order': 'd[power-armor]',
        'requester_paste_multiplier': 1,
        'results': [
            {
                'amount': 1,
                'name': 'power-armor',
            },
        ],
        'subgroup': 'armor',
        'type': 'recipe',
    },
    'power-armor-mk2': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 25,
        'icon_col': 14,
        'icon_row': 9,
        'ingredients': [
            {
                'amount': 25,
                'name': 'effectivity-module-2',
            }, {
                'amount': 25,
                'name': 'speed-module-2',
            }, {
                'amount': 60,
                'name': 'processing-unit',
            }, {
                'amount': 40,
                'name': 'electric-engine-unit',
            }, {
                'amount': 30,
                'name': 'low-density-structure',
            },
        ],
        'localized_name': {
            'en': 'Power armor MK2',
        },
        'name': 'power-armor-mk2',
        'order': 'e[power-armor-mk2]',
        'requester_paste_multiplier': 1,
        'results': [
            {
                'amount': 1,
                'name': 'power-armor-mk2',
            },
        ],
        'subgroup': 'armor',
        'type': 'recipe',
    },
    'power-switch': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 2,
        'icon_col': 0,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 5,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'copper-cable',
            }, {
                'amount': 2,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Power switch',
        },
        'name': 'power-switch',
        'order': 'd[other]-a[power-switch]',
        'results': [
            {
                'amount': 1,
                'name': 'power-switch',
            },
        ],
        'subgroup': 'circuit-network',
        'type': 'recipe',
    },
    'processing-unit': {
        'category': 'crafting-with-fluid',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 1,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 20,
                'name': 'electronic-circuit',
            }, {
                'amount': 2,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'sulfuric-acid',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Processing unit',
        },
        'name': 'processing-unit',
        'order': 'g[processing-unit]',
        'results': [
            {
                'amount': 1,
                'name': 'processing-unit',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'production-science-pack': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 21,
        'icon_col': 2,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electric-furnace',
            }, {
                'amount': 1,
                'name': 'productivity-module',
            }, {
                'amount': 30,
                'name': 'rail',
            },
        ],
        'localized_name': {
            'en': 'Production science pack',
        },
        'name': 'production-science-pack',
        'order': 'e[production-science-pack]',
        'results': [
            {
                'amount': 3,
                'name': 'production-science-pack',
            },
        ],
        'subgroup': 'science-pack',
        'type': 'recipe',
    },
    'productivity-module': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 3,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Productivity module',
        },
        'name': 'productivity-module',
        'order': 'c[productivity]-a[productivity-module-1]',
        'results': [
            {
                'amount': 1,
                'name': 'productivity-module',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'productivity-module-2': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 30,
        'icon_col': 4,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 4,
                'name': 'productivity-module',
            }, {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'processing-unit',
            },
        ],
        'localized_name': {
            'en': 'Productivity module 2',
        },
        'name': 'productivity-module-2',
        'order': 'c[productivity]-b[productivity-module-2]',
        'results': [
            {
                'amount': 1,
                'name': 'productivity-module-2',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'productivity-module-3': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 60,
        'icon_col': 5,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 5,
                'name': 'productivity-module-2',
            }, {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'processing-unit',
            },
        ],
        'localized_name': {
            'en': 'Productivity module 3',
        },
        'name': 'productivity-module-3',
        'order': 'c[productivity]-c[productivity-module-3]',
        'results': [
            {
                'amount': 1,
                'name': 'productivity-module-3',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'programmable-speaker': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 2,
        'icon_col': 6,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 3,
                'name': 'iron-plate',
            }, {
                'amount': 4,
                'name': 'iron-stick',
            }, {
                'amount': 5,
                'name': 'copper-cable',
            }, {
                'amount': 4,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Programmable speaker',
        },
        'name': 'programmable-speaker',
        'order': 'd[other]-b[programmable-speaker]',
        'results': [
            {
                'amount': 1,
                'name': 'programmable-speaker',
            },
        ],
        'subgroup': 'circuit-network',
        'type': 'recipe',
    },
    'pump': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 2,
        'icon_col': 7,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 1,
                'name': 'engine-unit',
            }, {
                'amount': 1,
                'name': 'steel-plate',
            }, {
                'amount': 1,
                'name': 'pipe',
            },
        ],
        'localized_name': {
            'en': 'Pump',
        },
        'name': 'pump',
        'order': 'b[pipe]-c[pump]',
        'results': [
            {
                'amount': 1,
                'name': 'pump',
            },
        ],
        'subgroup': 'energy-pipe-distribution',
        'type': 'recipe',
    },
    'pumpjack': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 8,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 5,
                'name': 'steel-plate',
            }, {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            }, {
                'amount': 10,
                'name': 'pipe',
            },
        ],
        'localized_name': {
            'en': 'Pumpjack',
        },
        'name': 'pumpjack',
        'order': 'b[fluids]-b[pumpjack]',
        'results': [
            {
                'amount': 1,
                'name': 'pumpjack',
            },
        ],
        'subgroup': 'extraction-machine',
        'type': 'recipe',
    },
    'radar': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 9,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 5,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Radar',
        },
        'name': 'radar',
        'order': 'd[radar]-a[radar]',
        'results': [
            {
                'amount': 1,
                'name': 'radar',
            },
        ],
        'subgroup': 'defensive-structure',
        'type': 'recipe',
    },
    'rail': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 10,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 1,
                'name': 'stone',
            }, {
                'amount': 1,
                'name': 'iron-stick',
            }, {
                'amount': 1,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Rail',
        },
        'name': 'rail',
        'order': 'a[train-system]-a[rail]',
        'results': [
            {
                'amount': 2,
                'name': 'rail',
            },
        ],
        'subgroup': 'train-transport',
        'type': 'recipe',
    },
    'rail-chain-signal': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 11,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Rail chain signal',
        },
        'name': 'rail-chain-signal',
        'order': 'a[train-system]-e[rail-signal-chain]',
        'results': [
            {
                'amount': 1,
                'name': 'rail-chain-signal',
            },
        ],
        'subgroup': 'train-transport',
        'type': 'recipe',
    },
    'rail-signal': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 12,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Rail signal',
        },
        'name': 'rail-signal',
        'order': 'a[train-system]-d[rail-signal]',
        'results': [
            {
                'amount': 1,
                'name': 'rail-signal',
            },
        ],
        'subgroup': 'train-transport',
        'type': 'recipe',
    },
    'red-wire': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 13,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'copper-cable',
            },
        ],
        'localized_name': {
            'en': 'Red wire',
        },
        'name': 'red-wire',
        'order': 'b[wires]-a[red-wire]',
        'results': [
            {
                'amount': 1,
                'name': 'red-wire',
            },
        ],
        'subgroup': 'circuit-network',
        'type': 'recipe',
    },
    'refined-concrete': {
        'category': 'crafting-with-fluid',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 14,
        'icon_row': 10,
        'ingredients': [
            {
                'amount': 20,
                'name': 'concrete',
            }, {
                'amount': 8,
                'name': 'iron-stick',
            }, {
                'amount': 1,
                'name': 'steel-plate',
            }, {
                'amount': 100,
                'name': 'water',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Refined concrete',
        },
        'name': 'refined-concrete',
        'order': 'b[concrete]-c[refined]',
        'results': [
            {
                'amount': 10,
                'name': 'refined-concrete',
            },
        ],
        'subgroup': 'terrain',
        'type': 'recipe',
    },
    'refined-hazard-concrete': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.25,
        'icon_col': 0,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 10,
                'name': 'refined-concrete',
            },
        ],
        'localized_name': {
            'en': 'Refined hazard concrete',
        },
        'name': 'refined-hazard-concrete',
        'order': 'b[concrete]-d[refined-hazard]',
        'results': [
            {
                'amount': 10,
                'name': 'refined-hazard-concrete',
            },
        ],
        'subgroup': 'terrain',
        'type': 'recipe',
    },
    'repair-pack': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 1,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 2,
                'name': 'electronic-circuit',
            }, {
                'amount': 2,
                'name': 'iron-gear-wheel',
            },
        ],
        'localized_name': {
            'en': 'Repair pack',
        },
        'name': 'repair-pack',
        'order': 'b[repair]-a[repair-pack]',
        'results': [
            {
                'amount': 1,
                'name': 'repair-pack',
            },
        ],
        'subgroup': 'tool',
        'type': 'recipe',
    },
    'roboport': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 2,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 45,
                'name': 'steel-plate',
            }, {
                'amount': 45,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 45,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Roboport',
        },
        'name': 'roboport',
        'order': 'c[signal]-a[roboport]',
        'results': [
            {
                'amount': 1,
                'name': 'roboport',
            },
        ],
        'subgroup': 'logistic-network',
        'type': 'recipe',
    },
    'rocket': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 3,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'explosives',
            }, {
                'amount': 2,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Rocket',
        },
        'name': 'rocket',
        'order': 'd[rocket-launcher]-a[basic]',
        'results': [
            {
                'amount': 1,
                'name': 'rocket',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'rocket-control-unit': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 30,
        'icon_col': 4,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 1,
                'name': 'processing-unit',
            }, {
                'amount': 1,
                'name': 'speed-module',
            },
        ],
        'localized_name': {
            'en': 'Rocket control unit',
        },
        'name': 'rocket-control-unit',
        'order': 'n[rocket-control-unit]',
        'results': [
            {
                'amount': 1,
                'name': 'rocket-control-unit',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'rocket-fuel': {
        'category': 'crafting-with-fluid',
        'enabled': false,
        'energy_required': 30,
        'icon_col': 5,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 10,
                'name': 'solid-fuel',
            }, {
                'amount': 10,
                'name': 'light-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Rocket fuel',
        },
        'name': 'rocket-fuel',
        'order': 'p[rocket-fuel]',
        'results': [
            {
                'amount': 1,
                'name': 'rocket-fuel',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'rocket-launcher': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 6,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 5,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Rocket launcher',
        },
        'name': 'rocket-launcher',
        'order': 'd[rocket-launcher]',
        'results': [
            {
                'amount': 1,
                'name': 'rocket-launcher',
            },
        ],
        'subgroup': 'gun',
        'type': 'recipe',
    },
    'rocket-part': {
        'category': 'rocket-building',
        'enabled': false,
        'energy_required': 3,
        'hidden': true,
        'icon_col': 7,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 10,
                'name': 'rocket-control-unit',
            }, {
                'amount': 10,
                'name': 'low-density-structure',
            }, {
                'amount': 10,
                'name': 'rocket-fuel',
            },
        ],
        'localized_name': {
            'en': 'Rocket part',
        },
        'name': 'rocket-part',
        'order': 'q[rocket-part]',
        'results': [
            {
                'amount': 1,
                'name': 'rocket-part',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'rocket-silo': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 30,
        'icon_col': 8,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 1000,
                'name': 'steel-plate',
            }, {
                'amount': 1000,
                'name': 'concrete',
            }, {
                'amount': 100,
                'name': 'pipe',
            }, {
                'amount': 200,
                'name': 'processing-unit',
            }, {
                'amount': 200,
                'name': 'electric-engine-unit',
            },
        ],
        'localized_name': {
            'en': 'Rocket silo',
        },
        'name': 'rocket-silo',
        'order': 'e[rocket-silo]',
        'requester_paste_multiplier': 1,
        'results': [
            {
                'amount': 1,
                'name': 'rocket-silo',
            },
        ],
        'subgroup': 'space-related',
        'type': 'recipe',
    },
    'satellite': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 9,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 100,
                'name': 'low-density-structure',
            }, {
                'amount': 100,
                'name': 'solar-panel',
            }, {
                'amount': 100,
                'name': 'accumulator',
            }, {
                'amount': 5,
                'name': 'radar',
            }, {
                'amount': 100,
                'name': 'processing-unit',
            }, {
                'amount': 50,
                'name': 'rocket-fuel',
            },
        ],
        'localized_name': {
            'en': 'Satellite',
        },
        'name': 'satellite',
        'order': 'm[satellite]',
        'requester_paste_multiplier': 1,
        'results': [
            {
                'amount': 1,
                'name': 'satellite',
            },
        ],
        'subgroup': 'space-related',
        'type': 'recipe',
    },
    'shotgun': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 10,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 15,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'copper-plate',
            }, {
                'amount': 5,
                'name': 'wood',
            },
        ],
        'localized_name': {
            'en': 'Shotgun',
        },
        'name': 'shotgun',
        'order': 'b[shotgun]-a[basic]',
        'results': [
            {
                'amount': 1,
                'name': 'shotgun',
            },
        ],
        'subgroup': 'gun',
        'type': 'recipe',
    },
    'shotgun-shell': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 3,
        'icon_col': 11,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 2,
                'name': 'copper-plate',
            }, {
                'amount': 2,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Shotgun shells',
        },
        'name': 'shotgun-shell',
        'order': 'b[shotgun]-a[basic]',
        'results': [
            {
                'amount': 1,
                'name': 'shotgun-shell',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'slowdown-capsule': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 8,
        'icon_col': 13,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 2,
                'name': 'steel-plate',
            }, {
                'amount': 2,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'coal',
            },
        ],
        'localized_name': {
            'en': 'Slowdown capsule',
        },
        'name': 'slowdown-capsule',
        'order': 'c[slowdown-capsule]',
        'results': [
            {
                'amount': 1,
                'name': 'slowdown-capsule',
            },
        ],
        'subgroup': 'capsule',
        'type': 'recipe',
    },
    'small-electric-pole': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 14,
        'icon_row': 11,
        'ingredients': [
            {
                'amount': 1,
                'name': 'wood',
            }, {
                'amount': 2,
                'name': 'copper-cable',
            },
        ],
        'localized_name': {
            'en': 'Small electric pole',
        },
        'name': 'small-electric-pole',
        'order': 'a[energy]-a[small-electric-pole]',
        'results': [
            {
                'amount': 2,
                'name': 'small-electric-pole',
            },
        ],
        'subgroup': 'energy-pipe-distribution',
        'type': 'recipe',
    },
    'small-lamp': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 0,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 1,
                'name': 'electronic-circuit',
            }, {
                'amount': 3,
                'name': 'copper-cable',
            }, {
                'amount': 1,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Lamp',
        },
        'name': 'small-lamp',
        'order': 'a[light]-a[small-lamp]',
        'results': [
            {
                'amount': 1,
                'name': 'small-lamp',
            },
        ],
        'subgroup': 'circuit-network',
        'type': 'recipe',
    },
    'solar-panel': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 1,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 5,
                'name': 'steel-plate',
            }, {
                'amount': 15,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Solar panel',
        },
        'name': 'solar-panel',
        'order': 'd[solar-panel]-a[solar-panel]',
        'results': [
            {
                'amount': 1,
                'name': 'solar-panel',
            },
        ],
        'subgroup': 'energy',
        'type': 'recipe',
    },
    'solar-panel-equipment': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 2,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 1,
                'name': 'solar-panel',
            }, {
                'amount': 2,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Portable solar panel',
        },
        'name': 'solar-panel-equipment',
        'order': 'a[energy-source]-a[solar-panel]',
        'results': [
            {
                'amount': 1,
                'name': 'solar-panel-equipment',
            },
        ],
        'subgroup': 'equipment',
        'type': 'recipe',
    },
    'solid-fuel-from-heavy-oil': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.566,
                'g': 0.628,
                'r': 0.889,
            },
            'quaternary': {
                'a': 1,
                'b': 0.127,
                'g': 0.395,
                'r': 1,
            },
            'secondary': {
                'a': 1,
                'b': 0.644,
                'g': 0.668,
                'r': 0.803,
            },
            'tertiary': {
                'a': 1,
                'b': 0.576,
                'g': 0.659,
                'r': 0.854,
            },
        },
        'enabled': false,
        'energy_required': 2,
        'icon_col': 4,
        'icon_mipmaps': 4,
        'icon_row': 12,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 20,
                'name': 'heavy-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Solid fuel',
        },
        'name': 'solid-fuel-from-heavy-oil',
        'order': 'b[fluid-chemistry]-e[solid-fuel-from-heavy-oil]',
        'results': [
            {
                'amount': 1,
                'name': 'solid-fuel',
                'type': 'item',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'solid-fuel-from-light-oil': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.482,
                'g': 0.633,
                'r': 0.71,
            },
            'quaternary': {
                'a': 1,
                'b': 0.202,
                'g': 0.583,
                'r': 0.812,
            },
            'secondary': {
                'a': 1,
                'b': 0.527,
                'g': 0.672,
                'r': 0.745,
            },
            'tertiary': {
                'a': 1,
                'b': 0.596,
                'g': 0.773,
                'r': 0.894,
            },
        },
        'enabled': false,
        'energy_required': 2,
        'icon_col': 5,
        'icon_mipmaps': 4,
        'icon_row': 12,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 10,
                'name': 'light-oil',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Solid fuel',
        },
        'name': 'solid-fuel-from-light-oil',
        'order': 'b[fluid-chemistry]-c[solid-fuel-from-light-oil]',
        'results': [
            {
                'amount': 1,
                'name': 'solid-fuel',
                'type': 'item',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'solid-fuel-from-petroleum-gas': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.768,
                'g': 0.631,
                'r': 0.768,
            },
            'quaternary': {
                'a': 1,
                'b': 0.564,
                'g': 0.364,
                'r': 0.564,
            },
            'secondary': {
                'a': 1,
                'b': 0.678,
                'g': 0.592,
                'r': 0.659,
            },
            'tertiary': {
                'a': 1,
                'b': 0.766,
                'g': 0.631,
                'r': 0.774,
            },
        },
        'enabled': false,
        'energy_required': 2,
        'icon_col': 6,
        'icon_mipmaps': 4,
        'icon_row': 12,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 20,
                'name': 'petroleum-gas',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Solid fuel',
        },
        'name': 'solid-fuel-from-petroleum-gas',
        'order': 'b[fluid-chemistry]-d[solid-fuel-from-petroleum-gas]',
        'results': [
            {
                'amount': 1,
                'name': 'solid-fuel',
                'type': 'item',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'speed-module': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 15,
        'icon_col': 8,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Speed module',
        },
        'name': 'speed-module',
        'order': 'a[speed]-a[speed-module-1]',
        'results': [
            {
                'amount': 1,
                'name': 'speed-module',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'speed-module-2': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 30,
        'icon_col': 9,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 4,
                'name': 'speed-module',
            }, {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'processing-unit',
            },
        ],
        'localized_name': {
            'en': 'Speed module 2',
        },
        'name': 'speed-module-2',
        'order': 'a[speed]-b[speed-module-2]',
        'results': [
            {
                'amount': 1,
                'name': 'speed-module-2',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'speed-module-3': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 60,
        'icon_col': 10,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 5,
                'name': 'speed-module-2',
            }, {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'processing-unit',
            },
        ],
        'localized_name': {
            'en': 'Speed module 3',
        },
        'name': 'speed-module-3',
        'order': 'a[speed]-c[speed-module-3]',
        'results': [
            {
                'amount': 1,
                'name': 'speed-module-3',
            },
        ],
        'subgroup': 'module',
        'type': 'recipe',
    },
    'spidertron': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 11,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 4,
                'name': 'exoskeleton-equipment',
            }, {
                'amount': 2,
                'name': 'fusion-reactor-equipment',
            }, {
                'amount': 4,
                'name': 'rocket-launcher',
            }, {
                'amount': 16,
                'name': 'rocket-control-unit',
            }, {
                'amount': 150,
                'name': 'low-density-structure',
            }, {
                'amount': 2,
                'name': 'radar',
            }, {
                'amount': 2,
                'name': 'effectivity-module-3',
            }, {
                'amount': 1,
                'name': 'raw-fish',
            },
        ],
        'localized_name': {
            'en': 'Spidertron',
        },
        'name': 'spidertron',
        'order': 'b[personal-transport]-c[spidertron]-a[spider]',
        'results': [
            {
                'amount': 1,
                'name': 'spidertron',
            },
        ],
        'subgroup': 'transport',
        'type': 'recipe',
    },
    'splitter': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 1,
        'icon_col': 12,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 5,
                'name': 'electronic-circuit',
            }, {
                'amount': 5,
                'name': 'iron-plate',
            }, {
                'amount': 4,
                'name': 'transport-belt',
            },
        ],
        'localized_name': {
            'en': 'Splitter',
        },
        'name': 'splitter',
        'order': 'c[splitter]-a[splitter]',
        'results': [
            {
                'amount': 1,
                'name': 'splitter',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'stack-filter-inserter': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 13,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 1,
                'name': 'stack-inserter',
            }, {
                'amount': 5,
                'name': 'electronic-circuit',
            },
        ],
        'localized_name': {
            'en': 'Stack filter inserter',
        },
        'name': 'stack-filter-inserter',
        'order': 'g[stack-filter-inserter]',
        'results': [
            {
                'amount': 1,
                'name': 'stack-filter-inserter',
            },
        ],
        'subgroup': 'inserter',
        'type': 'recipe',
    },
    'stack-inserter': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 14,
        'icon_row': 12,
        'ingredients': [
            {
                'amount': 15,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 15,
                'name': 'electronic-circuit',
            }, {
                'amount': 1,
                'name': 'advanced-circuit',
            }, {
                'amount': 1,
                'name': 'fast-inserter',
            },
        ],
        'localized_name': {
            'en': 'Stack inserter',
        },
        'name': 'stack-inserter',
        'order': 'f[stack-inserter]',
        'results': [
            {
                'amount': 1,
                'name': 'stack-inserter',
            },
        ],
        'subgroup': 'inserter',
        'type': 'recipe',
    },
    'steam-engine': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 1,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 8,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 5,
                'name': 'pipe',
            }, {
                'amount': 10,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Steam engine',
        },
        'name': 'steam-engine',
        'order': 'b[steam-power]-b[steam-engine]',
        'results': [
            {
                'amount': 1,
                'name': 'steam-engine',
            },
        ],
        'subgroup': 'energy',
        'type': 'recipe',
    },
    'steam-turbine': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 3,
        'icon_col': 2,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 50,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 50,
                'name': 'copper-plate',
            }, {
                'amount': 20,
                'name': 'pipe',
            },
        ],
        'localized_name': {
            'en': 'Steam turbine',
        },
        'name': 'steam-turbine',
        'order': 'f[nuclear-energy]-d[steam-turbine]',
        'results': [
            {
                'amount': 1,
                'name': 'steam-turbine',
            },
        ],
        'subgroup': 'energy',
        'type': 'recipe',
    },
    'steel-chest': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 4,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 8,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Steel chest',
        },
        'name': 'steel-chest',
        'order': 'a[items]-c[steel-chest]',
        'results': [
            {
                'amount': 1,
                'name': 'steel-chest',
            },
        ],
        'subgroup': 'storage',
        'type': 'recipe',
    },
    'steel-furnace': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 3,
        'icon_col': 5,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 6,
                'name': 'steel-plate',
            }, {
                'amount': 10,
                'name': 'stone-brick',
            },
        ],
        'localized_name': {
            'en': 'Steel furnace',
        },
        'name': 'steel-furnace',
        'order': 'b[steel-furnace]',
        'results': [
            {
                'amount': 1,
                'name': 'steel-furnace',
            },
        ],
        'subgroup': 'smelting-machine',
        'type': 'recipe',
    },
    'steel-plate': {
        'category': 'smelting',
        'enabled': false,
        'energy_required': 16,
        'icon_col': 6,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 5,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Steel plate',
        },
        'name': 'steel-plate',
        'order': 'd[steel-plate]',
        'results': [
            {
                'amount': 1,
                'name': 'steel-plate',
            },
        ],
        'subgroup': 'raw-material',
        'type': 'recipe',
    },
    'stone-brick': {
        'category': 'smelting',
        'enabled': true,
        'energy_required': 3.2,
        'icon_col': 8,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 2,
                'name': 'stone',
            },
        ],
        'localized_name': {
            'en': 'Stone brick',
        },
        'name': 'stone-brick',
        'order': 'a[stone-brick]',
        'results': [
            {
                'amount': 1,
                'name': 'stone-brick',
            },
        ],
        'subgroup': 'terrain',
        'type': 'recipe',
    },
    'stone-furnace': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 9,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 5,
                'name': 'stone',
            },
        ],
        'localized_name': {
            'en': 'Stone furnace',
        },
        'name': 'stone-furnace',
        'order': 'a[stone-furnace]',
        'results': [
            {
                'amount': 1,
                'name': 'stone-furnace',
            },
        ],
        'subgroup': 'smelting-machine',
        'type': 'recipe',
    },
    'stone-wall': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 0,
        'icon_row': 15,
        'ingredients': [
            {
                'amount': 5,
                'name': 'stone-brick',
            },
        ],
        'localized_name': {
            'en': 'Wall',
        },
        'name': 'stone-wall',
        'order': 'a[stone-wall]-a[stone-wall]',
        'results': [
            {
                'amount': 1,
                'name': 'stone-wall',
            },
        ],
        'subgroup': 'defensive-structure',
        'type': 'recipe',
    },
    'storage-tank': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 3,
        'icon_col': 10,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 20,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Storage tank',
        },
        'name': 'storage-tank',
        'order': 'b[fluid]-a[storage-tank]',
        'results': [
            {
                'amount': 1,
                'name': 'storage-tank',
            },
        ],
        'subgroup': 'storage',
        'type': 'recipe',
    },
    'submachine-gun': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 11,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 10,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 5,
                'name': 'copper-plate',
            }, {
                'amount': 10,
                'name': 'iron-plate',
            },
        ],
        'localized_name': {
            'en': 'Submachine gun',
        },
        'name': 'submachine-gun',
        'order': 'a[basic-clips]-b[submachine-gun]',
        'results': [
            {
                'amount': 1,
                'name': 'submachine-gun',
            },
        ],
        'subgroup': 'gun',
        'type': 'recipe',
    },
    'substation': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 12,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 10,
                'name': 'steel-plate',
            }, {
                'amount': 5,
                'name': 'advanced-circuit',
            }, {
                'amount': 5,
                'name': 'copper-plate',
            },
        ],
        'localized_name': {
            'en': 'Substation',
        },
        'name': 'substation',
        'order': 'a[energy]-d[substation]',
        'results': [
            {
                'amount': 1,
                'name': 'substation',
            },
        ],
        'subgroup': 'energy-pipe-distribution',
        'type': 'recipe',
    },
    'sulfur': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0.089,
                'g': 0.995,
                'r': 1,
            },
            'quaternary': {
                'a': 1,
                'b': 0.35,
                'g': 1,
                'r': 0.954,
            },
            'secondary': {
                'a': 1,
                'b': 0.691,
                'g': 0.974,
                'r': 1,
            },
            'tertiary': {
                'a': 1,
                'b': 0.714,
                'g': 0.638,
                'r': 0.723,
            },
        },
        'enabled': false,
        'energy_required': 1,
        'icon_col': 13,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 30,
                'name': 'water',
                'type': 'fluid',
            }, {
                'amount': 30,
                'name': 'petroleum-gas',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Sulfur',
        },
        'name': 'sulfur',
        'order': 'g[sulfur]',
        'results': [
            {
                'amount': 2,
                'name': 'sulfur',
                'type': 'item',
            },
        ],
        'subgroup': 'raw-material',
        'type': 'recipe',
    },
    'sulfuric-acid': {
        'category': 'chemistry',
        'crafting_machine_tint': {
            'primary': {
                'a': 1,
                'b': 0,
                'g': 0.958,
                'r': 1,
            },
            'quaternary': {
                'a': 1,
                'b': 0.019,
                'g': 1,
                'r': 0.969,
            },
            'secondary': {
                'a': 1,
                'b': 0.172,
                'g': 0.852,
                'r': 1,
            },
            'tertiary': {
                'a': 1,
                'b': 0.597,
                'g': 0.869,
                'r': 0.876,
            },
        },
        'enabled': false,
        'energy_required': 1,
        'icon_col': 14,
        'icon_row': 13,
        'ingredients': [
            {
                'amount': 5,
                'name': 'sulfur',
                'type': 'item',
            }, {
                'amount': 1,
                'name': 'iron-plate',
                'type': 'item',
            }, {
                'amount': 100,
                'name': 'water',
                'type': 'fluid',
            },
        ],
        'localized_name': {
            'en': 'Sulfuric acid',
        },
        'name': 'sulfuric-acid',
        'order': 'a[fluid]-f[sulfuric-acid]',
        'results': [
            {
                'amount': 50,
                'name': 'sulfuric-acid',
                'type': 'fluid',
            },
        ],
        'subgroup': 'fluid-recipes',
        'type': 'recipe',
    },
    'tank': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 5,
        'icon_col': 0,
        'icon_row': 14,
        'ingredients': [
            {
                'amount': 32,
                'name': 'engine-unit',
            }, {
                'amount': 50,
                'name': 'steel-plate',
            }, {
                'amount': 15,
                'name': 'iron-gear-wheel',
            }, {
                'amount': 10,
                'name': 'advanced-circuit',
            },
        ],
        'localized_name': {
            'en': 'Tank',
        },
        'name': 'tank',
        'order': 'b[personal-transport]-b[tank]',
        'results': [
            {
                'amount': 1,
                'name': 'tank',
            },
        ],
        'subgroup': 'transport',
        'type': 'recipe',
    },
    'train-stop': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 0.5,
        'icon_col': 2,
        'icon_row': 14,
        'ingredients': [
            {
                'amount': 5,
                'name': 'electronic-circuit',
            }, {
                'amount': 6,
                'name': 'iron-plate',
            }, {
                'amount': 6,
                'name': 'iron-stick',
            }, {
                'amount': 3,
                'name': 'steel-plate',
            },
        ],
        'localized_name': {
            'en': 'Train stop',
        },
        'name': 'train-stop',
        'order': 'a[train-system]-c[train-stop]',
        'results': [
            {
                'amount': 1,
                'name': 'train-stop',
            },
        ],
        'subgroup': 'train-transport',
        'type': 'recipe',
    },
    'transport-belt': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 3,
        'icon_row': 14,
        'ingredients': [
            {
                'amount': 1,
                'name': 'iron-plate',
            }, {
                'amount': 1,
                'name': 'iron-gear-wheel',
            },
        ],
        'localized_name': {
            'en': 'Transport belt',
        },
        'name': 'transport-belt',
        'order': 'a[transport-belt]-a[transport-belt]',
        'results': [
            {
                'amount': 2,
                'name': 'transport-belt',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'underground-belt': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 1,
        'icon_col': 4,
        'icon_row': 14,
        'ingredients': [
            {
                'amount': 10,
                'name': 'iron-plate',
            }, {
                'amount': 5,
                'name': 'transport-belt',
            },
        ],
        'localized_name': {
            'en': 'Underground belt',
        },
        'name': 'underground-belt',
        'order': 'b[underground-belt]-a[underground-belt]',
        'results': [
            {
                'amount': 2,
                'name': 'underground-belt',
            },
        ],
        'subgroup': 'belt',
        'type': 'recipe',
    },
    'uranium-cannon-shell': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 12,
        'icon_col': 8,
        'icon_row': 14,
        'ingredients': [
            {
                'amount': 1,
                'name': 'cannon-shell',
            }, {
                'amount': 1,
                'name': 'uranium-238',
            },
        ],
        'localized_name': {
            'en': 'Uranium cannon shell',
        },
        'name': 'uranium-cannon-shell',
        'order': 'd[cannon-shell]-c[uranium]',
        'results': [
            {
                'amount': 1,
                'name': 'uranium-cannon-shell',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'uranium-fuel-cell': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 9,
        'icon_row': 14,
        'ingredients': [
            {
                'amount': 10,
                'name': 'iron-plate',
            }, {
                'amount': 1,
                'name': 'uranium-235',
            }, {
                'amount': 19,
                'name': 'uranium-238',
            },
        ],
        'localized_name': {
            'en': 'Uranium fuel cell',
        },
        'name': 'uranium-fuel-cell',
        'order': 'r[uranium-processing]-a[uranium-fuel-cell]',
        'results': [
            {
                'amount': 10,
                'name': 'uranium-fuel-cell',
            },
        ],
        'subgroup': 'intermediate-product',
        'type': 'recipe',
    },
    'uranium-processing': {
        'category': 'centrifuging',
        'enabled': false,
        'energy_required': 12,
        'icon_col': 11,
        'icon_mipmaps': 4,
        'icon_row': 14,
        'icon_size': 64,
        'ingredients': [
            {
                'amount': 10,
                'name': 'uranium-ore',
            },
        ],
        'localized_name': {
            'en': 'Uranium processing',
        },
        'name': 'uranium-processing',
        'order': 'k[uranium-processing]',
        'results': [
            {
                'amount': 1,
                'name': 'uranium-235',
                'probability': 0.007,
            }, {
                'amount': 1,
                'name': 'uranium-238',
                'probability': 0.993,
            },
        ],
        'subgroup': 'raw-material',
        'type': 'recipe',
    },
    'uranium-rounds-magazine': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 10,
        'icon_col': 12,
        'icon_row': 14,
        'ingredients': [
            {
                'amount': 1,
                'name': 'piercing-rounds-magazine',
            }, {
                'amount': 1,
                'name': 'uranium-238',
            },
        ],
        'localized_name': {
            'en': 'Uranium rounds magazine',
        },
        'name': 'uranium-rounds-magazine',
        'order': 'a[basic-clips]-c[uranium-rounds-magazine]',
        'results': [
            {
                'amount': 1,
                'name': 'uranium-rounds-magazine',
            },
        ],
        'subgroup': 'ammo',
        'type': 'recipe',
    },
    'utility-science-pack': {
        'category': 'crafting',
        'enabled': false,
        'energy_required': 21,
        'icon_col': 14,
        'icon_row': 14,
        'ingredients': [
            {
                'amount': 3,
                'name': 'low-density-structure',
            }, {
                'amount': 2,
                'name': 'processing-unit',
            }, {
                'amount': 1,
                'name': 'flying-robot-frame',
            },
        ],
        'localized_name': {
            'en': 'Utility science pack',
        },
        'name': 'utility-science-pack',
        'order': 'f[utility-science-pack]',
        'results': [
            {
                'amount': 3,
                'name': 'utility-science-pack',
            },
        ],
        'subgroup': 'science-pack',
        'type': 'recipe',
    },
    'wooden-chest': {
        'category': 'crafting',
        'energy_required': 0.5,
        'icon_col': 3,
        'icon_row': 15,
        'ingredients': [
            {
                'amount': 2,
                'name': 'wood',
            },
        ],
        'localized_name': {
            'en': 'Wooden chest',
        },
        'name': 'wooden-chest',
        'order': 'a[items]-a[wooden-chest]',
        'results': [
            {
                'amount': 1,
                'name': 'wooden-chest',
            },
        ],
        'subgroup': 'storage',
        'type': 'recipe',
    },
    'ammo-nano-termites': {
        name: 'ammo-nano-termites',
        energy_required: 2,
        ingredients: [
            {
                amount: 1,
                name: 'iron-stick',
            }, {
                amount: 1,
                name: 'electronic-circuit',
            },
        ],
        category: 'crafting',
        results: [
            {
                amount: 1,
                name: 'ammo-nano-termites',
            },
        ],
    },
    'ammo-nano-constructors': {
        name: 'ammo-nano-constructors',
        energy_required: 2,
        ingredients: [
            {
                amount: 1,
                name: 'iron-stick',
            }, {
                amount: 1,
                name: 'repair-pack',
            },
        ],
        category: 'crafting',
        results: [
            {
                amount: 1,
                name: 'ammo-nano-constructors',
            },
        ],
    },
} as const;

export type FactorioRecipeName = keyof typeof factorioRecipes;
