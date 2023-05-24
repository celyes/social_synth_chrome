echo "\n"
echo "\033[1;34mbuilding extension. Please wait...\033[0m"
echo "\n"
set -e
# build the extension
npm run build
# zip the extension...
zip -r social-yobi.zip ./dist
set +e
echo "\n"
clear
echo "\033[1;32mextension built. check 'social-yobi.zip' folder.\033[0m"
