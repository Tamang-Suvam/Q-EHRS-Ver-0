function ValidateQuery(query) {
    let returnValue = 1
    let selectArgument = ' '
    let fromArgument = ' '
    let whereArgument_1 = ' '
    let whereArgument_2 = ' '
    
    let queries = query.split(/[ ,]+/)
    for(let i = 0; i < queries.length; i++) {
        if(queries[i].toUpperCase() === 'SELECT') {
            selectArgument = queries[++i].toUpperCase()
        } else if(queries[i].toUpperCase() === 'FROM') {
            fromArgument = queries[++i].toUpperCase()
        } else if(queries[i].toUpperCase() === 'WHERE') {
            whereArgument_1 = queries[++i].toUpperCase()
            i += 1
            if(whereArgument_1.toUpperCase() === 'DEPARTMENT') {
                whereArgument_2 = queries[++i].toUpperCase()
            } else {
                whereArgument_2 = queries[++i]
            }
        } else {
            returnValue = -1;
            break;
        }
    }
    return returnValue === 1 ? [selectArgument, fromArgument, whereArgument_1, whereArgument_2] : "Invalid SQL Query"
    // return [returnValue, selectArgument, fromArgument, whereArgument_1, whereArgument_2]
}

export {ValidateQuery}