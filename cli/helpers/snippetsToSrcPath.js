function removeSnippetBaseDir(path) {
    return path.replace(/^\.\/\.snippets\//, './');
}

function removeSnippetNameDir(path) {
    return path.replace(/[^\/\\]+\.snippet\//, '');
}

function snippetsToSrcPath(path) {
    return removeSnippetNameDir(removeSnippetBaseDir(path));
}

module.exports = snippetsToSrcPath;
