var Saba;
(function (Saba) {
    var _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function (object) {
        _DataManager_onLoad.call(this, object);
        if (object !== $dataArmors && object !== $dataActors) {
            return;
        }
        if (!$dataArmors || !$dataActors) {
            return;
        }
        for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
            var a = object_1[_i];
            if (!a) {
                continue;
            }
            if (a.id < 450 || a.id > 500) {
                continue;
            }
            var mid = parseInt(a.meta['actor']);
            var actor = $dataActors[mid];
            var status = MERCENARY_MAP[a.id];
            if (!status) {
                continue;
            }
            var index = 0;
            for (var _a = 0, status_1 = status; _a < status_1.length; _a++) {
                var s = status_1[_a];
                if (index == 0) {
                    if (!actor) {
                        p(a);
                    }
                    actor.initialLevel = s;
                    index++;
                    continue;
                }
                if (index == 1) {
                    actor.maxLevel = getMaxLevel(s);
                    index++;
                    continue;
                }
                var label = getLabel(index);
                var param = PARAM_MAP[s];
                if (param) {
                    actor.meta[label] = param[0];
                }
                actor.meta[label + '_'] = s;
                index++;
            }
        }
    };
    function getMaxLevel(label) {
        switch (label) {
            case 'S': return GROW_ARRAY[0];
            case 'A': return GROW_ARRAY[1];
            case 'B': return GROW_ARRAY[2];
            case 'C': return GROW_ARRAY[3];
            case 'D': return GROW_ARRAY[4];
            case 'E': return GROW_ARRAY[5];
            case 'F': return GROW_ARRAY[6];
        }
    }
    function getLabel(index) {
        switch (index) {
            case 1: return '成長性';
            case 2: return 'str';
            case 3: return 'mgc';
            case 4: return 'vit';
            case 5: return 'mnd';
            case 6: return 'agi';
            case 7: return 'luk';
            case 8: return 'cost';
            case 9: return 'nakadashi';
            case 10: return 'nakadashiCon';
        }
    }
})(Saba || (Saba = {}));
