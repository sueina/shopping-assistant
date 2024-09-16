const video = document.getElementById('camera-stream');
const barcodeResult = document.getElementById('barcode-result');
const startButton = document.getElementById('start-camera');

startButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            startBarcodeScanner();
        })
        .catch(err => console.error("Error accessing camera: ", err));
});

function startBarcodeScanner() {
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: video,
        },
        decoder: {
            readers: ["ean_reader"] // Adjust for different barcode types
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function(result) {
        const barcode = result.codeResult.code;
        barcodeResult.textContent = `Detected Barcode: ${barcode}`;
        console.log(barcode);
    });
}
