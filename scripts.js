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

// One pass over the data to setup parent/child relationships, assumes data is sorted
data.forEach((d) => {
    let node = {name:d.childColumn, children:[], value:d.val};
    map[node.name] = node;
    if(!d.parentColumn){
        root = node
    }
    else{
        map[d.parentColumn].children.push(node);
    }
});

// Recursively calculate all node values
(function calculatevalues(node){
    if(!node.value){
        node.value = 0
        node.children.forEach((c) => {
            node.value += calculatevalues(c);
        });
    }
    return node.value;
})(root);


// Setup eCharts
let dom = document.getElementById("container");
let treeMap = echarts.init(dom);

// Push data to TreeMap
treeMap.setOption({
    title: {
    text: 'My Treemap',
    left: 'center'
    },
    series: [{
        name: 'My Treemap',
        type: 'treemap',
        label: {
            show: true,
            formatter: '{b}: {c}',
            fontSize: 16
        },
        upperLabel: {
            show: true,
            height: 40,
            formatter: '{b}: {c}',
            fontSize: 16
        },
        levels: [{
            itemStyle: {
                borderWidth: 0
            },
            upperLabel: {
                show: false
            }
        }, {
            itemStyle: {
                borderColor: 'green',
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
                borderColor: 'red',
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
                color: "blue",
                borderWidth: 0
            },
            emphasis: {
                itemStyle: {
                    color: '#ccc'
                }
            }
        }],
        data: [root]
    }]
});