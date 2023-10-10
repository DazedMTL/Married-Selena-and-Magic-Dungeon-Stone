// menu
TextManager.eroStatus = 'Hステータス';
TextManager.skillTree = 'スキルツリー';
TextManager.kigae = 'エロパーツ装備';
TextManager.medal = '勲章';
TextManager.organize = '冒険者編成';
TextManager.mercenaryList = '冒険者一覧';
TextManager.material = '素材';

// status
TextManager.str = '力';
TextManager.dex = '器用さ';
TextManager.mgc = '魔力';
TextManager.mdf = '魔防力';
TextManager.vit = '体力';
TextManager.agi = '速さ';
TextManager.luk = '運';
TextManager.mnd = '精神力';
TextManager.cost = 'コスト';

TextManager.exp = '経験値';
TextManager.drop = 'アイテムドロップ率';
TextManager.rare = 'レアドロップ率';
TextManager.weaponBonus = '獲得武器能力付与率';

// in battle
TextManager.damage = 'ダメージ';
TextManager.hitRate = '命中';
TextManager.cri = 'クリティカル率';
TextManager.cancelSkill = 'キャンセル';
TextManager.delay = '遅延＋';
TextManager.alwaysHit = '必中';

// skill description
TextManager.newSkill = '新規習得';
TextManager.cancel = 'キャンセル';
TextManager.spCost = '消費ＳＰ';
TextManager.bulletCost = '消費弾数';
TextManager.tpCost = '消費奥義Ｐ';
TextManager.damage = 'ダメージ';
TextManager.recover = '回復';
TextManager.cancelTargetSkill = 'スキルをキャンセルする';
TextManager.delayTarget = '順番を 1 コマ遅らせる';
TextManager.stunDemerit = 'スタン値減少';
TextManager.stunUp = 'スタン値UP';
TextManager.skipDamage = '継続ダメージ';
TextManager.learningBonus = '習得ボーナス';
TextManager.requiredSkill = '習得に必要なスキル';
TextManager.targetAll = '全体攻撃';
TextManager.ineffectiveBoss = 'ボスには無効';
TextManager.ineffectiveBossBattle = 'ボス戦では無効';
TextManager.cooldown = '硬直時間';
TextManager.attackDown = '攻撃↓';
TextManager.defDown = '防御↓';
TextManager.mdfDown = '魔防↓';
TextManager.normalHit = '通常の命中率になる';
TextManager.waitMass = '駆動時間';
TextManager.baseSuccessRate = '基本';
TextManager.addState = '%1付与';
TextManager.turn = '%1ターン';
TextManager.turn2 = '%1〜%2ターン';

var _TextManager_param = TextManager.param;
TextManager.param = function (paramId) {
    switch (paramId) {
        case 2: return '攻撃力';
        case 3: return '命中力(剣)';
        case 4: return '攻撃力(追)';
        case 5: return '追撃率(追)';
        case 6: return '攻撃力(銃)';
        case 7: return '命中力(銃)';
        case 8: return '防御力';
        case 9: return '魔力';
        case 10: return '魔防力';
        case 11: return '命中';
        case 12: return '回避';
        default:
            return _TextManager_param.call(this, paramId);
    }
}

function getStageName(stage) {
    switch (stage) {
        case 1: return '魔界';
        case 2: return '世界樹の森';
        case 3: return 'ピラミッド';
        case 4: return 'フェニックスの巣';
        case 5: return '万年氷洞';
        case 6: return 'District 13';
    }
}

function getPlaceName(placeId) {
    switch (placeId) {
        case Saba.HOME: return '自宅';
        case Saba.SHOP: return 'ショップ「ボッタクル商店」';
        case Saba.DUNGEON: return 'ダンジョン「深淵の迷宮」';
        case Saba.GUILD: return '冒険者ギルド';
        case Saba.FAVELA: return '貧民街';
        case Saba.CITY: return 'マンダールの村';
        case Saba.ROUKA: return '廊下';
        case Saba.GAKUENCHO: return '学園長室';
        case Saba.GAKUENCHO_MAE: return '学園長室の前';
        case Saba.LAB: return 'メルの研究室';
        case Saba.VAGRANT: return '浮浪者のねぐら';
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