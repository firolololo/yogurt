/**
 * 用邻接表实现有向图的操作
 * author:firo
 * date:2016-11-07
 */

//添加一个id 作为测试和唯一标志
 let _$ID = 1;

class Node{
    constructor(id){
        this.id = id;
    }
}

class Edge{
    constructor(from,to,value){
        if(from.constructor === Node.prototype.constructor
        && to.constructor === Node.prototype.constructor){
            this.from = from;
            this.to = to;
            this.value = value;
        }
    }
}

class Graph{
    //graphInfo为私有属性
    constructor(nodes = [] , edges = [] ,graphInfo = {}){
        graphInfo.adjacencyList = [];
        //暴露closure让外部调用interface来获取图的信息
        this._initData(nodes,edges,graphInfo.adjacencyList);
        this.getAdjacencyList = function() {return graphInfo.adjacencyList;};
        this.getDfsList = function(){this._dfs(graphInfo); return graphInfo.dfsList;};
        this.getBfsList = function(){this._bfs(graphInfo); return graphInfo.bfsList;};
        this.hasCircle = function(){return this._hasCircle(graphInfo);};
        this.addNode = function(){this._addNode(graphInfo)};
        this.addEdge = function(edge){this._addEdge(edge,graphInfo)};
        this.getShortCut = function(id){return this._dijkstra(graphInfo,id);};
    }


    //将传入的数组组合成Node和Edge类型
    _initData(nodes,edges,adjacencyList){
        let graphNodes = [];
        let graphEdges = [];
        [...nodes].forEach((item) => {
            let node = new Node(_$ID++);
            graphNodes.push(node);
        });

        [...edges].forEach((item) => {
            const [from , to , value] = item;
            let fromNode = graphNodes.find((node) => node.id === from);
            let toNode = graphNodes.find((node) =>  node.id === to);
            if(!!fromNode && !!toNode){
                graphEdges.push(new Edge(fromNode,toNode,value));
            }else{
                throw new Error('please make sure that all the edges you transmit is up to standard!');
            }

        });

        this._initGraph(graphNodes,graphEdges,adjacencyList);

    }
    //初始化有向图并且生成邻接表
    _initGraph(nodes,edges,adjacencyList){
        nodes.forEach((node) => {
            let adjacencyListItem = {};
            adjacencyListItem.value = node;
            adjacencyListItem.edgeReserve = [];
            adjacencyList.push(adjacencyListItem);
        });

        edges.forEach((edge) => {
            const {from,to} = edge;
            let item = adjacencyList.find((item) => item.value.id === from.id);
            if(!!item){
                item.edgeReserve.push(edge);
            }
        });
    }

    //添加新的节点
    _addNode(graphInfo){
        let node = new Node(_$ID++);
        let adjacencyListItem = {};
        adjacencyListItem.value = node;
        adjacencyListItem.edgeReserve = [];
        graphInfo.adjacencyList.push(adjacencyListItem);
    }

    //添加新的边
    _addEdge(edge,graphInfo){
        const [from , to , value] = edge;
        let fromNode = graphInfo.adjacencyList.find((object) => object.value.id === from).value;
        let toNode = graphInfo.adjacencyList.find((object) =>  object.value.id === to).value;
        if(!!fromNode && !!toNode){
            let adjacencyListItem = graphInfo.adjacencyList.find((item) => item.value.id === fromNode.id);
            adjacencyListItem.edgeReserve.push(new Edge(fromNode,toNode,value));
        }else{
            throw new Error('please make sure that the edge you transmit is up to standard!');
        }
    }
    //图中是否存在环
    _hasCircle(graphInfo){
        let _copy = graphInfo.adjacencyList.concat();
        return !this._topologicalSort(_copy);
    }

    //拓扑排序是否存在
    _topologicalSort(adjacencyList,_inDegreeNotZero = new Set()){
        let nodes = [];
        adjacencyList.forEach(function(item){
            nodes.push(item.value.id);
            if(item.edgeReserve.length > 0){
                item.edgeReserve.forEach((edge) => _inDegreeNotZero.add(edge.to.id));
            }
        })
        let _inDegreeZero =  nodes.filter((item) => ![..._inDegreeNotZero].includes(item));
        _inDegreeZero.forEach(function(item){
            let _index = adjacencyList.findIndex((object) => object.value.id === item);
            if(_index !== -1){
                adjacencyList.splice(_index,1);
            }else{
                throw new Error('something wrong happened in the process of the topo sort to your graph');
            }
        })
        if(adjacencyList.length === 0){
            return true;
        }else if(_inDegreeZero.length === 0){
            return false;
        }else{
            return this._topologicalSort(adjacencyList);
        }
    }

    //bfs
    _bfs(graphInfo){
        let _queue = [];
        graphInfo.bfsList = [];
        let _copy = graphInfo.adjacencyList.concat();

        while(_copy.length !== 0){
            let item;
            if(_queue.length === 0){
                item = _copy.shift();
                if(!!item){
                    _queue.push(item);
                    graphInfo.bfsList.push(item.value.id);
                }
            }

            let _front = _queue.shift();
            if(_front.edgeReserve.length > 0){
                _front.edgeReserve.forEach(function(item){
                    let _index = _copy.findIndex((node) => item.to.id === node.value.id);
                    if(_index !== -1){
                        item = _copy.splice(_index,1)[0];
                        if(!!item){
                            _queue.push(item);
                            graphInfo.bfsList.push(item.value.id);
                        }
                    }
                })
            }

        }
    }

    //dfs
    _dfs(graphInfo){
        let _stack = [];
        graphInfo.dfsList = [];
        let _copy = graphInfo.adjacencyList.concat();

        while(_copy.length !== 0){
            let item;
            if(_stack.length === 0){
                item = _copy.shift();
                if(!!item){
                    _stack.push(item);
                    graphInfo.dfsList.push(item.value.id);
                }
            }
            let _top = _stack[_stack.length - 1];

            if(_top.edgeReserve.length > 0){
                let _index = _copy.findIndex(function(item){
                    return _top.edgeReserve.length > 0 && item.value.id === _top.edgeReserve[0].to.id;
                });
                if(_index !== -1){
                    item = _copy.splice(_index,1)[0];
                    if(!!item){
                        _stack.push(item);
                        graphInfo.dfsList.push(item.value.id);
                    }
                }
                _top.edgeReserve.shift();
            }else{
                _stack.pop();
            }
        }
    }

    //prim
    _prim(graphInfo){

    }
    //kruskal
    _kruskal(graphInfo){

    }
    //dijkstra
    _dijkstra(graphInfo,id = 1){
        let dijkstra = [];
        let shortCut = [];
        graphInfo.adjacencyList.forEach(function(item){
            shortCut.push([]);
            let dijkstraItem = new Array(graphInfo.adjacencyList.length).fill(0);
            if(item.edgeReserve.length > 0){
                item.edgeReserve.forEach((edge) => dijkstraItem[edge.to.id - 1] = edge.value);
            }
            dijkstra.push(dijkstraItem);
        })
        return this._dijkstraMetrix(dijkstra,shortCut,0,id);
    }

    //构建dijkstra矩阵
    _dijkstraMetrix(metrix,shortCut,increment = 0,id = 1){
        let metrixItem = metrix[id - 1];
        if(increment === 0){
            //初始化矩阵
            metrixItem.forEach(function(distance,index){
                let edgeInfo = {};
                edgeInfo.from = id;
                edgeInfo.to = index + 1;
                edgeInfo.value = distance;
                shortCut[index].push(edgeInfo);
            })
            shortCut[id - 1][shortCut[id - 1].length - 1].dirty = true;
        }else{
            metrixItem.forEach(function(distance,index){
                if(distance > 0){
                    let newValue = distance + increment;
                    let edgeSet = shortCut[index];
                    let edgeInfo = edgeSet[edgeSet.length - 1];
                    const {to,value} = edgeInfo;
                    if(!edgeInfo.dirty){
                        if(value === 0 || newValue < value){
                            let newEdgeInfo = {};
                            newEdgeInfo.from = id;
                            newEdgeInfo.to = to;
                            newEdgeInfo.value = newValue;
                            shortCut[index].push(newEdgeInfo);
                        }
                    }
                }
            })
        }
        let min = Number.MAX_VALUE;
        shortCut.forEach(function(edgeSet){
            let edgeInfo = edgeSet[edgeSet.length - 1];
            let distance = edgeInfo.value;
            if(!edgeInfo.dirty && distance > 0 && distance < min){
                min = distance;
            }
        })
        let _index = shortCut.findIndex(function(edgeSet){
            let edgeInfo = edgeSet[edgeSet.length - 1];
            let distance = edgeInfo.value;
            return !edgeInfo.dirty && distance === min;
        });

        if(_index === -1){
            return shortCut;
        }else{
            //设置dirty位表示不能被修改
            shortCut[_index][shortCut[_index].length - 1].dirty = true;
            return this._dijkstraMetrix(metrix,shortCut,min,_index + 1);
        }
    }


}

module.exports = Graph;
