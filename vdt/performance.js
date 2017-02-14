function processArray(items,process,callback){
    var todo = items.concat();

    setTimeout(function(){
        process(todo.shift());

        if(todo.length > 0){
            setTimeout(arguments.callee , 25);
        }else{
            callback(items);
        }
    }, 25);
}

var items = [1,2,3,4,5,6,7,8,9,10];

function outputValue(value){
    console.log(value);
}

//processArray(items,outputValue,() => console.log("done"));



function fibonacci(num){
    switch (+num) {
        case 0:
            return 0;
            break;
        case 1:
            return 1;
            break;
        case 2:
            return 1;
            break;
        default:
            return fibonacci(num - 1) + fibonacci(num - 2);
    }
}

function fibo([],num){
    let memorizing = arguments[0];
    if(memorizing[num] !== undefined){
        return memorizing[num];
    }else{
        let value = fibo(memorizing,num - 1) + fibo(memorizing,num - 2);
        memorizing.push(value);
        return value;
    }
}

function fiboMemo(mem = [0,1,1],opt,num){
    console.log(mem);
    return opt.apply(null,[mem,num]);
}

/*
var start = +new Date();
console.log(fiboMemo([0,1,1],fibo,50));
var end = +new Date();
console.log(end - start);
*/

//lazyload
function addHandler(target,eventType,handler){
    if(target.addEventListener){
        addHandler = function(target,eventType,handler){
            target.addEventListener(eventType,handler);
        }
    }else{
        addHandler = function(target,eventType,handler){
            target.attachEvent("on" + eventType,handler);
        }
    }
    addHandler(target,eventType,handler);
}


var tasks = [];
var aAjax = [];
for(var i = 0 ; i < 5 ; i++){
    tasks[i] = (function(k){
        return function(){
            return k + 10;
        };
    })(i);
}



for(var i = 0 ; i < 5 ; i++){
    aAjax.push(tasks[i]());
}
console.log(aAjax);

/*
for(var i = 0 ; i < 5 ; i++){
    var task = (function(k){
        return tasks[k]();
    })(i);
    aAjax.push(task);
}*/


/*for(var property in tasks){
    if(tasks.hasOwnProperty(property)){
        setTimeout(function(){aAjax.push(property);},10);
    }
}
setTimeout(function(){console.log(aAjax);},100);*/
