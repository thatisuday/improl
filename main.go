package main

import (
	"bytes"
	"image/jpeg"
	"syscall/js"

	"github.com/disintegration/imaging"
)

// done channel
var done = make(chan bool)

func main() {
	window := js.Global()
	window.Set("getImage", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		uint8Array := args[0]
		dst := make([]byte, uint8Array.Get("length").Int())
		js.CopyBytesToGo(dst, uint8Array)

		// convert image
		img, _ := imaging.Decode(bytes.NewReader(dst))
		img = imaging.Grayscale(img)

		outBuf := new(bytes.Buffer)
		jpeg.Encode(outBuf, img, nil)

		s := make([]interface{}, len(outBuf.Bytes()))
		for i, v := range outBuf.Bytes() {
			s[i] = v
		}

		outArry := js.Global().Get("Uint8Array").New(len(outBuf.Bytes()))
		return outArry
	}))

	<-done
}
