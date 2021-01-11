# phony targets
.PHONY: copy_wasm_js build

# copy `wasm_exec.js` from Go installation
copy_wasm_js:
	cp /usr/local/go/misc/wasm/wasm_exec.js package/

# build `improl.wasm` file
package/improl.wasm: main.go
	GOOS=js GOARCH=wasm go build -o package/improl.wasm .
	
# build `index.js` file
package/index.js: package/index.es6.js package/wasm_exec.js
	cd package && npm run build

# build
build: package/improl.wasm package/index.js
	