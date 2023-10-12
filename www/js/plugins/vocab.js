// menu
TextManager.eroStatus = 'H Status';
TextManager.skillTree = 'Skill Tree';
TextManager.kigae = 'Erotic Armor';
TextManager.medal = 'Medal';
TextManager.organize = 'Organize';
TextManager.mercenaryList = 'List';
TextManager.material = 'Raw Materials';

// status
TextManager.str = 'Strength';
TextManager.dex = 'Dexterity';
TextManager.mgc = 'Magic';
TextManager.mdf = 'Magic Defense';
TextManager.vit = 'Stamina';
TextManager.agi = 'Agility';
TextManager.luk = 'Luck';
TextManager.mnd = 'Spirit';
TextManager.cost = 'Cost';

TextManager.exp = 'Experience';
TextManager.drop = 'Item Drop Rate';
TextManager.rare = 'Rare Drop Rate';
TextManager.weaponBonus = 'Weapon Bonus Acquisition Rate';

// in battle
TextManager.damage = 'Damage';
TextManager.hitRate = 'Hit Rate';
TextManager.cri = 'Critical Rate';
TextManager.cancelSkill = 'Cancel';
TextManager.delay = 'Delay +';
TextManager.alwaysHit = 'Always Hit';

// skill description
TextManager.newSkill = 'New Skill';
TextManager.cancel ='Cancel';
TextManager.spCost = 'SP Cost';
TextManager.bulletCost = 'Bullet Cost';
TextManager.tpCost = 'TP Cost';
TextManager.damage = 'Damage';
TextManager.recover = 'Recover';
TextManager.cancelTargetSkill = 'Cancel Target Skill';
TextManager.delayTarget = 'Delay Target by 1 Turn';
TextManager.stunDemerit = 'Stun Value Decreased';
TextManager.stunUp = 'Stun Value Increased';
TextManager.skipDamage = 'Continued Damage';
TextManager.learningBonus = 'Learning Bonus';
TextManager.requiredSkill = 'Required Skill for Learning';
TextManager.targetAll = 'All Targets';
TextManager.ineffectiveBoss = 'Ineffective Against Boss';
TextManager.ineffectiveBossBattle = 'Ineffective in Boss Battles';
TextManager.cooldown = 'Cooldown Time';
TextManager.attackDown = 'Attack Down';
TextManager.defDown = 'Defense Down';
TextManager.mdfDown = 'Magic Defense Down';
TextManager.normalHit = 'Normal Hit Rate';
TextManager.waitMass = 'Drive Time';
TextManager.baseSuccessRate = 'Base';
TextManager.addState = 'Apply %1';
TextManager.turn = '%1 Turn';
TextManager.turn2 = '%1~%2 Turns';

var _TextManager_param = TextManager.param;
TextManager.param = function (paramId) {
    switch (paramId) {
        case 2: return 'Attack';
        case 3: return 'Accuracy (Sword)';
        case 4: return 'Attack (Chase)';
        case 5: return 'Chase Rate (Chase)';
        case 6: return 'Attack (Gun)';
        case 7: return 'Accuracy (Gun)';
        case 8: return 'Defense';
        case 9: return 'Magic';
        case 10: return 'Magic Defense';
        case 11: return 'Accuracy';
        case 12: return 'Evasion';
        default:
            return _TextManager_param.call(this, paramId);
    }
}

function getStageName(stage) {
    switch (stage) {
        case 1: return 'Demon World';
        case 2: return 'World Tree Forest';
        case 3: return 'Pyramid';
        case 4: return 'Phoenix Nest';
        case 5: return 'Eternal Ice Cave';
        case 6: return 'District 13';
        default: return '';
    }
}

function getPlaceName(placeId) {
    switch (placeId) {
        case Saba.HOME: return 'Home';
        case Saba.SHOP: return 'Shop Bottakuru Store';
        case Saba.DUNGEON: return 'Dungeon Abyssal Labyrinth';
        case Saba.GUILD: return 'Adventurers Guild';
        case Saba.FAVELA: return 'Slums';
        case Saba.CITY: return 'Mandar Village';
        case Saba.ROUKA: return 'Hallway';
        case Saba.GAKUENCHO: return 'Principal\'s Office';
        case Saba.GAKUENCHO_MAE: return 'In Front of Principal\'s Office';
        case Saba.LAB: return 'Mel\'s Laboratory';
        case Saba.VAGRANT: return 'Vagrant\'s Hideout';
        default: return '';
    }
}

Window_BattleLog.prototype.displayBuffs = function (target, buffs, fmt) {
    buffs.forEach(function (paramId) {
        this.push('popBaseLine');
        this.push('pushBaseLine');
        this.push('addText', fmt.format(target.name(), _TextManager_param(paramId)));
    }, this);
};