function compressText() {
    const input = document.getElementById('inputText');
    const output = document.getElementById('binaryOutput');
    const efficiency = document.getElementById('efficiency');

    const val = input.value;
    if (!val) {
        alert("PLEASE ENTER SOURCE DATA");
        return;
    }

    // --- REAL HUFFMAN LOGIC START ---
    
    // 1. Count character frequencies
    let freq = {};
    for (let char of val) freq[char] = (freq[char] || 0) + 1;

    // 2. Create leaf nodes
    let nodes = Object.keys(freq).map(char => ({ char, freq: freq[char], left: null, right: null }));

    // 3. Build the Huffman Tree
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        let left = nodes.shift();
        let right = nodes.shift();
        nodes.push({ char: null, freq: left.freq + right.freq, left, right });
    }

    // 4. Generate the binary codes from the tree
    let codes = {};
    function walk(node, path) {
        if (!node) return;
        if (node.char) codes[node.char] = path;
        walk(node.left, path + "0");
        walk(node.right, path + "1");
    }
    walk(nodes[0], "");

    // 5. Calculate results
    let compressedBinary = "";
    for (let char of val) compressedBinary += codes[char];

    let originalBits = val.length * 8; // Assuming 8-bit ASCII
    let compressedBits = compressedBinary.length;
    let savings = ((1 - compressedBits / originalBits) * 100).toFixed(1);

    // --- UPDATE THE UI ---
    output.innerText = compressedBinary;
    efficiency.innerText = savings + "%";
}
