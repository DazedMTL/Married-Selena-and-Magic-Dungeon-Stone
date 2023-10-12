//=============================================================================
// RecollectionMode.js
// Copyright (c) 2015 rinne_grid
// This plugin is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc 回想モード機能を追加します。
 * @author rinne_grid
 *
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 */

//-----------------------------------------------------------------------------
// ◆ プラグイン設定
//-----------------------------------------------------------------------------
var SHOW_ALL = false;
var rngd_recollection_mode_settings = {
    //---------------------------------------------------------------------
    // ★ 回想モードで再生するBGMの設定をします
    //---------------------------------------------------------------------
    "rec_mode_bgm": {
        "bgm": {
            "name": "omoi",
            "pan": 0,
            "pitch": 100,
            "volume": 90
        }
    },
    //---------------------------------------------------------------------
    // ★ 回想CG選択ウィンドウの設定を指定します
    //---------------------------------------------------------------------
    "rec_mode_window": {
        "x": 160,
        "y": 120,
        "recollection_title": "Recollection",
        "str_select_recollection": "View Scenes",
        "str_select_cg": "View CG",
        "str_select_back_title": "Back"
    },
    //---------------------------------------------------------------------
    // ★ 回想リストウィンドウの設定を指定します
    //---------------------------------------------------------------------
    "rec_list_window": {
        // 1画面に表示する縦の数
        "item_height": 4,
        // 1画面に表示する横の数
        "item_width": 4,
        // 1枚のCGに説明テキストを表示するかどうか
        "show_title_text": true,
        // タイトルテキストの表示位置(left:左寄せ、center:中央、right:右寄せ）
        "title_text_align": "center",
        // 閲覧したことのないCGの場合に表示するピクチャファイル名
        "never_watch_picture_name": "never_watch_picture",
        // 閲覧したことのないCGのタイトルテキスト
        "never_watch_title_text": ""
    },
    //---------------------------------------------------------------------
    // ★ 回想用のCGを指定します
    //---------------------------------------------------------------------
    "rec_cg_set": [
        {
            'title': 'セレナの輪姦',
            'thumbnail': '01_01_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '11', '12', '13', '21',
                {
                    pic: [21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 28, 26, 23],
                    reverse: false,
                    wait: 1,
                    seIndex: 2,
                    se: ['nure1']
                }, '31', '32', '33', '41', '42',
                {
                    pic: [51, 51, 52, 52, 53, 53, 54, 54, 55, 55, 56, 56, 57, 57, 58, 58, 59, 59, 58, 56, 53],
                    reverse: false,
                    wait: 1,
                    seIndex: 2,
                    se: ['nure1']
                },
            ],
            'common_event_id': 901,
            'switch_id': 901,
            'file': '01_01_0',
            'file2': '01_01_1',
        },
        {
            'title': '義父のいたずら',
            'thumbnail': '01_02_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07'],
            'common_event_id': 902,
            'switch_id': 902,
        },
        {
            'title': '義父とH',
            'thumbnail': '01_03_01',
            'pictures': ['01', '02', '03', '04', '05',
                {
                    pic: [10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 18, 18, 17, 16, 15, 14, 13, 12, 11],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                {
                    pic: [20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 28, 28, 27, 26, 25, 24, 23, 22, 21],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                '31', '32'
            ],
            'common_event_id': 903,
            'switch_id': 903,
        },
        {
            'title': '義父とH',
            'thumbnail': '01_21_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07'],
            'common_event_id': 921,
            'switch_id': 921,
        },
        {
            'title': '２層クリア',
            'thumbnail': '01_05_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
            'common_event_id': 929,
            'switch_id': 929,
        },

        {
            'title': '公開種付け',
            'thumbnail': '01_20_01',
            'pictures': ['01', '02', '03', '04', '05', '11', '12', '13', '14'],
            'common_event_id': 920,
            'switch_id': 920,
        },
        {
            'title': '公開種付け2',
            'thumbnail': '01_16_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'],
            'common_event_id': 916,
            'switch_id': 916,
        },
        {
            'title': '壁尻',
            'thumbnail': '01_18_01',
            'pictures': ['01', '02', '03'],
            'common_event_id': 918,
            'switch_id': 918,
        },
        {
            'title': 'シンくんとH1',
            'thumbnail': '01_15_01',
            'pictures': ['01', '02', '03', '04', '05'],
            'common_event_id': 915,
            'switch_id': 915,
        },
        {
            'title': 'シンくんとH2',
            'thumbnail': '01_14_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'],
            'common_event_id': 914,
            'switch_id': 914,
        },
        {
            'title': 'シンくんとH3',
            'thumbnail': '01_13_01',
            'pictures': ['01', '02', '03', '04', '05', '06'],
            'common_event_id': 913,
            'switch_id': 913,
        },
        {
            'title': '冒険者１',
            'thumbnail': '01_07_01',
            'pictures': ['01', '02', '03', '04', '05'],
            'common_event_id': 907,
            'switch_id': 907,
        },
        {
            'title': '冒険者２',
            'thumbnail': '01_09_01',
            'pictures': ['01',
                {
                    pic: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                {
                    pic: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 29, 29, 28, 28, 27, 27, 26, 26, 25, 25, 24, 24, 23, 23, 22, 22, 21],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                {
                    pic: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 39, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 34, 33, 33, 32, 32, 31],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                '50'
            ],
            'common_event_id': 909,
            'switch_id': 909,
        },
        {
            'title': '冒険者３',
            'thumbnail': '01_05_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
            'common_event_id': 905,
            'switch_id': 905,
        },
        {
            'title': '冒険者４',
            'thumbnail': '01_08_01',
            'pictures': ['01', '02', '03', '04', '11', '12', '13', '14'],
            'common_event_id': 908,
            'switch_id': 908,
        },
        {
            'title': '冒険者５',
            'thumbnail': '01_19_01',
            'pictures': ['01', '02', '03', '04'],
            'common_event_id': 919,
            'switch_id': 919,
        },
        {
            'title': '冒険者６',
            'thumbnail': '01_22_01',
            'pictures': ['01', '02', '03', '04', '11', '12', '13', '14'],
            'common_event_id': 922,
            'switch_id': 922,
        },
        {
            'title': 'コバック',
            'thumbnail': '01_10_01',
            'pictures': ['01',
                {
                    pic: [20, 21, 22, 22, 23, 24, 24, 25, 26, 26, 27, 28, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                {
                    pic: [10, 11, 12, 12, 13, 14, 14, 15, 16, 16, 17, 18, 18, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                {
                    pic: [30, 31, 32, 32, 33, 34, 34, 35, 36, 36, 37, 38, 38, 39, 38, 37, 36, 35, 34, 33, 32, 31],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                40
            ],
            'common_event_id': 910,
            'switch_id': 909,
        },
        {
            'title': '汎用H',
            'thumbnail': '01_11_01',
            'pictures': ['01'],
            'common_event_id': 911,
            'switch_id': 911,
        },
        {
            'title': '初アナルセックス',
            'thumbnail': '01_04_01',
            'pictures': ['01', '02', '03'],
            'common_event_id': 904,
            'switch_id': 904,
        },
        {
            'title': 'ヤリ部屋',
            'thumbnail': '01_06_01',
            'pictures': ['01'],
            'common_event_id': 906,
            'switch_id': 906,
        },
        {
            'title': '母娘丼',
            'thumbnail': '01_23_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '11'],
            'common_event_id': 923,
            'switch_id': 923,
        },
        {
            'title': '母娘丼(グルカ親)',
            'thumbnail': '01_23_21',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '11'],
            'common_event_id': 874,
            'switch_id': 923,
        },
        {
            'title': '母娘丼(ギルメン親)',
            'thumbnail': '01_23_11',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '11'],
            'common_event_id': 875,
            'switch_id': 923,
        },
        {
            'title': 'リンの初体験',
            'thumbnail': '02_01_01',
            'pictures': ['01', '02', '03'],
            'common_event_id': 951,
            'switch_id': 951,
        },
        {
            'title': 'リン調教',
            'thumbnail': '02_04_01',
            'pictures': ['01', '02', '03'],
            'common_event_id': 954,
            'switch_id': 954,
        },
        {
            'title': 'リン売春',
            'thumbnail': '02_02_01',
            'pictures': ['01', '02',
                {
                    pic: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 18, 17, 16, 15, 15, 14, 13, 13, 12, 11],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['teman1']
                },
                '21', '22', '31', '32'
            ],
            'common_event_id': 952,
            'switch_id': 952,
        },
        {
            'title': 'リン騎乗位',
            'thumbnail': '02_03_01',
            'pictures': ['01',
                {
                    pic: [11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 18, 17, 16, 15, 15, 14, 13, 13, 12],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
                {
                    pic: [21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 28, 27, 26, 25, 25, 24, 23, 23, 22],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
                {
                    pic: [31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 38, 37, 36, 35, 35, 34, 33, 33, 32],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
                '41', '42', '43'
            ],
            'common_event_id': 953,
            'switch_id': 953,
        },
        {
            'title': 'リンとクラスメイト',
            'thumbnail': '02_06_01',
            'pictures': ['01', '02', '03',
                {
                    pic: [10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
                '21',
                {
                    pic: [20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 28, 27, 26, 25, 24, 23, 22, 21],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
                '31', '32'
            ],
            'common_event_id': 956,
            'switch_id': 956,
        },
        {
            'title': 'リン輪姦',
            'thumbnail': '02_05_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '08', '09',
                {
                    pic: [11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 18, 17, 15, 13],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
                '21',
                {
                    pic: [31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 38, 37, 35, 33],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
            ],
            'common_event_id': 935,
            'switch_id': 935,
            'file': '02_05_0',
            'file2': '02_05_1',
        },
        {
            'title': '２人の性奴隷',
            'thumbnail': '03_01_01',
            'pictures': ['01', '02', '03'],
            'common_event_id': 971,
            'switch_id': 971,
        },
        {
            'title': 'ロナ調教',
            'thumbnail': '03_02_01',
            'pictures': ['01', '02', '03', '04', '05',
                {
                    pic: [10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 18, 17, 15, 13],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
                {
                    pic: [30, 30, 31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 38, 37, 35, 33],
                    reverse: false,
                    wait: 1,
                    seIndex: 5,
                    se: ['nure1']
                },
                '20', '21', '22'
            ],
            'common_event_id': 972,
            'switch_id': 972,
        },
        {
            'title': 'ロナ種付け',
            'thumbnail': '03_03_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '08'],
            'common_event_id': 973,
            'switch_id': 973,
        },
        {
            'title': 'ロナサンドイッチ',
            'thumbnail': '03_04_01',
            'pictures': ['01', '02',
                {
                    pic: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                    reverse: false,
                    wait: 2,
                    seIndex: 5,
                    se: ['nure1']
                }, {
                    pic: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 28, 27, 27, 26, 26, 25, 25, 24, 24, 23, 23, 22, 22, 21, 21],
                    reverse: false,
                    wait: 2,
                    seIndex: 5,
                    se: ['nure1']
                },
                '49', '32', {
                    pic: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 48, 48, 47, 47, 46, 46, 45, 45, 44, 44, 43, 43, 42, 42, 41, 41],
                    reverse: false,
                    wait: 2,
                    seIndex: 5,
                    se: ['nure1']
                },
                '33'],
            'common_event_id': 974,
            'switch_id': 974,
        },
        {
            'title': 'ソフィアと神父',
            'thumbnail': '04_02_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07', '08'],
            'common_event_id': 982,
            'switch_id': 982,
        },
        {
            'title': 'パイズリセックス',
            'thumbnail': '04_01_01',
            'pictures': ['01', '02', '03', '04', '05', '06'],
            'common_event_id': 981,
            'switch_id': 981,
        },
        {
            'title': 'ボテ腹セックス',
            'thumbnail': '04_03_01',
            'pictures': ['11',
                {
                    pic: [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2],
                    reverse: false,
                    wait: 2,
                    seIndex: 1,
                    se: ['teman1']
                },
                {
                    pic: [21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22],
                    reverse: false,
                    wait: 2,
                    seIndex: 1,
                    se: ['teman1']
                },
                '31'],
            'common_event_id': 983,
            'switch_id': 983,
        },
        {
            'title': '授乳セックス',
            'thumbnail': '04_04_01',
            'pictures': ['01', '02', '03', '04', '05'],
            'common_event_id': 984,
            'switch_id': 984,
        },
        {
            'title': 'メルレイプ',
            'thumbnail': '09_01_01',
            'pictures': ['01', '02', '03', '04', '05', '06', '07'],
            'common_event_id': 991,
            'switch_id': 991,
        },
        {
            'title': 'セレナ出産',
            'thumbnail': 'actor1',
            'pictures': ['01'],
            'common_event_id': 993,
            'switch_id': 993,
            noCg: true
        },
        {
            'title': 'リン出産',
            'thumbnail': 'actor2',
            'pictures': ['01'],
            'common_event_id': 994,
            'switch_id': 994,
            noCg: true
        },
        {
            'title': 'ロナ出産',
            'thumbnail': 'actor3',
            'pictures': ['01'],
            'common_event_id': 995,
            'switch_id': 995,
            noCg: true
        },
        {
            'title': 'ソフィア出産',
            'thumbnail': 'actor4',
            'pictures': ['01'],
            'common_event_id': 996,
            'switch_id': 996,
            noCg: true
        },
        {
            'title': 'バッドエンド',
            'thumbnail': '01_99_01',
            'pictures': ['01'],
            'common_event_id': 997,
            'switch_id': 997,
            noCg: true
        },
        {
            'title': 'フリーHモード',
            'thumbnail': '01_99_01',
            'pictures': ['01'],
            'common_event_id': 998,
            'switch_id': 998,
            noCg: true
        },
        /*{
            'title': 'シオリの決意',
            'thumbnail': '04_02_01',
            'pictures': [1, 2, 
                { pic: [2, 3, 4, 5, 6], reverse: true, wait: 4, seIndex: 5, se: ['teman1'] },
                { pic: [12, 13, 14, 15, 16], reverse: true, wait: 4, seIndex: 5, se: ['teman1'] },
                22,
                { pic: [23, 24, 25, 26, 27, 28, 29, 30], reverse: true, wait: 3, seIndex: 7, se: ['teman1'] },
                { pic: [33, 34, 35, 36, 37, 38, 39, 40], reverse: true, wait: 3, seIndex: 7, se: ['teman1'] },
                41, 42, 43, 45
            ],
            'common_event_id': 972,
            'switch_id': 972,
            'paso': [[75, 35], [45, 55]]
            
        },
        {
            'title': 'エリスの妊娠セックス',
            'thumbnail': '05_01_01',
            'pictures': [1,
                { pic: [11, 12, 13, 14, 15, 16, 17, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11], reverse: false, wait: 2, seIndex: 5, se: ['pis1', 'pis2', 'pis3', 'pis4'] },
                { pic: [21, 22, 23, 24, 25, 26, 27, 28, 27, 27, 26, 26, 25, 25, 24, 24, 23, 23, 22, 22, 21], reverse: false, wait: 1, seIndex: 5, se: ['pis1', 'pis2', 'pis3', 'pis4'] },
                4
            ],
            'common_event_id': 987,
            'switch_id': 987,
        },
        /*{
            'title': 'ゲラルドによる処女喪失',
            'pictures': ['ero_01_02_01', 'ero_01_02_02', 'ero_01_02_03', 'ero_01_02_04', 'ero_01_02_05', 'ero_01_02_06', 'ero_01_02_07', 'ero_01_02_08', 'ero_01_02_09', 'ero_01_02_10', 'ero_01_02_11'],
            'common_event_id': 902,
            'switch_id': 902,
            'paso': [[30, 100], [60, 70]]
        
            'pictures': ['ero_01_08_01', 'ero_01_08_02', 'ero_01_08_03', 'ero_01_08_04', 'ero_01_08_05', 'ero_01_08_06', 'ero_01_08_07', 'ero_01_08_08', 'ero_01_08_09'],
            'common_event_id': 908,
     
            'paso': [[220, 150]]
        },
        {
            'title': 'サーシャと共にＨ',
    
      },*/
    ],
    //---------------------------------------------------------------------
    // ★ 回想時に一時的に利用するマップIDを指定します
    //---------------------------------------------------------------------
    // 通常は何もないマップを指定します
    //---------------------------------------------------------------------
    "sandbox_map_id": 20
};

function rngd_hash_size(obj) {
    var cnt = 0;
    for (var o in obj) {
        cnt++;
    }
    return cnt;
}

//-----------------------------------------------------------------------------
// ◆ Scene関数
//-----------------------------------------------------------------------------

//=========================================================================
// ■ Scene_Recollection
//=========================================================================
// 回想用のシーン関数です
//=========================================================================
function Scene_Recollection() {
    this.initialize.apply(this, arguments);

}

Scene_Recollection.prototype = Object.create(Scene_Base.prototype);
Scene_Recollection.prototype.constructor = Scene_Recollection;

Scene_Recollection.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Recollection.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createWindowLayer();
    this.createCommandWindow();
};

// 回想モードのカーソル
Scene_Recollection.rec_list_index = 0;

// 回想モードの再読み込み判定用 true: コマンドウィンドウを表示せず回想リストを表示 false:コマンドウィンドウを表示
Scene_Recollection.reload_rec_list = false;

Scene_Recollection.prototype.createCommandWindow = function () {

    // 回想モード選択ウィンドウ
    this._rec_window = new Window_RecollectionCommand();
    this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
    this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
    this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));
    this._rec_window.setHandler('cancel', this.commandBackTitle.bind(this));

    this.addWindow(this._rec_window);

    // 回想リスト
    this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);

    // リロードの場合：回想リストを表示にする。通常はここがfalse
    if (Scene_Recollection.reload_rec_list) {
        this._rec_window.deactivate();
        this._rec_window.visible = false;
        this._rec_list.visible = true;
        this._rec_list.activate();
    } else {
        this._rec_window.activate();
        this._rec_window.visible = true;
        this._rec_list.visible = false;
        this._rec_list.deactivate();
    }
    this._rec_list.setHandler('ok', this.commandDoRecMode.bind(this));
    this._rec_list.setHandler('cancel', this.commandBackSelectMode.bind(this));
    this._mode = "recollection";
    this._rec_list.select(Scene_Recollection.rec_list_index);

    this.addWindow(this._rec_list);

    // CG参照用ダミーコマンド
    this._dummy_window = new Window_Command(0, 0);
    this._dummy_window.isCurrentItemEnabled = function () {
        return true;
    }
    this._dummy_window.deactivate();
    this._dummy_window.visible = false;
    this._dummy_window.setHandler('ok', this.commandDummyOk.bind(this));
    this._dummy_window.setHandler('cancel', this.commandDummyCancel.bind(this));
    this._dummy_window.addCommand('next', 'ok');
    this.addWindow(this._dummy_window);
    Scene_Recollection.reload_rec_list = false;

    this._dummy_window.isTouchedInsideFrame = function () {
        return true;
    };
    this._dummy_window.onTouch = function (triggered) {
        if (triggered) {
            this.processOk();
        }
    };
};

function Window_RecCommand() {
    this.initialize.apply(this, arguments);
}

Window_RecCommand.prototype = Object.create(Window_Command.prototype);
Window_RecCommand.prototype.constructor = Window_RecCommand;
Window_RecCommand.prototype.initialize = function () {
    Window_Command.prototype.initialize.call(this, 0, 0);
};
Window_RecCommand.prototype.playOkSound = function () {

};
Window_RecCommand.prototype.processCancel = function () {
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};
//-------------------------------------------------------------------------
// ● 開始処理
//-------------------------------------------------------------------------
Scene_Recollection.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    this._rec_window.refresh();
    this._rec_list.refresh();
    AudioManager.playBgm(rngd_recollection_mode_settings.rec_mode_bgm.bgm);
    Scene_Recollection._rngd_recollection_doing = false;
};

//-------------------------------------------------------------------------
// ● 更新処理
//-------------------------------------------------------------------------
Scene_Recollection.prototype.update = function () {
    Scene_Base.prototype.update.call(this);

};

//-------------------------------------------------------------------------
// ● 「回想を見る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandShowRecollection = function () {
    // モードウィンドウの無効化とリストウィンドウの有効化
    this._mode = "recollection";
    this._rec_list._mode = this._mode;
    this.do_exchange_status_window(this._rec_window, this._rec_list);
};

//-------------------------------------------------------------------------
// ● 「CGを見る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandShowCg = function () {
    this._mode = "cg";
    this._rec_list._mode = this._mode;
    this.do_exchange_status_window(this._rec_window, this._rec_list);
    Scene_Recollection.reload_rec_list = false;
};

//-------------------------------------------------------------------------
// ● 「タイトルに戻る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandBackTitle = function () {
    Scene_Recollection.rec_list_index = 0;
    SceneManager.goto(Scene_Title);
};

//-------------------------------------------------------------------------
// ● 回想orCGモードから「キャンセル」して前の画面に戻った場合のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandBackSelectMode = function () {
    this.do_exchange_status_window(this._rec_list, this._rec_window);
};

//-------------------------------------------------------------------------
// ● 回想orCGモードにおいて、実際の回想orCGを選択した場合のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandDoRecMode = function () {
    var target_index = this._rec_list.index();
    Scene_Recollection.rec_list_index = target_index;
    $gameTemp.ignoreFiles = {};
    $gameTemp.eroBack = null;

    if (this._rec_list.is_valid_picture(this._rec_list.index())) {
        // 回想モードの場合
        if (this._mode == "recollection") {
            Scene_Recollection._rngd_recollection_doing = true;

            DataManager.setupNewGame();
            $gamePlayer.setTransparent(255);
            this.fadeOutAll();
            // TODO: パーティを透明状態にする

            //$dataSystem.optTransparent = false;
            $gameTemp.reserveCommonEvent(rngd_recollection_mode_settings.rec_cg_set[target_index]["common_event_id"]);
            $gamePlayer.reserveTransfer(rngd_recollection_mode_settings.sandbox_map_id, 0, 0, 0);
            $gameSwitches.setValue(999, true);
            SceneManager.push(Scene_Map);

            // CGモードの場合
        } else if (this._mode == "cg") {
            Scene_Recollection._rngd_recollection_doing = false;
            this._cg_sprites = [];
            this._cg_sprites_index = 0;
            var obj = rngd_recollection_mode_settings.rec_cg_set[target_index];
            $gameTemp.addIgnoreFiles(obj.ignore);
            // シーン画像をロードする
            var n = 15;
            var file = obj.thumbnail.substr(0, 5);
            var self = this;
            var texture = PIXI.utils.TextureCache[file + '_01_01.png'];
            if (texture) {
                onComp();
            } else {
                var file2 = 'img/ero/ero' + file + '.json';
                if (obj.file) {
                    file2 = 'img/ero/ero' + obj.file + '.json';
                }
                ImageManager.loadSpriteSheet(file2, onComp);
                if (obj.file2) {
                    ImageManager.loadSpriteSheet('img/ero/ero' + obj.file2 + '.json');
                }
            }
            if (obj.back) {
                $gameTemp.eroBack = obj.back;
            }

            function getFileName(id) {
                if (id == 'se') {
                    return 'se';
                }
                if (id < 10) {
                    return file + '_0' + id;
                } else {
                    return file + '_' + id;
                }
            }
            function onComp() {
                obj.pictures.forEach(function (name) {
                    var sp = new Sprite_Picture(n);

                    if (typeof name == 'string') {
                        var picFile = file + '_' + name;
                        $gameScreen.showPicture(n, Saba.SimpleScenario.webpPrefix + picFile, 0, 0, 0, 100, 100, 255, 0);
                    } else if (typeof name == 'number') {
                        $gameScreen.showPicture(n, Saba.SimpleScenario.webpPrefix + getFileName(name), 0, 0, 0, 100, 100, 255, 0);
                    } else {
                        var json = JSON.parse(JSON.stringify(name));
                        var names = json.pic;
                        var nameList = [];
                        for (var i = 0; i < names.length; i++) {
                            nameList.push(getFileName(names[i]));
                        }
                        if (json.reverse) {
                            for (var i = names.length - 1; i >= 0; i--) {
                                nameList.push(getFileName(names[i]));
                            }
                        }
                        json.pic = nameList;
                        if (json.seIndex == undefined) {
                            json.seIndex = -1;
                        }
                        p(JSON.stringify(json));
                        var picFile = JSON.stringify(json);
                        $gameScreen.showPicture(n, Saba.SimpleScenario.webpPrefix + picFile, 0, 0, 0, 100, 100, 255, 0);
                    }

                    //var pic = $gameScreen.picture(n);
                    //sp.bitmap = ImageManager.loadSabaJpeg(name);
                    // 最初のSprite以外は見えないようにする
                    if (self._cg_sprites.length > 0) {
                        sp.invisible = true;
                    }

                    // TODO: 画面サイズにあわせて、拡大・縮小すべき
                    self._cg_sprites.push(sp);
                    self.addChild(sp);
                    n++;
                }, self);
            }

            this.do_exchange_status_window(this._rec_list, this._dummy_window);
            this._dummy_window.visible = false;
            this._dummy_window.activate()
        }
    } else {
        this._rec_list.activate();
    }
    this._rec_list.refresh();
};

Scene_Recollection.prototype.commandDummyOk = function () {
    if (this._cg_sprites_index < this._cg_sprites.length - 1) {
        this._cg_sprites[this._cg_sprites_index].invisible = true;
        this._cg_sprites_index++;
        this._cg_sprites[this._cg_sprites_index].invisible = false;
        this._dummy_window.activate();
        SoundManager.playOk();
    } else {
        if (this._cg_sprites.length == 0) {
            this._dummy_window.activate();
            return;
        }
        SoundManager.playOk();
        this.clearCg();
        this.do_exchange_status_window(this._dummy_window, this._rec_list);
    }
};
Scene_Recollection.prototype.clearCg = function () {
    $gameScreen.clearPictures();
    for (var i = 0; i < this._cg_sprites.length; i++) {
        var sp = this._cg_sprites[i];
        sp.invisible = true;
        this.removeChild(sp);
    }
    this._cg_sprites = [];
};
Scene_Recollection.prototype.commandDummyCancel = function () {
    if (this._cg_sprites_index == 0) {
        SoundManager.playCancel();
        this.clearCg();
        this.do_exchange_status_window(this._dummy_window, this._rec_list);
    } else {
        this._cg_sprites[this._cg_sprites_index].invisible = true;
        this._cg_sprites_index--;
        this._cg_sprites[this._cg_sprites_index].invisible = false;
        this._dummy_window.activate();
        SoundManager.playOk();
    }
};

// コモンイベントから呼び出す関数
Scene_Recollection.prototype.rngd_exit_scene = function () {
    if (Scene_Recollection._rngd_recollection_doing) {
        // Window_RecListを表示する
        Scene_Recollection.reload_rec_list = true;
        SceneManager.push(Scene_Recollection);
    }
};

//-------------------------------------------------------------------------
// ● ウィンドウの無効化と有効化
//-------------------------------------------------------------------------
// win1: 無効化するウィンドウ
// win2: 有効化するウィンドウ
//-------------------------------------------------------------------------
Scene_Recollection.prototype.do_exchange_status_window = function (win1, win2) {
    win1.deactivate();
    win1.visible = false;
    win2.activate();
    win2.refresh();
    win2.visible = true;
};

//-----------------------------------------------------------------------------
// ◆ Window関数
//-----------------------------------------------------------------------------

//=========================================================================
// ■ Window_RecollectionCommand
//=========================================================================
// 回想モードかCGモードを選択するウィンドウです
//=========================================================================
function Window_RecollectionCommand() {
    this.initialize.apply(this, arguments);
}

Window_RecollectionCommand.prototype = Object.create(Window_Command.prototype);
Window_RecollectionCommand.prototype.constructor = Window_RecollectionCommand;

Window_RecollectionCommand.prototype.initialize = function () {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.x = rngd_recollection_mode_settings.rec_mode_window.x;
    this.y = rngd_recollection_mode_settings.rec_mode_window.y;

};

Window_RecollectionCommand.prototype.makeCommandList = function () {
    Window_Command.prototype.makeCommandList.call(this);
    this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_recollection, "select_recollection");
    this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_cg, "select_cg");
    this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_back_title, "select_back_title");
};

//=========================================================================
// ■ Window_RecollectionList
//=========================================================================
// 回想またはCGを選択するウィンドウです
//=========================================================================
function Window_RecList() {
    this.initialize.apply(this, arguments);
}

Window_RecList.prototype = Object.create(Window_Selectable.prototype);
Window_RecList.prototype.constructor = Window_RecList;

//-------------------------------------------------------------------------
// ● 初期化処理
//-------------------------------------------------------------------------
Window_RecList.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.windowWidth = width;
    this.windowHeight = height;
    this.select(0);
    this._formationMode = false;
    this.get_global_variables();
    var infos = rngd_recollection_mode_settings.rec_cg_set;
    for (var i = 0; i < infos.length; i++) {
        var info = infos[i];
        if (this._global_variables["switches"][info.switch_id]) {
            var bmpName = info.thumbnail;
            var bmp = ImageManager.loadEro(bmpName);
        }
    }
    this.refresh();

};
Window_RecList.prototype.standardPadding = function () {
    return 4;
};
Window_RecList.prototype.refresh = function () {
    this._windowContentsSprite.removeChildren();
    Window_Selectable.prototype.refresh.call(this);
};

Window_RecList.prototype.maxItems = function () {
    var n = rngd_recollection_mode_settings.rec_cg_set.length;
    if (this._mode == "cg") {
        return n - 6;
    } else {
        return n;
    }
};

Window_RecList.prototype.itemHeight = function () {
    return (this.height - this.standardPadding() * 2) / rngd_recollection_mode_settings.rec_list_window.item_height;
};

//Window_RecList.prototype.maxRows = function() {
//    return rngd_recollection_mode_settings.rec_list_window.item_height;
//};

Window_RecList.prototype.maxCols = function () {
    return rngd_recollection_mode_settings.rec_list_window.item_width;
};

Window_RecList.prototype.maxPageRows = function () {
    var pageHeight = this.height;// - this.padding * 2;
    return Math.floor(pageHeight / this.itemHeight());
};

Window_RecList.prototype.drawItem = function (index) {
    // TODO: itemWidthにあわせたサイズに拡大・縮小する
    // 1番目のCGセットを取得
    var rec_cg = rngd_recollection_mode_settings.rec_cg_set[index];
    var rect = this.itemRect(index);
    var text_height = 0;
    //SHOW_ALL = $gameTemp.isPlaytest();
    if (rngd_recollection_mode_settings.rec_list_window.show_title_text) {
        this.contents.fontSize = 20;
        if (this._global_variables["switches"][rec_cg.switch_id] || SHOW_ALL) {
            this.contents.drawText(rec_cg.title, rect.x + 4, rect.y + this.itemHeight() - 26, this.itemWidth(), 32,
                rngd_recollection_mode_settings.rec_list_window.title_text_align);
        } else {
            this.contents.drawText(rngd_recollection_mode_settings.rec_list_window.never_watch_title_text,
                rect.x + 4, rect.y + 4, this.itemWidth(), 32,
                rngd_recollection_mode_settings.rec_list_window.title_text_align);
        }
        text_height = 32;
    }

    // CGセットのスイッチ番号が、全てのセーブデータを走査した後にTrueであればピクチャ表示
    if (this._global_variables["switches"][rec_cg.switch_id] || SHOW_ALL) {

        var thumbnail_file_name = rec_cg.pictures[0];
        if (rec_cg.thumbnail !== undefined && rec_cg.thumbnail !== null) {
            thumbnail_file_name = rec_cg.thumbnail;
        }


        this.drawRecollection(thumbnail_file_name, 0, 0,
            216, 162, rect.x - 0, rect.y - 5 + text_height, rec_cg.paso);


    } else {
        this.drawRecollection(rngd_recollection_mode_settings.rec_list_window.never_watch_picture_name,
            0, 0,
            this.itemWidth() - 66, this.itemHeight() - 28 - text_height, rect.x + 16, rect.y + 4 + text_height);

    }

};

//-------------------------------------------------------------------------
// ● 全てのセーブデータを走査し、対象のシーンスイッチ情報を取得する
//-------------------------------------------------------------------------
Window_RecList.prototype.get_global_variables = function () {
    this._global_variables = {
        "switches": {}
    };
    var info = DataManager.loadGlobalInfo();
    info[99] = info[99] || {};
    var rec_cg_max = rngd_recollection_mode_settings.rec_cg_set.length;
    for (var j = 0; j < rec_cg_max; j++) {
        var cg = rngd_recollection_mode_settings.rec_cg_set[j];
        if (info[99][cg.switch_id]) {
            this._global_variables["switches"][cg.switch_id] = true;
        }
    }
};
//-------------------------------------------------------------------------
// ● index番目に表示された回想orCGが有効かどうか判断する
//-------------------------------------------------------------------------
Window_RecList.prototype.is_valid_picture = function (index) {
    // CG情報の取得と対象スイッチの取得
    var _rec_cg_obj = rngd_recollection_mode_settings.rec_cg_set[index];
    return (this._global_variables["switches"][_rec_cg_obj.switch_id] == true) || SHOW_ALL;

};


(function () {

    //-----------------------------------------------------------------------------
    // ◆ 組み込み関数Fix
    //-----------------------------------------------------------------------------
    /*
        Window_Base.prototype.drawRecollection = function(bmp_name, x, y, width, height, dx, dy) {
            var bmp = ImageManager.loadPicture(bmp_name);
    
            var _width = width;
            var _height = height;
            if(_width > bmp.width) {
                _width = bmp.width - 1;
            }
    
            if(_height > bmp.height) {
                _height = bmp.height - 1;
            }
            this.contents.blt(bmp, x, y, _width, _height, dx, dy);
        };
    */
    var Window_TitleCommand_makeCommandList =
        Window_TitleCommand.prototype.makeCommandList;

    Window_TitleCommand.prototype.makeCommandList = function () {
        Window_TitleCommand_makeCommandList.call(this);
        this.clearCommandList();
        this.addCommand(TextManager.newGame, 'newGame');
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.recollection_title, 'recollection');
        this.addCommand(TextManager.options, 'options');
        this.addCommand(TextManager.gameEnd, 'gameEnd');
    };

    Scene_Title.prototype.commandRecollection = function () {
        SceneManager.push(Scene_Recollection);
    };

    var Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function () {
        Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('recollection', this.commandRecollection.bind(this));
        this._commandWindow.setHandler('gameEnd', this.popScene.bind(this));
    };

    Window_Base.prototype.drawRecollection = function (bmp_name, x, y, width, height, dx, dy, paso) {
        var _width = width;
        var _height = height;
        var bitmap = ImageManager.loadEro(bmp_name);
        if (!bitmap.isReady()) {
            return;
        }
        var baseTexture = bitmap._baseTexture;
        /*new PIXI.BaseTexture(bitmap._image, PIXI.SCALE_MODES.DEFAULT);
        baseTexture.imageUrl = 'jpg/' + bmp_name;
        PIXI.utils.BaseTextureCache['jpg/' + bmp_name] = baseTexture;*/

        if (_width > baseTexture.width) {
            _width = baseTexture.width - 1;
        }

        if (_height > baseTexture.height) {
            _height = baseTexture.height - 1;
        }
        var texture = new PIXI.Texture(baseTexture);
        // texture.frame = new PIXI.Rectangle(sx, sy, pw, ph);
        var sprite = new PIXI.Sprite(texture);
        sprite.position.x = dx + 20 - 5;
        sprite.position.y = dy - 12 - 10;
        sprite.width = width;
        sprite.height = height;
        this._windowContentsSprite.addChild(sprite);

        // this.contents.blt(bmp, x, y, bmp.width, bmp.height, dx+20, dy - 22, width, height);
    };

    Game_Interpreter.prototype.reco = function (switch_id) {
        p('回想登録:' + switch_id);
        var info = DataManager.loadGlobalInfo();
        info[99] = info[99] || {};
        if (info[99][switch_id]) {
            return;
        }
        info[99][switch_id] = true;
        DataManager.saveGlobalInfo(info);
    }



})();

function recoGlobal(switch_id) {
    var info = DataManager.loadGlobalInfo();
    info[99] = info[99] || {};
    if (info[99][switch_id]) {
        return;
    }
    info[99][switch_id] = true;
    DataManager.saveGlobalInfo(info);
}
function hasFreeHFlah() {
    var info = DataManager.loadGlobalInfo();
    info[99] = info[99] || {};
    return info[99][998];
}

DataManager.selectSavefileForNewGame = function () {
    var globalInfo = this.loadGlobalInfo();
    this._lastAccessedId = 1;
    if (globalInfo) {
        var numSavefiles = 0;
        for (var i = 1; i <= globalInfo.length; i++) {
            if (i > 20) {
                break;
            }
            if (globalInfo[i]) {
                numSavefiles = i;
            }
        }
        if (numSavefiles < this.maxSavefiles()) {
            this._lastAccessedId = numSavefiles + 1;
        } else {
            var timestamp = Number.MAX_VALUE;
            for (var i = 1; i < globalInfo.length; i++) {
                if (!globalInfo[i]) {
                    this._lastAccessedId = i;
                    break;
                }
                if (i > 20) {
                    break;
                }
                if (globalInfo[i].timestamp < timestamp) {
                    timestamp = globalInfo[i].timestamp;
                    this._lastAccessedId = i;
                }
            }
        }
    }
};