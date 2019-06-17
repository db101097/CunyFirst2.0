let elasticsearch = require('elasticsearch');
let elasticClient = new elasticsearch.Client({
    host:'https://1d15tz36sd:nxf02sy6p5@cunyfirst2-0-8543628276.us-east-1.bonsaisearch.net:443'
});

let indexName = "college";

/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists; 
