git add --all . && git commit -am "upd ver" && (git push || (git pull && git push))


test "upd ver"

Содержимое файла test.cmd:
git add --all . && git commit -am "$1" && (git push || (git pull && git push))
