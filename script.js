class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function runHuffman() {
    let text = document.getElementById("inputText").value;
    if (!text) return;

    // 1. Frequency Map
    let freqMap = {};
    for (let char of text) freqMap[char] = (freqMap[char] || 0) + 1;

    // 2. Build Min-Heap (Array-based)
    let nodes = Object.keys(freqMap).map(char => new Node(char, freqMap[char]));
    
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq); // Sort to pick two smallest
        let left = nodes.shift();
        let right = nodes.shift();
        let newNode = new Node('$', left.freq + right.freq, left, right);
        nodes.push(newNode);
    }

    // 3. Generate Codes
    let codes = {};
    function generateCodes(node, currentCode) {
        if (!node) return;
        if (node.char !== '$') codes[node.char] = currentCode;
        generateCodes(node.left, currentCode + "0");
        generateCodes(node.right, currentCode + "1");
    }
    generateCodes(nodes[0], "");

    // 4. Display Results
    let outputText = "--- Huffman Codes ---\n";
    for (let char in codes) outputText += `${char}: ${codes[char]}\n`;
    
    let compressedSize = text.split('').reduce((sum, char) => sum + codes[char].length, 0);
    let originalSize = text.length * 8;
    outputText += `\nOriginal: ${originalSize} bits\nCompressed: ${compressedSize} bits\n`;
    outputText += `Efficiency: ${((originalSize - compressedSize)/originalSize * 100).toFixed(2)}%`;
    
    document.getElementById("output").innerText = outputText;
}

