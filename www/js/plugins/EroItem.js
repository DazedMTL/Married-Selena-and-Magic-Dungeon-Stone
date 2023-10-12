var Saba;
(function (Saba) {
    function onBaisyun(skipDisplay) {
        var ero = $gameSystem.getEro(1);
        if (ero.bote) {
            ero.boteBaisyun = ero.boteBaisyun || 0;
            ero.boteBaisyun++;
            if (BOTE_ITEM_LIST[ero.boteBaisyun]) {
                if (!skipDisplay) {
                    $gameSwitches.setValue(1, true);
                }
                $gameParty.gainItem($dataArmors[BOTE_ITEM_LIST[ero.boteBaisyun]], 1);
                $gameSwitches.setValue(1, false);
            }
        }
        ero.baisyun = ero.baisyun || 0;
        ero.baisyun++;
        for (var i = 1; i <= ero.baisyun; i++) {
            if (ERO_ITEM_LIST[i]) {
                var item = $dataArmors[ERO_ITEM_LIST[i]];
                if (!$gameParty.hasItem(item)) {
                    if (!skipDisplay) {
                        $gameSwitches.setValue(1, true);
                    }
                    $gameParty.gainItem(item, 1);
                    $gameSwitches.setValue(1, false);
                }
            }
        }
    }
    Saba.onBaisyun = onBaisyun;
})(Saba || (Saba = {}));
var ERO_ITEM_LIST = {
    2: 241,
    3: 242,
    4: 247,
    5: 243,
    6: 253,
    7: 254,
    8: 206,
    9: 255,
    10: 204,
    11: 256,
    12: 260,
    13: 244,
    14: 261,
    15: 245,
    16: 252,
    17: 212,
    18: 213,
};
var BOTE_ITEM_LIST = {
    1: 248,
    2: 249,
    5: 250,
};
var CHITSU_LV = {
    'F': 'Undeveloped, like brand new',
    'E': 'Gaining experience, starting to get more seasoned',
    'D': 'Well-used, the labia majora begins to show',
    'C': 'Typical vaginal condition, no longer fresh',
    'B': 'Sloppily stretched labia have become blackened',
    'A': 'Used as a flesh toilet, in a grotesque state',
};
var CRI_LV = {
    'F': 'Almost never touched',
    'E': 'Unexplored and painfully sensitive',
    'D': 'The hood is peeled back, sensitivity has increased',
    'C': 'Experienced multiple clitoral orgasms',
    'B': 'Naturally reaching orgasm in quick succession',
    'A': 'Development complete. Enlarged and exceptional sensitivity',
};
var ANAL_LV = {
    'F': 'None',
    'E': 'Learning to insert into the anus',
    'D': 'Penis easily slides in',
    'C': 'Actively serving as the second vagina',
    'B': 'Enjoys anal orgasms',
    'A': 'Loose and sensitive anus',
};
var MAZO_LV = {
    'F': 'Normal',
    'E': 'Will never lose to a penis!',
    'D': 'Orgasming even though they dislike it',
    'C': 'Sex slave becoming accustomed to it',
    'B': 'Happily owned by the guild',
    'A': 'Body and mind belong to the guild',
};
var SERENA_LV = {
    'F': '"I need to get out of this place quickly"',
    'E': '"I\'ve already been with so many men... I\'m sorry..."',
    'D': '"I don\'t like it, but it feels good to be creampied by someone I don\'t even know..."',
    'C': '"Sex feels so good, I didn\'t know it would be like this"',
    'B': '"This is no good, I might not be able to escape..."',
    'A': '"My body craves men, it feels amazing to be filled up..."',
};
var LINN_LV = {
    'F': '"Mama, I will save you!"',
    'E': '"Please stop the creampies... it\'snot right..."',
    'D': '"I hate that I\'m getting used to this..."',
    'C': '"I tremble when something big enters me, violating the room meant for a baby..."',
    'B': '"It feels so good to be filled deep inside, I almost lose consciousness..."',
    'A': '"I might not be able to escape from the guild... I enjoy being gang-raped by old men..."',
};
var RONA_LV = {
    'F': '"Damn it, everyone is the same..."',
    'E': '"I told you not to cum inside without birth control..."',
    'D': '"I\'ve become a mother..."',
    'C': '"To give birth to the children of those scumbags...?"',
    'B': '"What, you want to cum inside?... Fine. Do whatever you want."',
    'A': '"I\'m the guild\'s flesh toilet... Hahaha. I don\'t care anymore."',
};
var SOFIA_LV = {
    'F': '"I owe a lot to Serena-san, so I must support her"',
    'E': '"Having been impregnated so many times... I\'msorry, God"',
    'D': '"I have been defiled, but my heart is still...',
    'C': '"I am a true sex slave. When I look at the children, I think that way"',
    'B': '"Our father, in heaven. Please save me, drowning in pleasure..."',
    'A': '"Lately, I feel like I\'m going to orgasm every time I give birth... God, please forgive me"',
};
var ACTOR_TEXTS = {
    1: SERENA_LV,
    2: LINN_LV,
    3: RONA_LV,
    4: SOFIA_LV,
};
