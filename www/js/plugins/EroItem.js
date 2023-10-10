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
    'F': '未開発で新品同然',
    'E': '経験を重ね、少しこなれてきた',
    'D': '使い込まれ、大陰唇が露出を始める',
    'C': '一般的な膣具合。もはや新鮮さはない',
    'B': 'だらしなく伸びた大陰唇は黒ずんでもきた',
    'A': '肉便器として使い込まれ、グロマン状態',
};
var CRI_LV = {
    'F': 'ほとんど触られたことがない',
    'E': '未開発で痛いほど敏感',
    'D': '皮が剥かれて感度が上がってきた',
    'C': 'クリイキを何度も経験',
    'B': '連続でオーガズムに達してしまう体質',
    'A': '開発完了。肥大化し、抜群の感度',
};
var ANAL_LV = {
    'F': 'なし',
    'E': 'アナルへの挿入を覚える',
    'D': 'ちんぽも楽々入るようになってきた',
    'C': '２番目のおまんことして活躍中',
    'B': 'アナルイキ大好き',
    'A': 'ガバガバ敏感アナル',
};
var MAZO_LV = {
    'F': 'ノーマル',
    'E': 'ちんぽになんて絶対負けない！',
    'D': '嫌なのにイッちゃう',
    'C': '性奴隷が板についてきた',
    'B': 'ギルドに飼われて幸せです',
    'A': '体も心もギルドのもの',
};
var SERENA_LV = {
    'F': '「こんな場所、はやく\n抜け出さなきゃ」',
    'E': '「もう何人もの男の人と……\nあなたごめんなさい……」',
    'D': '「名前も知らない人に中出しされるの\n嫌なはずなのに……」',
    'C': '「セックスって、こんなに気持ちいいものだったのね」',
    'B': '「ダメよこれ以上は。\n抜け出せなくなる……」',
    'A': '「体が、男の人を求めてしまう。\n中に出されると気持ちいい……」',
};
var LINN_LV = {
    'F': '「おかーさんはあたしが\n助けるんだ！」',
    'E': '「中出しやめてよぉ……。\nこんなのいけない事だよ……」',
    'D': '「ちょっと慣れてきちゃった自分が嫌だ……」',
    'C': '「大きいのを入れられるとビクってする。\n赤ちゃんの部屋まで犯すなんて……」',
    'B': '「奥でビュビューってされると\n気を失っちゃうほど気持ちいい」',
    'A': '「もうギルドから抜け出せないかも。\nおじさんたちに輪姦されるの好きぃ」',
};
var RONA_LV = {
    'F': '「ちっくしょう、どいつもこいつも……」',
    'E': '「避妊薬なしに奥で、\n中で出すなって言ってるだろ！」',
    'D': '「とうとうボクも\nママになっちゃった……」',
    'C': '「あんなクズみたいな奴らの子供を\n産まされ続けるの……？」',
    'B': '「何？中に出したいの？\n……いいよ。好きにすれば」',
    'A': '「ボクはギルドの肉便器\nあはは。もうどうでもいいや。」',
};
var SOFIA_LV = {
    'F': '「セレナさんには恩もありますし\n力になってあげないと」',
    'E': '「もう何度も子供を産まされて……\n神様、申し訳ありません」',
    'D': '「穢されつくした私ですが……\n心まではまだ……」',
    'C': '「私は生粋の性奴隷\n子供達を見ているとそう思います」',
    'B': '「天にまします我らが父よ\n性に溺れる私をお救いください……」',
    'A': '「最近、出産する度イってしまいそう……\n神様、お許しください」',
};
var ACTOR_TEXTS = {
    1: SERENA_LV,
    2: LINN_LV,
    3: RONA_LV,
    4: SOFIA_LV,
};
