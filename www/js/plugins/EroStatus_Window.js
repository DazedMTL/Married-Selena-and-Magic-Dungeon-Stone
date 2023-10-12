var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Saba;
(function (Saba) {
    function randomBetween(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    Saba.randomBetween = randomBetween;
    var savedEro;
    function saveEroUp(actorId) {
        var ero = $gameSystem.getEro(actorId);
        calcHLevel2(ero);
        savedEro = JsonEx.makeDeepCopy(ero);
    }
    Saba.saveEroUp = saveEroUp;
    function displayEroUp(actorId) {
        var ero = $gameSystem.getEro(actorId);
        calcHLevel2(ero);
        displaySexCountUp(ero, 'sexCount', 0);
        displayEroUpOne(ero, 'nakadashi', 1);
        displayEroUpOne(ero, 'kounaisyasei', 2);
        displayEroUpOne(ero, 'analsyasei', 3);
        displayEroUpOne(ero, 'bukkake', 4);
        displayEroUpOne(ero, 'kiss', 5);
        displayEroUpOne(ero, 'chitsuIki', 6);
        displayEroUpOne(ero, 'criIki', 7);
        //displayEroUpOne(ero, 'chikubiIki', 8);
        displayEroUpOne(ero, 'analIki', 9);
        displayEroUpOne(ero, 'chitsu', 20);
        displayEroUpOne(ero, 'cri', 21);
        //displayEroUpOne(ero, 'chikubi', 22);
        displayEroUpOne(ero, 'anal', 23);
        displayEroUpOne(ero, 'mazo', 24);
    }
    Saba.displayEroUp = displayEroUp;
    function displaySexCountUp(ero, label, number) {
        var after = ero[label];
        var before = savedEro[label];
        for (var i in ero.mob) {
            after++;
        }
        for (var i in savedEro.mob) {
            before++;
        }
        var up = after - before;
        if (up > 0) {
            $gameTemp.addEroLog([number, up]);
        }
    }
    function displayEroUpOne(ero, label, number) {
        var up = ero[label] - savedEro[label];
        if (up > 0) {
            $gameTemp.addEroLog([number, up]);
        }
    }
    var _Game_System_prototype_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_prototype_initialize.call(this);
        this.eroStatus = {};
        for (var i = 1; i <= 12; i++) {
            this.eroStatus[i] = this.newEro(i);
        }
        this.timestamp = new Date().getTime();
    };
    function upEroStatus(actorId, mobIdList, eroList, plusNakadashi) {
        if (plusNakadashi === void 0) { plusNakadashi = 0; }
        calcHLevel(actorId);
        if (eroList) {
            for (var _i = 0, eroList_1 = eroList; _i < eroList_1.length; _i++) {
                var nextEro = eroList_1[_i];
                calcHLevel(nextEro.actorId);
            }
        }
        function getNextEro() {
            if (!eroList) {
                return $gameSystem.getEro(actorId);
            }
            return eroList[randomBetween(0, eroList.length - 1)];
        }
        for (var _a = 0, mobIdList_1 = mobIdList; _a < mobIdList_1.length; _a++) {
            var mobId = mobIdList_1[_a];
            var ero2 = getNextEro();
            ero2.mob = ero2.mob || {};
            upEroStatusCount(ero2, mobId, eroList, plusNakadashi);
            var mobEro = $gameSystem.getEro(mobId);
            if (ero2.actorId == 1) {
                mobEro.sexCount++;
            }
            ero2.mob[mobId] = true;
        }
        for (var _b = 0, mobIdList_2 = mobIdList; _b < mobIdList_2.length; _b++) {
            var mobId = mobIdList_2[_b];
            var ero2 = getNextEro();
            ero2.mob = ero2.mob || {};
            upEroStatusOne(ero2, mobId);
        }
    }
    Saba.upEroStatus = upEroStatus;
    function upEroStatusCount(ero, mobId, eroList, plusNakadashi) {
        if (plusNakadashi === void 0) { plusNakadashi = 0; }
        var bonusList = getBonusList(mobId);
        upEroCountByParam(ero, 'chitsuIki', '膣内絶頂', ero.chitsuLv, bonusList);
        upEroCountByParam(ero, 'criIki', 'クリトリス絶頂', ero.criLv, bonusList);
        //upEroCountByParam(ero, 'chikubiIki', '乳首絶頂', ero.chikubiLv, bonusList);
        upEroCountByParam(ero, 'analIki', 'アナル絶頂', ero.analLv, bonusList);
        var mobEro = $gameSystem.getEro(mobId);
        var count = upEroCountByParam(ero, 'kiss', 'キス', 3, bonusList);
        if (count > 0) {
            mobEro['kiss'] += count;
        }
        upSyaseiCount(ero, bonusList, mobId, eroList, plusNakadashi);
    }
    function upEroStatusOne(ero, mobId) {
        var bonusList = getBonusList(mobId);
        upEroStatusByParam(ero, 'chitsu', '膣開発度', bonusList);
        upEroStatusByParam(ero, 'cri', 'クリ開発度', bonusList);
        //upEroStatusByParam(ero, 'chikubi', '乳首開発度', bonusList);
        upEroStatusByParam(ero, 'anal', 'アナル開発度', bonusList);
        upEroStatusByParam(ero, 'mazo', 'Mっ気', bonusList);
    }
    function getBonusList(mobId) {
        var status = MERCENARY_MAP[mobId];
        var bonusList = [];
        for (var i = 12; i < 15; i++) {
            var bonus = ERO_SKILL_MAP[status[i]];
            if (bonus && bonus.length > 0) {
                bonusList.push(bonus);
            }
        }
        bonusList.push(ERO_SKILL_MAP['基本']);
        return bonusList;
    }
    function upSyaseiCount(ero, bonusList, mobId, eroList, plusNakadashi) {
        if (plusNakadashi === void 0) { plusNakadashi = 0; }
        function getNextEro() {
            if (!eroList) {
                return ero;
            }
            return eroList[randomBetween(0, eroList.length - 1)];
        }
        var syaseiList = [];
        if (plusNakadashi == 0) {
            for (var i = 0; i < getSyaseiOdds('膣内射精', bonusList); i++) {
                syaseiList.push('nakadashi');
            }
        }
        for (var i = 0; i < getSyaseiOdds('口内射精', bonusList); i++) {
            if ($gameSwitches.value(40) || ero.actorId != 1) {
                syaseiList.push('kounaisyasei');
            }
        }
        for (var i = 0; i < getSyaseiOdds('アナル射精', bonusList); i++) {
            syaseiList.push('analsyasei');
        }
        for (var i = 0; i < getSyaseiOdds('ぶっかけ射精', bonusList); i++) {
            syaseiList.push('bukkake');
        }
        var mobEro = $gameSystem.getEro(mobId);
        var syaseiCount = calcSyaseiCount(bonusList);
        for (var i = 0; i < syaseiCount; i++) {
            var nextEro = getNextEro();
            var dice = Math.floor(syaseiList.length * Math.random());
            var syasei = syaseiList[dice];
            if (syasei == 'nakadashi') {
                if (nextEro.ninshinRate < 100) {
                    var upEro = calcUpNinshinRate(nextEro);
                    upNinshinRate(nextEro, upEro, mobId);
                }
            }
            nextEro[syasei]++;
            mobEro[syasei]++;
        }
        for (var i = 0; i < plusNakadashi; i++) {
            var nextEro = getNextEro();
            var syasei = 'nakadashi';
            if (nextEro.ninshinRate < 100) {
                var upEro = calcUpNinshinRate(nextEro);
                upNinshinRate(nextEro, upEro, mobId);
            }
            nextEro[syasei]++;
            mobEro[syasei]++;
        }
    }
    function calcUpNinshinRate(ero) {
        if (ero.actorId == 3) {
            if (!$gameSwitches.value(973)) {
                //　ロナ避妊薬あり
                return 0;
            }
        }
        var n = ero.chitsuLv * 1 + 3;
        if (Math.random() > 0.6) {
            n++;
        }
        if (Math.random() > 0.6) {
            n++;
        }
        if (Math.random() > 0.6) {
            n++;
        }
        if (n > 8) {
            n = 8;
        }
        if (!$gameSwitches.value(241)) {
            n /= 3;
        }
        if ($gameVariables.value(30) == 1) {
            n *= 2;
        }
        if ($gameVariables.value(30) == 2) {
            n = 0;
        }
        return n;
    }
    Saba.calcUpNinshinRate = calcUpNinshinRate;
    function upNinshinRate(ero, num, mobId) {
        ero.ninshinRate += num;
        p('妊娠アップ:' + mobId + ' +' + num);
        if (ero.ninshinRate >= 100) {
            p('種親:' + mobId);
            if (mobId) {
                ero.taneoya = $gameActors.actor(mobId - 400).name();
            }
            else {
                ero.taneoya = 'Unknown';
                return;
            }
            if (ero.actorId == 1) {
                var mobEro = $gameSystem.getEro(mobId);
                mobEro.haramase = mobEro.haramase || 0;
                mobEro.haramase++;
            }
        }
    }
    Saba.upNinshinRate = upNinshinRate;
    function getSyaseiOdds(label, bonusList) {
        var index = ERO_SKILL_MAP['label'].indexOf(label);
        var bonus = 0;
        for (var _i = 0, bonusList_1 = bonusList; _i < bonusList_1.length; _i++) {
            var b = bonusList_1[_i];
            var plus = b[index];
            if (plus) {
                bonus += plus;
            }
        }
        if (bonus <= 0) {
            return 0;
        }
        switch (bonus) {
            case 1: return 1;
            case 2: return randomBetween(2, 3);
            case 3: return randomBetween(3, 4);
            case 4: return randomBetween(4, 6);
            case 5: return randomBetween(6, 9);
            case 6: return randomBetween(10, 12);
            default: return 12;
        }
    }
    function calcSyaseiCount(bonusList) {
        var index = ERO_SKILL_MAP['label'].indexOf('射精回数ボーナス');
        var bonus = 0;
        for (var _i = 0, bonusList_2 = bonusList; _i < bonusList_2.length; _i++) {
            var b = bonusList_2[_i];
            var plus = b[index];
            if (plus) {
                bonus += plus;
            }
        }
        switch (bonus) {
            case 0: return randomBetween(1, 2);
            case 1: return randomBetween(1, 2);
            case 2: return randomBetween(1, 3);
            case 3: return randomBetween(1, 4);
            case 4: return randomBetween(2, 4);
            case 5: return randomBetween(2, 5);
            case 6: return randomBetween(3, 6);
            case 7: return randomBetween(4, 6);
            default: return randomBetween(4, 7);
        }
    }
    function upEroStatusByParam(ero, eroParam, label, bonusList) {
        var index = ERO_SKILL_MAP['label'].indexOf(label);
        var bonus = 0;
        for (var _i = 0, bonusList_3 = bonusList; _i < bonusList_3.length; _i++) {
            var b = bonusList_3[_i];
            var plus = b[index];
            if (plus) {
                bonus += plus;
            }
        }
        if (bonus <= 0) {
            return;
        }
        ero[eroParam] += calcUpEroStatus(bonus);
    }
    function upEroCountByParam(ero, eroParam, label, lv, bonusList) {
        if (lv == 0) {
            return 0;
        }
        var index = ERO_SKILL_MAP['label'].indexOf(label);
        var bonus = 0;
        for (var _i = 0, bonusList_4 = bonusList; _i < bonusList_4.length; _i++) {
            var b = bonusList_4[_i];
            var plus = b[index];
            if (plus) {
                bonus += plus;
            }
        }
        if (bonus < 0) {
            return 0;
        }
        var count = calcUpEroCount(lv * 2, bonus);
        ero[eroParam] += count;
        return count;
    }
    function calcUpEroStatus(bonus) {
        var candidates;
        switch (bonus) {
            case 0:
                candidates = [0, 0, 0, 1];
                break;
            case 1:
                candidates = [0, 0, 1, 1];
                break;
            case 2:
                candidates = [0, 1, 1, 1, 2, 2];
                break;
            case 3:
                candidates = [0, 1, 2, 3, 3, 3];
                break;
            case 4:
                candidates = [1, 2, 2, 3, 3, 3, 4];
                break;
            case 5:
                candidates = [1, 2, 3, 4, 4, 5, 5];
                break;
            case 6:
                candidates = [2, 2, 3, 4, 5, 5, 6];
                break;
            default:
                candidates = [3, 3, 3, 4, 5, 6, 7];
                break;
        }
        var n = candidates[randomBetween(0, candidates.length - 1)];
        return n;
    }
    function calcUpEroCount(lv, bonus) {
        lv += calcUpEroStatus(bonus) - 2;
        var candidates;
        switch (lv) {
            case 0:
                candidates = [0, 0, 0, 1];
                break;
            case 1:
                candidates = [0, 0, 1];
                break;
            case 2:
                candidates = [0, 0, 1, 1];
                break;
            case 3:
                candidates = [0, 0, 1, 1, 2, 2];
                break;
            case 4:
                candidates = [0, 0, 1, 2, 2, 3];
                break;
            case 5:
                candidates = [0, 1, 1, 2, 3, 3, 4];
                break;
            case 6:
                candidates = [0, 1, 2, 3, 3, 3, 4];
                break;
            case 7:
                candidates = [1, 2, 3, 4, 4, 5, 5];
                break;
            case 8:
                candidates = [1, 2, 3, 4, 5, 5, 6];
                break;
            case 9:
                candidates = [2, 2, 3, 4, 5, 5, 6];
                break;
            default:
                candidates = [3, 3, 3, 4, 5, 6, 7];
                break;
        }
        var n = candidates[randomBetween(0, candidates.length - 1)];
        return n;
    }
    Game_System.prototype.newEro = function (actorId) {
        var ero = {
            'actorId': actorId,
            'sexCount': 0,
            'nakadashi': 0,
            'kounaisyasei': 0,
            'analsyasei': 0,
            'bukkake': 0,
            'kiss': 0,
            'ninshin': 0,
            'syusan': 0,
            'fame': 0,
            'ninshinRate': 0,
            'bote': 0,
            'eroLevel': 1,
            'eroPoint': 0,
            'anal': 0,
            'chitsu': 0,
            'cri': 0,
            'chikubi': 0,
            'mazo': 0,
            'analIki': 0,
            'chitsuIki': 0,
            'criIki': 0,
            'chikubiIki': 0,
            'hatsutaiken': null,
            'taneoya': null,
            'baby': [],
            'mob': {}
        };
        var actor = $dataActors[actorId];
        if (actor) {
            if (actor.meta['経験人数']) {
                ero.sexCount = parseInt(actor.meta['経験人数']);
            }
            if (actor.meta['中出し回数']) {
                ero.nakadashi = parseInt(actor.meta['中出し回数']);
            }
            if (actor.meta['口内射精回数']) {
                ero.kounaisyasei = parseInt(actor.meta['口内射精回数']);
            }
            if (actor.meta['アナル射精回数']) {
                ero.analsyasei = parseInt(actor.meta['アナル射精回数']);
            }
            if (actor.meta['妊娠回数']) {
                ero.ninshin = parseInt(actor.meta['妊娠回数']);
            }
            if (actor.meta['出産回数']) {
                ero.syusan = parseInt(actor.meta['出産回数']);
            }
            if (actor.meta['膣開発度']) {
                ero.chitsu = parseInt(actor.meta['膣開発度']);
            }
            if (actor.meta['クリ開発度']) {
                ero.cri = parseInt(actor.meta['クリ開発度']);
            }
            if (actor.meta['乳首開発度']) {
                ero.chikubi = parseInt(actor.meta['乳首開発度']);
            }
            if (actor.meta['アナル開発度']) {
                ero.anal = parseInt(actor.meta['アナル開発度']);
            }
            if (actor.meta['キス回数']) {
                ero.kiss = parseInt(actor.meta['キス回数']);
            }
            if (actor.meta['Ｍっ気']) {
                ero.mazo = parseInt(actor.meta['Ｍっ気']);
            }
            if (actor.meta['口内射精']) {
                ero.kounaisyasei = parseInt(actor.meta['口内射精']);
            }
            if (actor.meta['アナル射精']) {
                ero.analsyasei = parseInt(actor.meta['アナル射精']);
            }
            if (actor.meta['ぶっかけ回数']) {
                ero.bukkake = parseInt(actor.meta['ぶっかけ回数']);
            }
            if (actor.meta['キス回数']) {
                ero.kiss = parseInt(actor.meta['キス回数']);
            }
            if (actor.meta['膣イキ']) {
                ero.chitsuIki = parseInt(actor.meta['膣イキ']);
            }
            if (actor.meta['クリイキ']) {
                ero.criIki = parseInt(actor.meta['クリイキ']);
            }
            if (actor.meta['乳首イキ']) {
                ero.chikubiIki = parseInt(actor.meta['乳首イキ']);
            }
            if (actor.meta['アナルイキ']) {
                ero.analIki = parseInt(actor.meta['アナルイキ']);
            }
        }
        if (actorId == 1) {
            ero.hatsutaiken = $dataActors[8].name;
            var baby = {
                'taneoya': 'Randy',
                male: false,
                type: 3
            };
            ero.baby.push(baby);
            ero.baisyunCount = 0;
        }
        if (actorId == 4) {
            var baby = {
                'taneoya': 'Priest',
                male: false,
                type: 0
            };
            ero.baby.push(baby);
            var baby = {
                'taneoya': 'Unknown',
                male: true,
                type: 1
            };
            ero.baby.push(baby);
            var baby = {
                'taneoya': 'Unknown',
                male: false,
                type: 2
            };
            ero.baby.push(baby);
        }
        return ero;
    };
    Game_System.prototype.testSyusan = function (actorId) {
        var ero = this.getEro(actorId);
        for (var i = 0; i < 10; i++) {
            var dice = randomBetween(0, 3);
            switch (dice) {
                case 0:
                    ero.taneoya = 'Mob';
                    break;
                case 1:
                    ero.taneoya = 'Principal';
                    break;
                case 2:
                    ero.taneoya = 'Norio';
                    break;
                case 3:
                    ero.taneoya = '5 People';
                    break;
            }
            this.doSyusan(actorId);
        }
        p(ero);
    };
    Game_System.prototype.doSyusan = function (actorId) {
        var ero = this.getEro(actorId);
        var male = Math.random() < 0.5;
        var baby = {
            'taneoya': ero.taneoya,
            male: male,
            type: randomBetween(0, 2)
        };
        if (ero.taneoya == 'オーク') {
            baby.male = true;
            baby.type = 3;
        }
        ero.baby.push(baby);
        ero.bote = 0;
        ero.taneoya = null;
        ero.ninshinRate = 0;
        ero.lastNinshinRate = 0;
        ero.syusan++;
        $gameActors.actor(actorId).setPoseId(1);
        $gameMedals.onSyusan();
    };
    Game_System.prototype.getEro = function (actorId) {
        this.eroStatus[actorId] = this.eroStatus[actorId] || this.newEro();
        return this.eroStatus[actorId];
    };
    var Window_EroStatus = /** @class */ (function (_super) {
        __extends(Window_EroStatus, _super);
        function Window_EroStatus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_EroStatus.prototype.initialize = function () {
            var width = Graphics.boxWidth;
            var height = Graphics.boxHeight;
            this._lineHeight = 34;
            Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
            this._actor = null;
            this.refresh();
            this.activate();
        };
        Window_EroStatus.prototype.lineColor = function () {
            return this.normalColor();
        };
        Window_EroStatus.prototype.drawHorzLine = function (y) {
            var lineY = y + this.lineHeight() / 2 - 1;
            this.contents.paintOpacity = 48;
            this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
            this.contents.paintOpacity = 255;
        };
        Window_EroStatus.prototype.setActor = function (actor) {
            if (this._actor !== actor) {
                this._actor = actor;
                this.refresh();
            }
        };
        Window_EroStatus.prototype.refresh = function () {
            this.contents.clear();
            if (!this._actor) {
                return;
            }
            Saba.calcHLevel(this._actor.actorId());
            var x = 112;
            this.refreshName();
            this.drawHorzLine(48);
            //this.refreshEroLevelBar(x);
            this.refreshNinshin(x);
            this.refreshEroStatus();
            this.refresBaby();
            this.drawHorzLine(485);
            // this.refreshMedal();
            this.refreshTachie();
        };
        Window_EroStatus.prototype.refreshName = function () {
            var a = this._actor;
            this.contents.fontSize = 32;
            this.contents.drawText(a.currentClass().name, 50, 10, 200, 40, 'left');
        };
        Window_EroStatus.prototype.refreshNinshin = function (x) {
            var y = 10;
            x += 200;
            this.contents.fontSize = 24;
            this.drawText('Egg', x - 52, y + 2);
            var color1 = this.hpGaugeColor1();
            var color2 = this.hpGaugeColor2();
            var ero = $gameSystem.getEro(this._actor.actorId());
            y += 14;
            x += 100;
            this.contents.fillRect(x - 1, y - 1, 201 + 2, 12 + 2, '#FFF');
            this.contents.fillRect(x, y, 201, 12, this.gaugeBackColor());
            if (ero.lastNinshinRate > 100) {
                ero.lastNinshinRate = 100;
            }
            this.contents.gradientFillRect(x, y, (100 - ero.lastNinshinRate) * 2, 12, color1, color2);
        };
        Window_EroStatus.prototype.refreshEroStatus = function () {
            var status = $gameSystem.getEro(this._actor.actorId());
            this.contents.fontSize = 24;
            var y = 94;
            this.drawEroStatus2('Vagina', status.chitsuLv, ' LV', 0, Saba.PLEASURE_ICON, y - 10);
            this.drawEroGauge(0, status.chitsuPer);
            this.drawEroStatusText(status.chitsuLv, CHITSU_LV, 1, y - 17);
            this.drawEroStatus2('Clitoris', status.criLv, ' LV', 2, Saba.PLEASURE_ICON, y - 10);
            this.drawEroGauge(2, status.criPer);
            this.drawEroStatusText(status.criLv, CRI_LV, 3, y - 17);
            this.drawEroStatus2('Anal', status.analLv, ' LV', 4, Saba.PLEASURE_ICON, y - 10);
            this.drawEroGauge(4, status.analPer);
            this.drawEroStatusText(status.analLv, ANAL_LV, 5, y - 17);
            this.drawEroStatus2('Masochism', status.mazoLv, ' LV', 6, Saba.PLEASURE_ICON, y - 10);
            this.drawEroGauge(6, status.mazoPer);
            this.drawEroStatusText(status.mazoLv, MAZO_LV, 7, y - 17);
            /*
            this.drawEroStatus2('乳首開発度', status.chikubiLv, ' LV', 2, KAIRAKU_ICON, y - 10);
            this.drawEroGauge(2, status.chikubiPer);

            this.drawEroStatus2('アナル開発度', status.analLv, ' LV', 4, KAIRAKU_ICON, y - 10);
            this.drawEroGauge(4, status.analPer);

            this.drawEroStatus2('Ｍっ気', status.mazoLv, ' LV', 6, 100, y - 10);
            this.drawEroGauge(6, status.mazoPer);
            */
            var level = this.calcLevel(status);
            this.drawEroStatusText2(level, ACTOR_TEXTS[this._actor.actorId()], 9, y - 10);
            var hatsutaiken = status.hatsutaiken;
            if (!hatsutaiken) {
                hatsutaiken = '処女';
            }
            //this.drawEroStatus('初体験の相手', hatsutaiken, '', 1, 1700, y - 10);
            //this.drawEroStatus('乳首イキ回数', status.chikubiIki, 'X', 8, 1696, y - 10);
            //this.drawEroStatus('アナルイキ回数', status.analIki, 'X', 9, 1710, y - 10);
            var sexCount = status.sexCount;
            for (var i in status.mob) {
                sexCount++;
            }
            this.drawEroStatus('Partners', sexCount, '', 9, Saba.KEIKEN_ICON, y - 10);
            this.drawEroStatus('Creampies', status.nakadashi, 'X', 10, 1711, y - 10);
            this.drawEroStatus('Facials', status.kounaisyasei, 'X', 11, 1708, y - 10);
            this.drawEroStatus('Anal Ejaculations', status.analsyasei, 'X', 12, 1710, y - 10);
            this.drawEroStatus('Bukkake', status.bukkake, 'X', 13, 1707, y - 10);
            this.drawEroStatus('Kisses', status.kiss, 'X', 14, 1681, y - 10);
            this.drawEroStatus('Vaginal Orgasms', status.chitsuIki, 'X', 15, 1700, y - 10);
            this.drawEroStatus('Clit Orgasms', status.criIki, 'X', 16, 1698, y - 10);
            this.drawEroStatus('Pregnancies', status.ninshin, 'X', 17, Saba.NINSHIN_ICON, y - 10);
            this.drawEroStatus('Births', status.syusan, 'X', 18, Saba.SYUSAN_ICON, y - 10);
            if (status.bote) {
                this.drawTaneoya('Parent of Child', status.taneoya, 19, Saba.SYUSAN_ICON, y - 10);
            }
            /*if (status.taneoya) {
                this.drawEroStatus('お腹の子供の親', status.taneoya, '', 6, NINSHIN_ICON, y - 10);
            }*/
        };
        Window_EroStatus.prototype.calcLevel = function (ero) {
            if (ero.actorId == 1 || ero.actorId == 2) {
                return Math.round((ero.chitsuLv + ero.criLv) / 2);
            }
            else {
                if (ero.actorId == 3) {
                    return ero.syusan;
                }
                else {
                    return ero.syusan - 3;
                }
            }
        };
        Window_EroStatus.prototype.drawEroStatusText = function (lv, map, line, y) {
            var x = 22;
            var r = 170;
            var l = this.getLevelLabel(lv);
            this.drawText(map[l], x + 38, line * this._lineHeight + y, 250, 'left');
            //this.drawAlphabet(value, x + r + 90, line * this._lineHeight + y);
        };
        Window_EroStatus.prototype.drawEroStatusText2 = function (lv, map, line, y) {
            var x = 22;
            var r = 170;
            var l = this.getLevelLabel(lv);
            if (!l) {
                l = 'A';
            }
            var texts = map[l].split('\n');
            this.drawText(texts[0], x + 14, line * this._lineHeight + y, 270, 'left');
            if (texts[1]) {
                this.drawText(texts[1], x + 38, (line + 1) * this._lineHeight + y - 8, 270, 'left');
            }
        };
        Window_EroStatus.prototype.getLevelLabel = function (lv) {
            switch (lv) {
                case 0: return 'F';
                case 1: return 'E';
                case 2: return 'D';
                case 3: return 'C';
                case 4: return 'B';
                case 5: return 'A';
            }
        };
        Window_EroStatus.prototype.drawEroGauge = function (y, point) {
            var x = 190;
            var ww = 80;
            if (isNaN(parseInt(point))) {
                point = 0;
            }
            var yy = y * this._lineHeight + 94;
            this.contents.fillRect(x - 1, yy - 1, ww + 2, 12 + 2, '#FFF');
            this.contents.fillRect(x, yy, ww, 12, this.gaugeBackColor());
            var color1 = this.hpGaugeColor1();
            var color2 = this.hpGaugeColor2();
            this.contents.gradientFillRect(x, yy, point / 100 * ww, 12, color1, color2);
        };
        Window_EroStatus.prototype.refresBaby = function () {
            var ero = $gameSystem.getEro(this._actor.actorId());
            ero.baby = ero.baby || [];
            var baby = ero.baby;
            var x = 10;
            var y = 512;
            var count = baby.length;
            if (count > 14) {
                count = 14;
            }
            for (var i = 0; i < count; i++) {
                if (i > 0 && (i % 7) == 0) {
                    x = 10;
                    y += 120;
                }
                this.drawBaby(x, y, baby[baby.length - i - 1]);
                x += 90;
            }
        };
        Window_EroStatus.prototype.drawBaby = function (x, y, baby) {
            var baseTexture = Saba.getSystemBaseTexture('0aka_aka');
            var yy = 0;
            if (!baby.male) {
                yy = 100;
            }
            var type = 0;
            if (baby.type > 0) {
                type = baby.type;
            }
            var aka = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(100 * type, yy, 100, 100)));
            aka.x = x;
            aka.y = y - 5;
            this._windowContentsSprite.addChild(aka);
            this.contents.fontSize = 13;
            this.drawText('Parent:' + baby.taneoya, x + 0, y + 78, 70, 'center');
        };
        Window_EroStatus.prototype.drawEroStatus = function (title, value, text, line, icon, y) {
            var lineCount = 9;
            var x = 22;
            var r = 170;
            if (isNaN(parseInt(value))) {
                value = 0;
            }
            if (line >= lineCount) {
                line -= lineCount;
                x = 370;
                r -= 40;
            }
            this.drawIcon(icon, x, line * this._lineHeight + y);
            this.drawText(title, x + 38, line * this._lineHeight + y, 120, 'left');
            this.drawText(value + '', x + r, line * this._lineHeight + y, 86, 'right');
            this.drawText(text, x + r + 30, line * this._lineHeight + y, 86, 'right');
        };
        Window_EroStatus.prototype.drawTaneoya = function (title, value, line, icon, y) {
            var lineCount = 9;
            var x = 22;
            var r = 170;
            if (line >= lineCount) {
                line -= lineCount;
                x = 370;
                r -= 40;
            }
            this.drawIcon(icon, x, line * this._lineHeight + y);
            this.drawText(title, x + 38, line * this._lineHeight + y, 220, 'left');
            this.drawText(value + '', x + 62, line * this._lineHeight + y + 30, 286, 'left');
        };
        Window_EroStatus.prototype.drawEroStatus2 = function (title, value, text, line, icon, y) {
            var x = 22;
            var r = 170;
            if (isNaN(parseInt(value))) {
                value = 0;
            }
            this.drawIcon(icon, x, line * this._lineHeight + y);
            this.drawText(title, x + 38, line * this._lineHeight + y, 120, 'left');
            this.drawAlphabet(value, x + r + 90, line * this._lineHeight + y);
        };
        Window_EroStatus.prototype.refreshTachie = function () {
            var a = this._actor;
            var lastOuter = a.outerId;
            var lastInnerTop = a.innerTopId;
            var lastInnerBottom = a.innerBottomId;
            a.setOuterId('a');
            a.setInnerTopId('a');
            a.setInnerBottomId('a');
            var ero = $gameSystem.eroStatus[a.actorId()];
            var eroLevel = ero.eroLevel;
            var faceId;
            if (a.defaultFaceId == 1) {
                if (eroLevel >= 5 || ero.bote) {
                    if (a.actorId() == 4) {
                        faceId = 4;
                    }
                    else {
                        faceId = 6;
                    }
                    if (a.actorId() == 1) {
                        a.setHoppeId(2);
                    }
                    else {
                        a.setHoppeId(1);
                    }
                    //a.setPoseId(2);
                }
                else {
                    faceId = 4;
                    if (a.actorId() == 1) {
                        a.setHoppeId(2);
                        faceId = 10;
                    }
                    else {
                        a.setHoppeId(1);
                    }
                    //a.setPoseId(1);
                }
            }
            else {
                faceId = a.defaultFaceId;
            }
            this.drawTachieActor(a, this.contents, 560, 0, null, faceId, 1, false);
            a.setOuterId(lastOuter);
            a.setInnerTopId(lastInnerTop);
            a.setInnerBottomId(lastInnerBottom);
            a.setHoppeId(0);
            a.setPoseId(1);
        };
        Window_EroStatus.prototype.standardPadding = function () {
            return 10;
        };
        Window_EroStatus.prototype.refreshMedal = function () {
            this.contents.fontSize = 26;
            this.drawText('■ Erotic Title', 30, 472, 200);
            this.contents.fontSize = 22;
            this._medalCount = 0;
            this._medalMap = {};
            var ero = $gameSystem.getEro(this._actor.actorId());
            switch (this._actor.actorId()) {
                case 1:
                    this.refreshMedal1(ero);
                    break;
                case 2:
                    this.refreshMedal2(ero);
                    break;
                case 3:
                    this.refreshMedal3(ero);
                    break;
                case 4:
                    this.refreshMedal4(ero);
                    break;
            }
            if (ero.hatsutaiken && this._actor.actorId() > 1) {
                this.addMedal('処女喪失', 1669, 20);
            }
            /*if (ero.nakadashi > 0) {
                this.addMedal('生ハメ中出し', NAKADASHI_ICON, 30);
            }
            if (ero.ninshin > 0) {
                this.addMedal('望まぬ妊娠', NINSHIN_ICON, 40);
            }*/
            this.drawMedal();
        };
        Window_EroStatus.prototype.refreshMedal1 = function (ero) {
            if (ero.syusan > 1) {
                this.addMedal('公開出産', 1886, 0);
            }
            if (ero.sexCount >= 2) {
                this.addMedal('夫以外のちんぽ体験', 1681, 0);
            }
            if ($gameVariables.value(18) >= 1) {
                this.addMedal('初めての売春', 1681, 0);
            }
        };
        Window_EroStatus.prototype.refreshMedal2 = function (ero) {
            if (ero.syusan > 0) {
                this.addMedal('出産動画晒し上げ', 1886, 0);
            }
            if (ero.syusan >= 2) {
                this.addMedal('産んで孕んでまた産んで', 1886, 0);
            }
            if ($gameSwitches.value(931)) {
                this.addMedal('初性行為', 1681, 0);
                this.addMedal('おまんこ撮影', 1885, 5);
            }
            if ($gameSwitches.value(937)) {
                this.addMedal('痴態のネット流出', 245, 15);
            }
            if ($gameSwitches.value(934)) {
                this.addMedal('再生回数100万回突破', 245, 15);
            }
            if ($gameSwitches.value(553)) {
                this.addMedal('不良の性奴隷', 84, 10);
            }
        };
        Window_EroStatus.prototype.refreshMedal3 = function (ero) {
            if (ero.syusan > 0) {
                this.addMedal('秘密の出産', 1886, 0);
            }
            if ($gameSwitches.value(952)) {
                this.addMedal('タクロウの妻', 84, 0);
            }
            if ($gameSwitches.value(956)) {
                this.addMedal('初性行為', 1681, 0);
            }
            if ($gameSwitches.value(952)) {
                this.addMedal('おまんこ撮影', 1885, 5);
            }
            if ($gameSwitches.value(957)) {
                this.addMedal('アナルセックス', 1701, 10);
            }
            if ($gameSwitches.value(554)) {
                this.addMedal('キモオタのペット', 84, 10);
            }
            if ($gameSwitches.value(959)) {
                this.addMedal('野外セックスの噂', 84, 10);
            }
            if ($gameSwitches.value(955)) {
                this.addMedal('学園セックスの噂', 84, 10);
            }
            if ($gameSwitches.value(968) || $gameSwitches.value(969) || $gameSwitches.value(970)) {
                this.addMedal('妊娠セックス', 84, 10);
            }
        };
        Window_EroStatus.prototype.refreshMedal4 = function (ero) {
            if (ero.syusan > 0) {
                var sss = ('' + ero.syusan).replace(/[A-Za-z0-9]/g, function (s) {
                    return String.fromCharCode(s.charCodeAt(0) + 65248);
                });
                this.addMedal(sss + '児の母', 1886, 0);
            }
            if ($gameSwitches.value(972)) {
                this.addMedal('初性行為', 1681, 0);
            }
            if ($gameSwitches.value(971)) {
                this.addMedal('おまんこ撮影', 1885, 5);
            }
            if ($gameSwitches.value(555)) {
                this.addMedal('学園長の通い妻', 84, 10);
            }
            if ($gameSwitches.value(978)) {
                this.addMedal('搾乳家畜', 84, 10);
            }
            if ($gameSwitches.value(980)) {
                this.addMedal('学生結婚', 84, 10);
            }
            if ($gameSwitches.value(981) || $gameSwitches.value(982)) {
                this.addMedal('妊娠セックス', 84, 10);
            }
            if ($gameSwitches.value(808)) {
                this.addMedal('育児放棄', 84, 10);
            }
        };
        Window_EroStatus.prototype.addMedal = function (name, icon, order) {
            if (this._medalMap[name]) {
                return;
            }
            this._medalMap[name] = { name: name, icon: icon, order: order };
        };
        Window_EroStatus.prototype.drawMedal = function () {
            var y = 508;
            var list = [];
            for (var key in this._medalMap) {
                list.push(this._medalMap[key]);
            }
            list = list.sort(function (a, b) {
                return a.order - b.order;
            });
            var xx = 0;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var medal = list_1[_i];
                var icon = medal.icon;
                var name = medal.name;
                this.drawIcon(icon, 32 + xx, this._medalCount * this._lineHeight + y);
                this.drawText(name, 70 + xx, this._medalCount * this._lineHeight + y, 190);
                this._medalCount++;
                if (this._medalCount == 7) {
                    this._medalCount = 0;
                    xx = 300;
                }
            }
        };
        return Window_EroStatus;
    }(Window_Selectable));
    var Scene_EroStatus = /** @class */ (function (_super) {
        __extends(Scene_EroStatus, _super);
        function Scene_EroStatus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_EroStatus.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this._statusWindow = new Window_EroStatus();
            this._statusWindow.setHandler('cancel', this.popScene.bind(this));
            if (!$gameSwitches.value(656)) {
                this._statusWindow.setHandler('pagedown', this.nextActor.bind(this));
                this._statusWindow.setHandler('pageup', this.previousActor.bind(this));
            }
            this._statusWindow.reserveFaceImages();
            this.addWindow(this._statusWindow);
        };
        Scene_EroStatus.prototype.nextActor = function () {
            $gameParty.makeMenuActorNext();
            this.updateActor();
            while (this._actor.isMercenary() || this._actor.actorId() == 11) {
                $gameParty.makeMenuActorNext();
                this.updateActor();
            }
            this.onActorChange();
        };
        Scene_EroStatus.prototype.previousActor = function () {
            $gameParty.makeMenuActorPrevious();
            this.updateActor();
            while (this._actor.isMercenary() || this._actor.actorId() == 11) {
                $gameParty.makeMenuActorPrevious();
                this.updateActor();
            }
            this.onActorChange();
        };
        ;
        return Scene_EroStatus;
    }(Scene_Status));
    Saba.Scene_EroStatus = Scene_EroStatus;
    var _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_prototype_createCommandWindow.call(this);
        this._commandWindow.setHandler('eroStatus', this.commandPersonal.bind(this));
    };
    var _Scene_Menu_prototype_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function () {
        _Scene_Menu_prototype_onPersonalOk.call(this);
        switch (this._commandWindow.currentSymbol()) {
            case 'eroStatus':
                if ($gameParty.menuActor().isMercenary() || $gameParty.menuActor().actorId() == 11) {
                    SoundManager.playBuzzer();
                    this._statusWindow.activate();
                    return;
                }
                SceneManager.push(Scene_EroStatus);
                break;
        }
    };
    var ERO_LEVELS = [0, 10, 30, 50, 80, 120];
    function calcHLevel(actorId) {
        var ero = $gameSystem.getEro(actorId);
        calcHLevel2(ero);
    }
    Saba.calcHLevel = calcHLevel;
    function calcHLevel2(ero) {
        var params = ['chitsu', 'anal', 'chikubi', 'cri', 'mazo'];
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            var n = ero[param];
            for (var i = 0; i < ERO_LEVELS.length; i++) {
                var v = ERO_LEVELS[i];
                if (v <= n) {
                    ero[param + 'Lv'] = i;
                    var v2 = ERO_LEVELS[i + 1];
                    if (v2) {
                        ero[param + 'Per'] = (n - v) / (v2 - v) * 100;
                        if (ero[param + 'Per'] > 100) {
                            ero[param + 'Per'] = 100;
                        }
                    }
                }
            }
        }
    }
    Saba.calcHLevel2 = calcHLevel2;
})(Saba || (Saba = {}));
