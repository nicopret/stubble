const async = require("async"),
    exec = require('child_process').exec,
    fs = require("fs"),
    path = require("path");

/*
 * clearFolder steps through the folder, delete files that exists and then deletes the folder. This is done when a build is done to ensure that there is no old data in a folder.
 * @param {string} folder The folder that must be cleared and deleted
 * @param {*} callback Returns either error or null
 */
function clearFolder(folder, callback) {
    fs.readdir(folder, (err, files) => {
        if (err) {
            return console.error(err);
        }
        async.each(files, (file, callback) => {
            let target = path.resolve(folder, file);
            fs.stat(target, (err, stat) => err ? 
                callback(err) : stat.isFile() ?
                    fs.unlink(target, (err) => callback(err)) :
                    clearFolder(target, callback));
        }, (err) => callback(err));
    }, (err) => err ? callback(err) : deleteFolder(folder, (err) => callback(err)));
}

function deleteFolder(folder, callback) {
    exec('rm -r ' + folder, (err) => callback(err));
}

module.exports = {
    /**
     * This module creates a folder. If the folder exists it doesn't do anyting.
     * 
     * @module bin/createFolder
     * 
     * @param {string} folder the folder that should be created
     * @param {*} callback returns either an error or null
     */
    createFolder(folder, callback) {
        fs.exists(folder, exist => {
            // without the console.log the deep folders are not created
            console.log(folder + ' created');
            exist ? callback() : fs.mkdir(folder, (err) => callback(err));
        });
    },
    /**
     * This module deletes the specified folder
     * 
     * @module bin/deleteFolder
     * 
     * @param {string} folder the path of the folder that should be deleted
     * @param {*} callback returns either an error or null
     */
    deleteFolder(folder, callback) {
        deleteFolder(folder, (err) => callback(err));
    },
    /**
     * This module initializes the specified folder. If the folder exists 
     * it is deleted before it is recreated.
     * 
     * @module bin/initFolder
     * 
     * @param {string} folder the folder which should be initialized
     * @param {*} callback returns either an error or null
     */
    initFolder(folder, callback) {
        fs.exists(folder, (exists) => {
            exists ? clearFolder(folder, () => callback()) : this.createFolder(folder, (err) => callback(err));
        });
    },
    /**
     * This module creates a content file. The params object specifies a folder and path.
     * 
     * @module bin/createFolder
     * 
     * @param {object} params the folder where and the filename which should be created
     * @param {string} content the content that should be written into the file
     * @param {*} callback returns either an error or null
     */
    renderFile(params, content, callback) {
        fs.writeFile(path.resolve(params.folder, params.file), content, (err) => callback(err));
    }
}