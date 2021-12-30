clean:
	rm -rf ./docs

build: clean
	cargo build --lib --release --target wasm32-unknown-unknown
	wasm-bindgen --target web --no-typescript --out-dir docs target/wasm32-unknown-unknown/release/personal.wasm
	cp -R ./static/* ./docs

serve: build
	cd docs; simple-http-server

publish: build
	git push git@github.com:seungprk/seungprk.github.io.git master
