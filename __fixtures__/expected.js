const expectedStylish = '{\n'
    + '    common: {\n'
    + '      + follow: false\n'
    + '        setting1: Value 1\n'
    + '      - setting2: 200\n'
    + '      - setting3: true\n'
    + '      + setting3: null\n'
    + '      + setting4: blah blah\n'
    + '      + setting5: {\n'
    + '            key5: value5\n'
    + '        }\n'
    + '        setting6: {\n'
    + '            doge: {\n'
    + '              - wow: \n'
    + '              + wow: so much\n'
    + '            }\n'
    + '            key: value\n'
    + '          + ops: vops\n'
    + '        }\n'
    + '    }\n'
    + '    group1: {\n'
    + '      - baz: bas\n'
    + '      + baz: bars\n'
    + '        foo: bar\n'
    + '      - nest: {\n'
    + '            key: value\n'
    + '        }\n'
    + '      + nest: str\n'
    + '    }\n'
    + '  - group2: {\n'
    + '        abc: 12345\n'
    + '        deep: {\n'
    + '            id: 45\n'
    + '        }\n'
    + '    }\n'
    + '  + group3: {\n'
    + '        deep: {\n'
    + '            id: {\n'
    + '                number: 45\n'
    + '            }\n'
    + '        }\n'
    + '        fee: 100500\n'
    + '    }\n'
    + '}';

const expectedPlain = 'Property \'common.follow\' was added with value: false\n'
    + 'Property \'common.setting2\' was removed\n'
    + 'Property \'common.setting3\' was updated. From true to null\n'
    + 'Property \'common.setting4\' was added with value: \'blah blah\'\n'
    + 'Property \'common.setting5\' was added with value: [complex value]\n'
    + 'Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'\n'
    + 'Property \'common.setting6.ops\' was added with value: \'vops\'\n'
    + 'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n'
    + 'Property \'group1.nest\' was updated. From [complex value] to \'str\'\n'
    + 'Property \'group2\' was removed\n'
    + 'Property \'group3\' was added with value: [complex value]';

const expectedJSON = '[\n' +
    '    {\n' +
    '        "name": "common",\n' +
    '        "children": [\n' +
    '            {\n' +
    '                "name": "follow",\n' +
    '                "value": false,\n' +
    '                "type": "plus"\n' +
    '            },\n' +
    '            {\n' +
    '                "name": "setting1",\n' +
    '                "value": "Value 1",\n' +
    '                "type": "unchanged"\n' +
    '            },\n' +
    '            {\n' +
    '                "name": "setting2",\n' +
    '                "value": 200,\n' +
    '                "type": "minus"\n' +
    '            },\n' +
    '            {\n' +
    '                "name": "setting3",\n' +
    '                "firstValue": true,\n' +
    '                "secondValue": null,\n' +
    '                "type": "changed"\n' +
    '            },\n' +
    '            {\n' +
    '                "name": "setting4",\n' +
    '                "value": "blah blah",\n' +
    '                "type": "plus"\n' +
    '            },\n' +
    '            {\n' +
    '                "name": "setting5",\n' +
    '                "value": {\n' +
    '                    "key5": "value5"\n' +
    '                },\n' +
    '                "type": "plus"\n' +
    '            },\n' +
    '            {\n' +
    '                "name": "setting6",\n' +
    '                "children": [\n' +
    '                    {\n' +
    '                        "name": "doge",\n' +
    '                        "children": [\n' +
    '                            {\n' +
    '                                "name": "wow",\n' +
    '                                "firstValue": "",\n' +
    '                                "secondValue": "so much",\n' +
    '                                "type": "changed"\n' +
    '                            }\n' +
    '                        ],\n' +
    '                        "type": "subtree"\n' +
    '                    },\n' +
    '                    {\n' +
    '                        "name": "key",\n' +
    '                        "value": "value",\n' +
    '                        "type": "unchanged"\n' +
    '                    },\n' +
    '                    {\n' +
    '                        "name": "ops",\n' +
    '                        "value": "vops",\n' +
    '                        "type": "plus"\n' +
    '                    }\n' +
    '                ],\n' +
    '                "type": "subtree"\n' +
    '            }\n' +
    '        ],\n' +
    '        "type": "subtree"\n' +
    '    },\n' +
    '    {\n' +
    '        "name": "group1",\n' +
    '        "children": [\n' +
    '            {\n' +
    '                "name": "baz",\n' +
    '                "firstValue": "bas",\n' +
    '                "secondValue": "bars",\n' +
    '                "type": "changed"\n' +
    '            },\n' +
    '            {\n' +
    '                "name": "foo",\n' +
    '                "value": "bar",\n' +
    '                "type": "unchanged"\n' +
    '            },\n' +
    '            {\n' +
    '                "name": "nest",\n' +
    '                "firstValue": {\n' +
    '                    "key": "value"\n' +
    '                },\n' +
    '                "secondValue": "str",\n' +
    '                "type": "changed"\n' +
    '            }\n' +
    '        ],\n' +
    '        "type": "subtree"\n' +
    '    },\n' +
    '    {\n' +
    '        "name": "group2",\n' +
    '        "value": {\n' +
    '            "abc": 12345,\n' +
    '            "deep": {\n' +
    '                "id": 45\n' +
    '            }\n' +
    '        },\n' +
    '        "type": "minus"\n' +
    '    },\n' +
    '    {\n' +
    '        "name": "group3",\n' +
    '        "value": {\n' +
    '            "deep": {\n' +
    '                "id": {\n' +
    '                    "number": 45\n' +
    '                }\n' +
    '            },\n' +
    '            "fee": 100500\n' +
    '        },\n' +
    '        "type": "plus"\n' +
    '    }\n' +
    ']'
export { expectedStylish, expectedPlain, expectedJSON };
