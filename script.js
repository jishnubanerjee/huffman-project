// --- THE SOUND ENGINE ---
function playClickSound() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(10, context.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, context.currentTime);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);
}

// --- THE COMPRESSION ENGINE ---
function compressText() {
    playClickSound();
    const text = document.getElementById('inputText').value;
    
    if (!text) {
        alert("Enter some text first, Agent!");
        return;
    }

    // 1. Count frequencies
    let freq = {};
    for (let char of text) freq[char] = (freq[char] || 0) + 1;

    // 2. Create nodes for the Huffman Tree
    let nodes = Object.keys(freq).map(char => ({ char, freq: freq[char], left: null, right: null }));

    // 3. Build the Tree
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        let left = nodes.shift();
        let right = nodes.shift();
        nodes.push({ char: null, freq: left.freq + right.freq, left, right });
    }

    // 4. Generate Codes
    let codes = {};
    function generateCodes(node, str) {
        if (!node) return;
        if (node.char) codes[node.char] = str;
        generateCodes(node.left, str + "0");
        generateCodes(node.right, str + "1");
    }
    generateCodes(nodes[0], "");

    // 5. Encrypt and Calculate
    let binaryStr = "";
    for (let char of text) binaryStr += codes[char];

    let originalBits = text.length * 8;
    let compressedBits = binaryStr.length;
    let efficiency = ((1 - compressedBits / originalBits) * 100).toFixed(1);

    // --- UPDATE THE UI ---
    document.getElementById('binaryOutput').innerText = binaryStr;
    document.getElementById('efficiency').innerText = efficiency + "%";
}

