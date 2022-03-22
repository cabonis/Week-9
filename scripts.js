let data=[
    {"parentColumn": "",  "childColumn":"A"},
    {"parentColumn": "A", "childColumn":"B"},
    {"parentColumn": "A", "childColumn":"C"},
    {"parentColumn": "B", "childColumn":"D","val":30},
    {"parentColumn": "B", "childColumn":"E","val":50},
    {"parentColumn": "C", "childColumn":"F","val":20},
    {"parentColumn": "C", "childColumn":"G","val":40},
    {"parentColumn": "C", "childColumn":"H","val":60}
];

let root = null;
let map = {};

data.forEach((d) => {
    let node = {name:d.childColumn, children:[], value:d.val};
    map[node.name] = node;
    if(!d.parentColumn){
        root = node
    }
    else{
        map[d.parentColumn].children.push(node);
    }
})

function calculatevalues(node){
    if(!node.value){
        node.value = 0
        node.children.forEach((c) => {
            node.value += calculatevalues(c);
        });
    }
    return node.value;
}(root);

let treeData = [root];

let dom = document.getElementById("container");
let treeMap = echarts.init(dom);

    function getLevelOption() {
    return  [{
        itemStyle: {
            borderColor: '#555',
            borderWidth: 0,
            gapWidth: 10
        },
        upperLabel: {
            show: false
        }
    }, {
        itemStyle: {
            borderColor: '#52AB80',
            borderWidth: 15,
            gapWidth: 15
        },
        emphasis: {
            itemStyle: {
                borderColor: '#ccc'
            }
        }
    }, {
        itemStyle: {
            borderColor: '#e8aa63',
            borderWidth: 15,
            gapWidth: 15
        },
        emphasis: {
            itemStyle: {
                borderColor: '#ccc'
            }
        }
    }, {
        itemStyle: {
            borderColor: '#F0F4F3',
            borderWidth: 5,
            gapWidth: 1
        },
        emphasis: {
            itemStyle: {
                borderColor: '#ccc'
            }
        }
    }, {
        colorSaturation: [0.3, 0.55],
        itemStyle: {
            borderWidth: 5,
            gapWidth: 1,
            borderColorSaturation: 0.7
        }
    }];
    }


    treeMap.setOption(
    (option = {
        title: {
        text: 'My Treemap',
        left: 'center'
        },
        series: [
        {
            name: 'My Treemap',
            type: 'treemap',
            label: {
            show: true,
            formatter: '{b}'
            },
            upperLabel: {
            show: true,
            height: 30
            },
            levels: getLevelOption(),
            data: treeData
        }
        ]
    })
    );