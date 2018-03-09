function removeSnippetDir(path) {
    path.replace(/[^/\\]+\.snippet\//, '');
}

module.exports = removeSnippetDir;
