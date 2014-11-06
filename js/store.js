
/**
 * 
 * Storage design
 * 
 * Data structure:
 * 
 * 0. Columns: a list of columns stored; 1. Index/{column}: a list of keys for
 * the column; 2. Data entries: key value pairs
 * 
 * Initial sequence:
 * 
 * 3. Columns are read; 4. Indices are loaded into hash tables;
 * 
 * Update sequence:
 * 
 * 1. Check if column is in column list, if not , throw exception 5.
 * Set(column,key,value): set -> column + key = value 6. Check if key is in
 * column index, if not update index and store index
 * 
 * Query
 * 
 * 7. Get(column, key): 8. Check if column is in column list 9. Get column+key
 * 
 * Note:
 * 
 * Column+ key = column ":" key
 * 
 * Var db = store.open(column); // add column if needed, prepare index : load
 * index if exists or simply create new one // db is an object with the follow
 * methods:
 * 
 * db.set(key,value); db.get(key) db.list(start, limit )// returns a sub slice
 * of the index // column level { var column; var index; }
 */

XPE.store = function() {
    var ns = "xpe.store";
    var dataNS = "xpe.store.data.";
    var columns = {};
    var open = function(column) {
        if (!columns[column]) {
            columns[column] = "";
            var scs = JSON.stringify(columns);
            localStorage.setItem(ns + ".columns", scs);
        }
        var rows = JSON.parse(localStorage.getItem(ns + ".rows." + column)) || [];
        var index = {};
        for ( var i = 0; i < rows.length; ++i) {
            index[rows[i]] = true;
        }

        var hasItem = function(key) {
            if (index[key]) {
                return true;
            }
            return false;
        };

        var getItem = function(key) {
            if (index[key]) {
                return JSON.parse(localStorage.getItem(dataNS + column + "." + key));
            }
            return null;
        };

        var removeItem = function(key) {
            if (index[key]) {
                delete index[key];
                var idx = rows.indexOf(key);
                if (idx != -1) {
                    rows.splice(idx, 1);
                }
                localStorage.setItem(ns + ".rows." + column, JSON.stringify(rows));
            }
            localStorage.removeItem(dataNS + column + "." + key);
        };

        var setItem = function(key, value) {
            if (!index[key]) {
                rows.push(key);
                index[key] = true;
                localStorage.setItem(ns + ".rows." + column, JSON.stringify(rows));
            }
            localStorage.setItem(dataNS + column + "." + key, JSON.stringify(value));
        };

        var list = function(start, limit) {
            var s = start || 0;
            var l = Math.min(rows.length, limit || 10);
            var res = new Array();
            for ( var i = s; i < l; ++i) {
                res.push(rows[i]);
            }
            return res;
        };

        var listItems = function(start, limit) {
            var items = new Array();
            var res = list(start, limit);
            for ( var i = 0; i < res.length; ++i) {
                items.push(getItem(res[i]));
            }
            return items;
        };

        var size = function() {
            return rows.length;
        };

        return {
            getItem : getItem,
            setItem : setItem,
            list : list,
            listItems : listItems,
            name : column,
            removeItem : removeItem,
            size : size,
            hasItem : hasItem
        };

    };

    return {
        open : open
    };

}();
