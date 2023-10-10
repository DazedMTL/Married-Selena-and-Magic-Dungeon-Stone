var synthData = [
    ['w', 31, 'I51:2'],
    ['w', 32, 'I52:2,I51:1'],
    ['w', 33, 'I53:2,I82:2,I91:3'],
    ['w', 34, 'I94:2,I53:3,I61:3'],
    ['w', 35, 'I55:3,I53:4,I51:5'],
    ['w', 36, 'I66:5,I55:5,I73:5'],
    ['w', 37, 'I57:5,I75:4,I95:5,I85:5'],
    ['w', 38, 'I58:4,I87:4,I47:7,I96:7'],
    ['w', 41, 'I71:1,I81:2'],
    ['w', 42, 'I82:2,I101:3,I71:3'],
    ['w', 43, 'I93:2,I82:3,I61:3'],
    ['w', 44, 'I84:4,I73:3,I91:4'],
    ['w', 45, 'I85:5,I93:4,I53:4'],
    ['w', 46, 'I86:4,I94:5,I44:5'],
    ['w', 47, 'I87:4,I76:5,I64:5,I51:5'],
    ['w', 48, 'I58:4,I87:5,I86:4,I46:6'],
    ['w', 61, 'I51:3,I41:2'],
    ['w', 62, 'I102:2,I61:2'],
    ['w', 63, 'I53:3,I42:2'],
    ['w', 64, 'I44:3,I53:3,I41:4'],
    ['w', 65, 'I55:3,I63:4,I42:2'],
    ['w', 66, 'I46:3,I64:4,I44:5'],
    ['w', 67, 'I57:3,I66:5,I73:4,I91:4'],
    ['w', 68, 'I48:3,I44:5,I42:4,I41:3'],
    ['w', 71, 'I71:2,I101:3,I91:1'],
    ['w', 72, 'I82:2,I71:2'],
    ['w', 73, 'I73:2,I93:2,I63:1'],
    ['w', 74, 'I64:2,I73:3,I91:3'],
    ['w', 75, 'I95:3,I44:4,I73:3'],
    ['w', 76, 'I46:3,I64:4,I73:3'],
    ['w', 77, 'I47:3,I94:5,I44:2'],
    ['w', 78, 'I58:2,I87:2,I84:3'],
    ['w', 1, 'I41:2,I102:1'],
    ['w', 2, 'I42:2,I71:2'],
    ['w', 3, 'I53:2,I42:2,I41:4'],
    ['w', 4, 'I44:2,I63:4,I51:3'],
    ['w', 5, 'I55:2,I44:3,I42:5'],
    ['w', 6, 'I46:3,I55:4,I71:5'],
    ['w', 7, 'I47:3,I44:4,I42:6'],
    ['w', 8, 'I48:3,I47:2,I75:7'],
    ['w', 11, 'I42:1'],
    ['w', 12, 'I42:2,I52:2'],
    ['w', 13, 'I53:2,I42:3,I41:1'],
    ['w', 14, 'I64:2,I42:2,I42:3'],
    ['w', 15, 'I55:2,I44:3,I41:4'],
    ['w', 16, 'I46:2,I53:4,I42:5'],
    ['w', 17, 'I47:3,I55:5,I73:5'],
    ['w', 18, 'I78:3,I46:5,I85:5'],
    ['w', 121, 'I41:1,I102:1'],
    ['w', 122, 'I42:2,I102:1'],
    ['w', 123, 'I53:2,I42:3,I41:2'],
    ['w', 124, 'I44:2,I103:2,I71:2'],
    ['w', 125, 'I75:2,I44:3,I71:4'],
    ['w', 126, 'I46:3,I55:4,I71:4'],
    ['w', 127, 'I47:2,I46:2,I42:4'],
    ['w', 128, 'I48:3,I47:2,I55:7'],
    ['w', 131, 'I42:1'],
    ['w', 132, 'I42:2,I52:2'],
    ['w', 133, 'I53:2,I42:3,I41:2'],
    ['w', 134, 'I64:2,I42:3,I41:2'],
    ['w', 135, 'I75:2,I44:3,I41:2'],
    ['w', 136, 'I46:2,I53:4,I42:3'],
    ['w', 137, 'I47:3,I55:5,I42:5'],
    ['w', 138, 'I48:3,I46:2,I85:5'],
    ['a', 1, 'I81:2'],
    ['a', 2, 'I82:3'],
    ['a', 3, 'I93:3,I91:2'],
    ['a', 4, 'I84:3,I82:2'],
    ['a', 5, 'I85:3,I93:2'],
    ['a', 6, 'I86:2,I94:2'],
    ['a', 7, 'I87:2,I96:2'],
    ['a', 8, 'I58:2,I87:2'],
    ['a', 11, 'I81:2'],
    ['a', 12, 'I82:2'],
    ['a', 13, 'I93:2,I91:1'],
    ['a', 14, 'I84:2,I82:1'],
    ['a', 15, 'I95:2,I91:3'],
    ['a', 16, 'I96:2,I84:3'],
    ['a', 17, 'I87:2,I75:2'],
    ['a', 18, 'I48:2,I87:2'],
    ['a', 21, 'I41:2'],
    ['a', 22, 'I42:2'],
    ['a', 23, 'I73:2,I42:1'],
    ['a', 24, 'I44:4,I42:1'],
    ['a', 25, 'I55:2,I44:2'],
    ['a', 26, 'I46:1,I52:3'],
    ['a', 27, 'I47:2,I76:1'],
    ['a', 28, 'I48:3,I76:1'],
    ['a', 31, 'I61:2'],
    ['a', 32, 'I42:2'],
    ['a', 33, 'I63:1,I61:1'],
    ['a', 34, 'I64:2,I73:2'],
    ['a', 35, 'I55:2,I64:2'],
    ['a', 36, 'I76:2,I44:2'],
    ['a', 37, 'I67:2,I55:2'],
    ['a', 38, 'I58:3,I46:2'],
    ['a', 51, 'I81:3'],
    ['a', 52, 'I82:2,I81:1'],
    ['a', 53, 'I93:2,I82:2'],
    ['a', 54, 'I84:2,I103:3'],
    ['a', 55, 'I85:2,I93:3'],
    ['a', 56, 'I96:2,I44:3'],
    ['a', 57, 'I75:5,I86:3'],
    ['a', 58, 'I58:3,I46:2'],
    ['a', 61, 'I81:2'],
    ['a', 62, 'I103:2'],
    ['a', 63, 'I93:2,I81:1'],
    ['a', 64, 'I84:2,I91:2'],
    ['a', 65, 'I95:2,I91:4'],
    ['a', 66, 'I86:2,I91:4'],
    ['a', 67, 'I67:3,I55:2'],
    ['a', 68, 'I48:3,I86:2'],
    ['a', 71, 'I81:1'],
    ['a', 72, 'I82:1,I81:1'],
    ['a', 73, 'I73:2,I103:1'],
    ['a', 74, 'I84:2,I91:5'],
    ['a', 75, 'I85:2,I73:2'],
    ['a', 76, 'I86:2,I75:3'],
    ['a', 77, 'I87:3,I76:3'],
    ['a', 78, 'I58:3,I86:3'],
    ['a', 81, 'I61:3'],
    ['a', 82, 'I42:2'],
    ['a', 83, 'I93:1,I82:2'],
    ['a', 84, 'I64:2,I93:2'],
    ['a', 85, 'I55:2,I63:2'],
    ['a', 86, 'I76:2,I64:2'],
    ['a', 87, 'I55:2,I63:2'],
    ['a', 88, 'I48:3,I87:1'],
    ['a', 101, 'I103:1'],
    ['a', 102, 'I103:2'],
    ['a', 103, 'I42:3,I41:2'],
    ['a', 104, 'I44:2,I42:2'],
    ['a', 105, 'I55:2,I44:2'],
    ['a', 106, 'I46:2,I44:3'],
    ['a', 107, 'I67:2,I46:2'],
    ['a', 108, 'I48:2,I46:5'],
    ['a', 111, 'I51:2'],
    ['a', 112, 'I103:2,I51:2'],
    ['a', 113, 'I63:4,I51:4'],
    ['a', 114, 'I44:3,I52:1'],
    ['a', 115, 'I55:3,I44:2'],
    ['a', 116, 'I66:3,I42:3'],
    ['a', 117, 'I47:2,I76:2'],
    ['a', 118, 'I48:2,I67:3'],
    ['a', 121, 'I81:2'],
    ['a', 122, 'I82:3'],
    ['a', 123, 'I93:3,I81:3'],
    ['a', 124, 'I103:2,I93:3'],
    ['a', 125, 'I85:2,I93:4'],
    ['a', 126, 'I85:3,I73:3'],
    ['a', 127, 'I87:3,I75:1'],
    ['a', 128, 'I78:3,I86:2'],
    ['a', 131, 'I104:2'],
    ['a', 132, 'I104:3,I61:2'],
    ['a', 133, 'I63:3,I73:2'],
    ['a', 134, 'I64:2,I73:2'],
    ['a', 135, 'I75:2,I64:2'],
    ['a', 136, 'I96:2,I75:4'],
    ['a', 137, 'I67:3,I44:2'],
    ['a', 138, 'I78:3,I64:2'],
];
